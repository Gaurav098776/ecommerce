import  pkg  from 'pg';
const {Client} =  pkg;

// Function to establish a connection to the PostgreSQL database
const connection = new Client({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD  ,
  database: process.env.DB_NAME || 'e_comm',
  port: process.env.PG_PORT || 5432,
});
const connectDB = async () => {

  try {
      await connection.connect();
    console.log('Connected to PostgreSQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit process on failure
  }
};

// Export the connection function
export  {connectDB, connection};



