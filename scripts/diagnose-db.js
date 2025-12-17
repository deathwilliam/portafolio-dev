
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ohddwghzljvelfktkgdn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZGR3Z2h6bGp2ZWxma3RrZ2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNzEzNDgsImV4cCI6MjA3OTg0NzM0OH0.u1r1GQABMQbPjGS-rlNbEzL5QLzxkJ0tyPQKc4ZCAyI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
    console.log('--- DIAGNOSTIC START ---');

    // 1. Check Projects
    console.log('Checking Projects...');
    const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*');

    if (projectsError) {
        console.error('ERROR fetching projects:', projectsError);
    } else {
        console.log(`Projects found: ${projects.length}`);
        projects.forEach(p => console.log(` - ${p.title} (${p.id})`));
    }

    // 2. Check Site Settings (CV)
    console.log('\nChecking Site Settings...');
    const { data: settings, error: settingsError } = await supabase
        .from('site_settings')
        .select('*');

    if (settingsError) {
        console.error('ERROR fetching settings:', settingsError);
    } else {
        console.log(`Settings entries found: ${settings.length}`);
        if (settings.length > 0) {
            console.log('CV URL:', settings[0].cv_url);
        }
    }

    // 3. Check bucket existence (indirectly via list)
    console.log('\nChecking Storage Buckets access...');
    const { data: buckets, error: bucketsError } = await supabase
        .storage.listBuckets();

    if (bucketsError) {
        console.error('ERROR listing buckets:', bucketsError);
    } else {
        console.log('Buckets found:', buckets.map(b => b.name));
    }

    console.log('--- DIAGNOSTIC END ---');
}

diagnose();
