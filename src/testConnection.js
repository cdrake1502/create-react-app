import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // Connect to Vercel Postgres
    await db.connect();

    // Test connection: Use a simple query to fetch data or execute a basic operation
    const result = await sql`SELECT 1 + 1 AS test_value`;

    if (result.rows[0].test_value === 2) {
      return response.status(200).json({ message: 'Connected successfully!' });
    } else {
      return response.status(500).json({ error: 'Unexpected test result' });
    }
  } catch (error) {
    // Handle potential connection errors
    console.error('Error connecting to database:', error);
    return response.status(500).json({ error: 'Connection failed' });
  } finally {
    // Close the connection to avoid leaks
    await db.disconnect();
  }
}