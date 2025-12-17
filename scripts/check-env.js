
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('Project URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Anon Key Set:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
