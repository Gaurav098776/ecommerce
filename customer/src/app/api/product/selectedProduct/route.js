import { NextResponse } from "next/server";
import { connectDB, connection } from "@/dbConfig/dbConfig";

// Establish the database connection
connectDB();

export async function GET() {
  try {
    // Query to fetch products and their respective subcategories
    const query = `
      SELECT 
        sc.sub_catname, 
        rp.pid, 
        rp.productname, 
        rp.price, 
        rp.company, 
        rp.productphoto
      FROM tbl_retailer_products rp
      JOIN tbl_admin_p_sub_category sc 
        ON rp.sub_catid = sc.sub_catid
    `;

    const result = await connection.query(query);

    // Process the results into the desired format
    const groupedProducts = {};

    console.log('res',result.rows);
    

    result.rows.forEach((row) => {
      const { sub_catname, pid, productname, price, company, productphoto } = row;
      console.log('sub_catname',sub_catname);
      

      // Initialize the subcategory if not already present
      if (!groupedProducts[sub_catname]) {
        groupedProducts[sub_catname] = [];
      }

      // Push the product into the appropriate subcategory
      groupedProducts[sub_catname].push({
        id: pid,
        name: productname,
        description: company, // Using company as a description for this example
        price,
        image: productphoto,
      });
    });

    // Respond with the grouped products
    return NextResponse.json({ success: true, products: groupedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
}
