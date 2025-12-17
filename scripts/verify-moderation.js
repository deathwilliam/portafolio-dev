
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase Config');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyModeration() {
    console.log("Starting Moderation Verification...");

    // 1. Create a Pending Testimonial
    const testId = `test-${Date.now()}`;
    console.log(`Creating pending testimonial: ${testId}`);

    const { data: created, error: createError } = await supabase
        .from('testimonials')
        .insert([{
            name: "Test User",
            role: "Tester",
            content: "Pending review content",
            rating: 5,
            approved: false // Explicitly setting approved=false
        }])
        .select()
        .single();

    if (createError) {
        console.error("Failed to create testimonial. DB Schema might need update.", createError.message);
        return;
    }

    console.log("Created successfully. ID:", created.id);
    const id = created.id;

    // 2. Verify it is NOT visible to public (approved=true filter)
    console.log("Checking visibility (approved=true)...");
    const { data: publicView } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true) // Simulation of public query
        .eq('id', id);

    if (publicView && publicView.length > 0) {
        console.error("FAIL: Testimonial visible without approval!");
    } else {
        console.log("PASS: Testimonial not visible publicly.");
    }

    // 3. Verify it IS visible to admin (all)
    console.log("Checking visibility (admin/all)...");
    const { data: adminView } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id);

    if (adminView && adminView.length > 0) {
        console.log("PASS: Testimonial visible to admin.");
    } else {
        console.error("FAIL: Testimonial not visible to admin!");
    }

    // 4. Approve it
    console.log("Approving testimonial...");
    const { error: updateError } = await supabase
        .from('testimonials')
        .update({ approved: true })
        .eq('id', id);

    if (updateError) {
        console.error("Failed to approve:", updateError.message);
    } else {
        console.log("Approved successfully.");
    }

    // 5. Verify it IS visible to public now
    console.log("Checking visibility again...");
    const { data: publicViewAfter } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .eq('id', id);

    if (publicViewAfter && publicViewAfter.length > 0) {
        console.log("PASS: Testimonial is now visible!");
    } else {
        console.error("FAIL: Testimonial still not visible!");
    }

    // 6. Cleanup
    console.log("Cleaning up...");
    await supabase.from('testimonials').delete().eq('id', id);
    console.log("Done.");
}

verifyModeration();
