import { NextResponse, NextRequest } from "next/server";
import { connectDB, connection } from "@/dbConfig/dbConfig";

connectDB();

//Get all product details

// export async function GET(request) {
//   const result =  await connection.query('SELECT  rp.pid, rp.productname, sc.sub_catname, rp.company, rp.price, rp.qty, rp.productphoto FROM tbl_retailer_products rp JOIN tbl_admin_p_sub_category sc ON rp.sub_catid = sc.sub_catid JOIN tbl_admin_p_category c ON sc.catid = c.catid',[]);
//   return NextResponse.json(result.rows);
// }

// API to get 8 random products
export async function GET(request) {
  try {
    // Query to fetch 8 random products
    const query = `
      SELECT 
        rp.pid, 
        rp.productname, 
        sc.sub_catname, 
        rp.company, 
        rp.price, 
        rp.qty, 
        rp.productphoto 
      FROM tbl_retailer_products rp
      JOIN tbl_admin_p_sub_category sc ON rp.sub_catid = sc.sub_catid
      JOIN tbl_admin_p_category c ON sc.catid = c.catid
      ORDER BY RANDOM()
      LIMIT 8
    `;
    const result = await connection.query(query);

    // Respond with the data
    return NextResponse.json({ success: true, products: result.rows });
  } catch (error) {
    // Handle errors
    console.error("Error fetching random products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
}