document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // ASSIGNMENT TABS
    // ============================
    const tabs = document.querySelectorAll(".tab-btn");
    const cards = document.querySelectorAll(".assignment-card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            // Remove active styles
            tabs.forEach(t =>
                t.classList.remove("active", "text-blue-600", "border-b-2", "border-blue-600")
            );

            // Add active to clicked
            tab.classList.add("active", "text-blue-600", "border-b-2", "border-blue-600");

            const selectedTab = tab.dataset.tab;

            // Show / hide cards
            cards.forEach(card => {
                if (selectedTab === "all" || card.dataset.tab === selectedTab) {
                    card.style.display = ""; // better than "block"
                } else {
                    card.style.display = "none";
                }
            });
        });
    });


    // ============================
    // ATTENDANCE CHARTS
    // ============================
    const attendanceData = {
        labels: ["Present", "Absent", "Late"],
        datasets: [{
            data: [164, 28, 6],
            backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
            borderWidth: 0
        }]
    };

    const attendanceOptions = {
        cutout: "70%",
        plugins: {
            legend: { position: "bottom" }
        }
    };

    // Dashboard Chart
    const dashboardCtx = document.getElementById("attendanceChartDashboard");
    if (dashboardCtx) {
        new Chart(dashboardCtx, {
            type: "doughnut",
            data: attendanceData,
            options: attendanceOptions
        });
    }

    // Section Chart
    const sectionCtx = document.getElementById("attendanceChartSection");
    if (sectionCtx) {
        new Chart(sectionCtx, {
            type: "doughnut",
            data: attendanceData,
            options: attendanceOptions
        });
    }


    // ============================
    // EXAM / RESULT CHARTS
    // ============================
    const examData = {
        labels: ["Term 1", "Midterm", "Term 2", "Pre-Final", "Final"],
        datasets: [{
            label: "Marks (%)",
            data: [72, 75, 78, 82, 85],
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#4f46e5"
        }]
    };

    const examOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    // Section Chart
    const examSection = document.getElementById("examChartSection");
    if (examSection) {
        new Chart(examSection, {
            type: "line",
            data: examData,
            options: examOptions
        });
    }

    // Dashboard Chart
    const examDashboard = document.getElementById("examChartDashboard");
    if (examDashboard) {
        new Chart(examDashboard, {
            type: "line",
            data: examData,
            options: examOptions
        });
    }

});