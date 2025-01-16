import { NextResponse, NextRequest } from "next/server";
import { connectDB, connection } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request) {
  try {
    const result = await connection.query(`
      SELECT 
        c.catid, 
        c.catname, 
        sc.sub_catid, 
        sc.sub_catname
      FROM 
        tbl_admin_p_category c
      LEFT JOIN 
        tbl_admin_p_sub_category sc
      ON 
        c.catid = sc.catid
      ORDER BY 
        c.catid, sc.sub_catid
    `);

    // Transform the rows into the desired structure
    const categoryMap = {};
    result.rows.forEach(row => {
      const { catid, catname, sub_catid, sub_catname } = row;

      if (!categoryMap[catid]) {
        categoryMap[catid] = {
          id: catid,
          name: catname,
          subcategories: []
        };
      }

      if (sub_catid) {
        categoryMap[catid].subcategories.push({
          id: sub_catid,
          name: sub_catname
        });
      }
    });

    const formattedResponse = Object.values(categoryMap);

    return NextResponse.json({ data: formattedResponse }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
