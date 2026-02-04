const APP_NAME = "Schooli";
document.querySelectorAll(".app-name").forEach(el => {
    el.textContent = APP_NAME;
});

/* Dropdown Script */

const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    profileMenu.classList.add('hidden');
});

/* Sidebar switching */
const menus = document.querySelectorAll('.menu');
const sections = document.querySelectorAll('.section');

menus.forEach(m => {
    m.onclick = () => {
        menus.forEach(x => x.classList.remove('bg-purple-100', 'text-purple-600', 'font-semibold'));
        sections.forEach(s => s.classList.remove('active'));

        m.classList.add('bg-purple-100', 'text-purple-600', 'font-semibold');
        document.getElementById(m.dataset.target).classList.add('active');
    };
});

/* =======================
   CHART HELPERS
======================= */

function createChart(id, config) {
    const el = document.getElementById(id);
    if (!el) return; // 💡 prevents crash on other dashboards
    new Chart(el, config);
}

/* =======================
   DASHBOARD CHARTS
======================= */

// Dashboard 1
createChart("chart", {
    type: "doughnut",
    data: {
        labels: ["Math", "English", "Chemistry"],
        datasets: [{ data: [5000, 6000, 4000] }]
    },
    options: { cutout: "70%" }
});

// Dashboard 2
createChart("attendanceChart", {
    type: "doughnut",
    data: {
        labels: ["Present", "Absent"],
        datasets: [{ data: [92, 8] }]
    },
    options: { cutout: "70%" }
});

createChart("attendanceDonut", {
    type: "doughnut",
    data: {
        labels: ["Present", "Absent", "Late"],
        datasets: [{
            data: [92, 8, 3],
            backgroundColor: ["#22c55e", "#ef4444", "#facc15"]
        }]
    },
    options: {
        plugins: { legend: { position: "bottom" } },
        cutout: "65%"
    }
});

// Teacher dashboard
createChart("performanceChart", {
    type: "doughnut",
    data: {
        labels: ["Excellent", "Good", "Needs Improvement"],
        datasets: [{ data: [45, 35, 20] }]
    },
    options: {
        cutout: "70%",
        maintainAspectRatio: false
    }
});
