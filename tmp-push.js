import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';

// URL encode the password to handle the @ and / characters safely
const encodedPassword = encodeURIComponent("uU2@n@z/BD$nZ/X");
const connectionString = `postgresql://postgres:${encodedPassword}@db.zvahmhesedbpppkgfswa.supabase.co:5432/postgres`;

async function pushSchema() {
  const client = new Client({
    connectionString,
    // Add SSL requirement for Supabase
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();

    console.log('Reading schema.sql...');
    const schemaSql = fs.readFileSync('schema.sql', 'utf8');

    console.log('Executing schema script...');
    await client.query(schemaSql);

    console.log('✅ Database schema pushed perfectly! All tables created & RLS disabled.');
  } catch (err) {
    console.error('❌ Failed to push schema:', err);
  } finally {
    await client.end();
  }
}

pushSchema();
