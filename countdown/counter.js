// --- Data ---
// Array of university events
const universityEvents = [
    {
        id: 1,
        title: "Tech Innovation Summit 2026",
        date: new Date("2026-05-15T09:00:00"),
        description: "Join industry leaders and alumni for a day of tech talks and networking.",
        location: "Basement B01",
        type: "Conference"
    },
    {
        id: 2,
        title: "Career Fair",
        date: new Date("2026-05-20T10:00:00"),
        description: "Meet with over 50 top employers hiring for internships and full-time roles.",
        location: "Room 212, Block B",
        type: "Career"
    },
    {
        id: 3,
        title: "Guest Lecture: AI Ethics",
        date: new Date("2026-06-05T14:00:00"),
        description: "Dr. Sarah Johnson discusses the ethical implications of modern AI systems.",
        location: "Room 105, Block A",
        type: "Lecture"
    },
    {
        id: 4,
        title: "Summer Music Festival",
        date: new Date("2026-06-12T17:00:00"),
        description: "Annual campus music festival featuring student bands and local artists.",
        location: "Seyani Campus",
        type: "Social"
    }
];

// --- Utility Functions ---
// Format date to a readable string
const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

// --- Features ---

// 1. Countdown Timer Logic (Home Page)
const initCountdown = () => {
    const targetDate = new Date("2026-09-15T10:00:00").getTime(); // Graduation Date
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    // Only run if countdown elements exist on the page
    if (!daysEl) return;

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("graduation-countdown").innerHTML = "<h3>Graduation Day is Here!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = minutes.toString().padStart(2, '0');
        secsEl.textContent = seconds.toString().padStart(2, '0');
    };

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
};

// 2. Render Next Upcoming Event (Home Page)
const renderNextEvent = () => {
    const container = document.getElementById("next-event-container");
    if (!container) return;

    // Filter out past events and sort by closest date
    const now = new Date();
    const upcomingEvents = universityEvents
        .filter(event => event.date > now)
        .sort((a, b) => a.date - b.date);

    if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        container.innerHTML = `
            <span class="event-date" style="font-size: 0.875rem;">${formatDate(nextEvent.date)}</span>
            <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">${nextEvent.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">${nextEvent.location}</p>
            <a href="events.html" class="card-link">View all events →</a>
        `;
    } else {
        container.innerHTML = `<p style="color: var(--text-secondary);">No upcoming events scheduled.</p>`;
    }
};

// 3. Render All Events (Events Page)
const renderAllEvents = () => {
    const listContainer = document.getElementById("events-list");
    if (!listContainer) return;

    // Sort all events by date
    const sortedEvents = [...universityEvents].sort((a, b) => a.date - b.date);

    let html = "";
    sortedEvents.forEach(event => {
        let badgeClass = "badge-blue";
        if (event.type === "Career") badgeClass = "badge-amber";
        if (event.type === "Social") badgeClass = "badge-green";

        html += `
            <article class="card">
                <div class="card-content">
                    <span class="badge ${badgeClass}" style="margin-bottom: 0.75rem;">${event.type}</span>
                    <h2 style="margin-bottom: 0.5rem; color: var(--primary-color);">${event.title}</h2>
                    <span class="event-date">${formatDate(event.date)}</span>
                    <p style="font-weight: 500; margin-bottom: 1rem; font-size: 0.9rem;">📍 ${event.location}</p>
                    <p style="color: var(--text-secondary);">${event.description}</p>
                </div>
            </article>
        `;
    });

    listContainer.innerHTML = html;
};

// 4. Semester Progress Bar (Calendar Page)
const initProgressBar = () => {
    const progressBar = document.getElementById("semester-progress");
    const progressText = document.getElementById("progress-text");
    
    if (!progressBar || !progressText) return;

    // Dummy logic for semester progress (Jan 15 to May 22)
    const startDate = new Date("2026-01-15").getTime();
    const endDate = new Date("2026-09-15").getTime();
    const now = new Date().getTime();

    let percentage = 0;
    
    if (now > endDate) {
        percentage = 100;
    } else if (now > startDate) {
        const totalDuration = endDate - startDate;
        const elapsed = now - startDate;
        percentage = Math.floor((elapsed / totalDuration) * 100);
    }

    // Small delay to allow CSS transition to play on load
    setTimeout(() => {
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Completed`;
    }, 100);
};

// 5. Theme Toggle Logic
const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!themeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme');
    const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    const sunSVG = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.innerHTML = sunSVG;
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.innerHTML = isDark ? sunSVG : moonSVG;
    });
};

// --- Initialization ---
// Run functions when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    renderNextEvent();
    renderAllEvents();
    initProgressBar();
    initThemeToggle();
});
