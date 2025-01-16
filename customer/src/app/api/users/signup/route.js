import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB, connection } from "@/dbConfig/dbConfig";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {username, email, password } = reqBody;

    console.log('hi',reqBody);

    // Check if user already exists
    const userResult = await connection.query(
      "SELECT * FROM tbl_customer_registration WHERE email = $1",
      [email]
    );

    if (userResult.rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    
    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Insert new user into the database
    const savedUser = await connection.query(
      "INSERT INTO tbl_customer_registration (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    console.log(savedUser.rows[0]);

    // Send verification email (if applicable)
    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser.rows[0].id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: savedUser.rows[0],
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}



export async function GET(request) { 
  try {
    const users = await connection.query("SELECT * FROM tbl_customer_registration");
    return NextResponse.json(users.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}