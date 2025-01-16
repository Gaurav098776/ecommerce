import { NextResponse, NextRequest } from "next/server";
import { connectDB, connection } from "@/dbConfig/dbConfig";

connectDB();



// Increment or decrement the quantity of a product in the cart
export async function PUT(request, { params }) {
  const { cartItemId } = await params; // Extract the cartItemId from the URL parameters
  const { action } = await request.json(); // Extract the action from the request body

  // Validate input
  if (!cartItemId || !action) {
    return NextResponse.json({ error: "Cart Item ID and Action are required" }, { status: 400 });
  }

  if (!['increment', 'decrement'].includes(action)) {
    return NextResponse.json({ error: "Invalid action. Must be 'increment' or 'decrement'" }, { status: 400 });
  }

  try {
    // Step 1: Retrieve the current quantity of the cart item
    const cartItemResult = await connection.query('SELECT * FROM cart_item WHERE cart_item_id = $1', [cartItemId]);

    if (cartItemResult.rows.length === 0) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const currentQuantity = cartItemResult.rows[0].quantity;

    // Step 2: Handle the action (increment or decrement)
    let newQuantity;
    if (action === 'increment') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrement') {
      newQuantity = Math.max(currentQuantity - 1, 0); // Prevent quantity from going below 0
    }

    // Step 3: Update or remove the cart item based on the new quantity
    if (newQuantity === 0) {
      // Optionally: Remove the cart item if quantity is 0
      await connection.query('DELETE FROM cart_item WHERE cart_item_id = $1', [cartItemId]);
      return NextResponse.json({ message: "Cart item removed successfully" }, { status: 200 });
    } else {
      // Update the cart item quantity
      await connection.query('UPDATE cart_item SET quantity = $1 WHERE cart_item_id = $2', [newQuantity, cartItemId]);
      return NextResponse.json({ message: `Cart item quantity ${action}ed successfully`, quantity: newQuantity }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return NextResponse.json({ error: "Failed to update cart item quantity" }, { status: 500 });
  }
}


// Delete a product from the cart
export async function DELETE(request, { params }) {
  const { cartItemId } = params; // Extract the cartItemId from the URL parameters

  // Validate input
  if (!cartItemId) {
    return NextResponse.json({ error: "Cart Item ID is required" }, { status: 400 });
  }

  try {
    // Step 1: Check if the cart item exists
    const cartItemResult = await connection.query('SELECT * FROM cart_item WHERE cart_item_id = $1', [cartItemId]);

    if (cartItemResult.rows.length === 0) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    // Step 2: Delete the cart item
    await connection.query('DELETE FROM cart_item WHERE cart_item_id = $1', [cartItemId]);

    return NextResponse.json({ message: "Cart item removed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 });
  }
}
