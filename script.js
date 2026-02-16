function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function toggleTheme() {
    const html = document.documentElement;
    const themeIcons = document.querySelectorAll(".theme-icon");
    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "dark") {
        html.removeAttribute("data-theme");
        themeIcons.forEach(icon => icon.textContent = "🌙");
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        themeIcons.forEach(icon => icon.textContent = "☀️");
        localStorage.setItem("theme", "dark");
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    const themeIcons = document.querySelectorAll(".theme-icon");

    if (savedTheme === "dark") {
        html.setAttribute("data-theme", "dark");
        themeIcons.forEach(icon => icon.textContent = "☀️");
    } else {
        html.removeAttribute("data-theme");
        themeIcons.forEach(icon => icon.textContent = "🌙");
    }
}

const SUPABASE_URL = 'https://kvpbopnuxybnaqzitnab.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cGJvcG51eHlibmFxeml0bmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjU2MzIsImV4cCI6MjA4NjgwMTYzMn0.vEJCTo3h01-iufI5qdGMjiLU5JEPhFRFnDXE9gu2SVs';

async function updatePageViews() {
    try {
        const { createClient } = supabase;
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const pageName = 'portfolio_home';

        const { data: existingData, error: fetchError } = await supabaseClient
            .from('page_views')
            .select('view_count')
            .eq('page_name', pageName)
            .maybeSingle();

        if (fetchError) {
            console.error('Error fetching view count:', fetchError);
            document.getElementById('view-count').textContent = 'N/A';
            return;
        }

        let newCount = 1;
        if (existingData) {
            newCount = existingData.view_count + 1;
            const { error: updateError } = await supabaseClient
                .from('page_views')
                .update({
                    view_count: newCount,
                    last_viewed_at: new Date().toISOString()
                })
                .eq('page_name', pageName);

            if (updateError) {
                console.error('Error updating view count:', updateError);
            }
        } else {
            const { error: insertError } = await supabaseClient
                .from('page_views')
                .insert({
                    page_name: pageName,
                    view_count: newCount
                });

            if (insertError) {
                console.error('Error inserting view count:', insertError);
            }
        }

        document.getElementById('view-count').textContent = newCount.toLocaleString();

    } catch (error) {
        console.error('Error in updatePageViews:', error);
        document.getElementById('view-count').textContent = 'N/A';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    updatePageViews();
});
