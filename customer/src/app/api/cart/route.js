import { NextResponse, NextRequest } from "next/server";
import { connectDB, connection } from "@/dbConfig/dbConfig";

connectDB();

// 1. Add Item to Cart
// Logic: If the cart exists, add the item or update the quantity.
//        If the cart doesn't exist, create a new cart first.


export async function POST(request) {
  const { customer_id, pid, quantity = 1 } = await request.json();
  try {
    // 1. Check if the customer already has a cart
    const cartResult = await connection.query("SELECT * FROM cart WHERE customer_id = $1", [customer_id]);
    let cartId;

    // If no cart exists, create a new cart
    if (cartResult.rows.length === 0) {
      const newCart = await connection.query("INSERT INTO cart (customer_id) VALUES ($1) RETURNING cart_id", [customer_id]);
      cartId = newCart.rows[0].cart_id; // Get the new cart ID
    } else {
      cartId = cartResult.rows[0].cart_id; // Use the existing cart ID
    }

    // 2. Check if the product is already in the cart
    const productResult = await connection.query("SELECT * FROM cart_item WHERE cart_id = $1 AND pid = $2", [cartId, pid]);

    if (productResult.rows.length === 0) {
      // Product doesn't exist in the cart, add it
      await connection.query("INSERT INTO cart_item (cart_id, pid, quantity) VALUES ($1, $2, $3)", [cartId, pid, quantity]);
    } else {
      // Product exists, update its quantity
      await connection.query("UPDATE cart_item SET quantity = quantity + $1 WHERE cart_id = $2 AND pid = $3", [quantity, cartId, pid]);
    }

    // Respond with success message
    return NextResponse.json({ message: "Item added to cart successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

// 2. Get Cart Items

export async function GET(request) {
  // const { customer_id } = request.nextUrl.searchParams; // Retrieve customer_id from the query parameters
  const searchParams = request.nextUrl.searchParams
  const customer_id = searchParams.get('customer_id')
  console.log(customer_id);
  

  if (!customer_id) {
    return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
  }

  try {
    // Check if the customer has an existing cart
    const cartResult = await connection.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
    console.log('cartresult',cartResult);
    console.log('custmer',customer_id);
    

    if (cartResult.rows.length === 0) {
      // If no cart exists for the customer, return an empty cart response
      return NextResponse.json({ message: "Cart is empty" }, { status: 200 });
    }

    const cartId = cartResult.rows[0].cart_id;

    // Retrieve the items in the cart along with product details
    const cartItems = await connection.query(`
      SELECT ci.cart_item_id, ci.quantity, p.productname,p.pid, p.price, p.productphoto
      FROM cart_item ci
      JOIN tbl_retailer_products p ON ci.pid = p.pid
      WHERE ci.cart_id = $1
    `, [cartId]);

    // If no items in the cart, return an empty array
    if (cartItems.rows.length === 0) {
      return NextResponse.json({ message: "No items in cart" }, { status: 200 });
    }

    // Respond with the cart items and product details
    return NextResponse.json({ cartItems: cartItems.rows }, { status: 200 });

  } catch (error) {
    console.error("Error retrieving cart items:", error);
    return NextResponse.json({ error: "Failed to retrieve cart items" }, { status: 500 });
  }
}
