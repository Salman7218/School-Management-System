// ================== ASSIGNMENTS SECTION =========================
function toggleClass(header) {
    const allBodies = document.querySelectorAll("#assignmentsSection .bg-white > div:nth-child(2)");
    const allArrows = document.querySelectorAll(".arrow");

    const body = header.nextElementSibling;
    const arrow = header.querySelector(".arrow");

    // Close all
    allBodies.forEach(b => b.classList.add("hidden"));
    allArrows.forEach(a => a.classList.remove("rotate-180"));

    // Open clicked
    body.classList.remove("hidden");
    arrow.classList.add("rotate-180");
}

function openAssignmentDetail() {
    document.getElementById("assignmentDetailModal").classList.remove("hidden");
}

function closeAssignmentDetail() {
    document.getElementById("assignmentDetailModal").classList.add("hidden");
}

// ================== ATTENDACE SECTION =========================
function markPresent(btn) {
    const row = btn.closest(".attendance-row");
    const buttons = row.querySelectorAll("button");

    buttons.forEach(b => b.classList.remove("bg-green-500", "text-white", "bg-red-500"));

    btn.classList.add("bg-green-500", "text-white");

    updateCounts();
}

function markAbsent(btn) {
    const row = btn.closest(".attendance-row");
    const buttons = row.querySelectorAll("button");

    buttons.forEach(b => b.classList.remove("bg-green-500", "text-white", "bg-red-500"));

    btn.classList.add("bg-red-500", "text-white");

    updateCounts();
}

function markAllPresent() {
    document.querySelectorAll(".attendance-row button:first-child").forEach(btn => {
        markPresent(btn);
    });
}

function markAllAbsent() {
    document.querySelectorAll(".attendance-row button:nth-child(2)").forEach(btn => {
        markAbsent(btn);
    });
}

function updateCounts() {
    let present = 0, absent = 0, total = document.querySelectorAll(".attendance-row").length;

    document.querySelectorAll(".attendance-row").forEach(row => {
        if (row.querySelector(".bg-green-500")) present++;
        if (row.querySelector(".bg-red-500")) absent++;
    });

    document.getElementById("presentCount").innerText = present;
    document.getElementById("absentCount").innerText = absent;
    document.getElementById("pendingCount").innerText = total - (present + absent);
}


// ================== MY CLASS SECTION =========================
function openClassDetail() {
    document.getElementById("classDetailModal").classList.remove("hidden");
}

function closeClassDetail() {
    document.getElementById("classDetailModal").classList.add("hidden");
}

function openStudentProfile() {
    document.getElementById("studentProfileModal").classList.remove("hidden");
}

function closeStudentProfile() {
    document.getElementById("studentProfileModal").classList.add("hidden");
}

// ====================== TIME TABLE ================================
function highlightCurrentPeriod() {
    const now = new Date();
    const hour = now.getHours();

    document.querySelectorAll('[data-time]').forEach(el => {
        const [start] = el.dataset.time.split('-');
        const startHour = parseInt(start);

        if (hour === startHour) {
            el.classList.add('ring-2', 'ring-indigo-500');
        }
    });
}

highlightCurrentPeriod();


// ============================ NOTICE TAB SWITCH ============================
// SWITCH TAB
function switchNoticeTab(tab) {
    document.getElementById('receivedTab').classList.add('hidden');
    document.getElementById('sentTab').classList.add('hidden');

    document.getElementById(tab + 'Tab').classList.remove('hidden');

    document.querySelectorAll('.notice-tab').forEach(btn => {
        btn.classList.remove('text-indigo-600', 'border-indigo-600', 'font-medium');
        btn.classList.add('text-gray-500');
    });

    event.target.classList.add('text-indigo-600', 'border-b-2', 'border-indigo-600', 'font-medium');
}

// MARK AS READ
function markAsRead(btn) {
    const card = btn.closest('.notice');
    card.classList.remove('unread');

    btn.remove();

    // decrease count
    const count = document.getElementById('receivedCount');
    let val = parseInt(count.innerText);
    if (val > 0) count.innerText = val - 1;
}


// =========================EXAM and RESULT ==============================
// ================= AUTO CALCULATE =================
document.querySelectorAll('.mark-row').forEach(row => {

    const inputs = row.querySelectorAll('.mark-input');
    const totalEl = row.querySelector('.total');
    const percentEl = row.querySelector('.percent');
    const gradeEl = row.querySelector('.grade');

    inputs.forEach(input => {
        input.addEventListener('input', () => {

            let total = 0;
            inputs.forEach(i => total += Number(i.value || 0));

            let percent = total; // adjust if max != 100

            totalEl.textContent = total;
            percentEl.textContent = percent + "%";
            gradeEl.textContent = getGrade(percent);

        });
    });

});

// ================= GRADE LOGIC =================
function getGrade(p) {
    if (p >= 90) return "A+";
    if (p >= 75) return "A";
    if (p >= 60) return "B";
    if (p >= 40) return "C";
    return "F";
}

// ================= SUBMIT =================
function submitMarks() {

    document.querySelectorAll('.status').forEach(el => {
        el.textContent = "Submitted";
        el.className = "status text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full";
    });

    alert("Marks submitted for verification!");
}

// ================= REPORT MODAL =================
function openReportCard() {
    document.getElementById('reportCardModal').classList.remove('hidden');
}

function closeReportCard() {
    document.getElementById('reportCardModal').classList.add('hidden');
}

function printReport() {
    window.print();
}


// ======================== MAIN DASHBOARD Charts ====================================

new Chart(document.getElementById('dashboardAttendanceChart'), {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            data: [85, 88, 90, 92, 87],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.1)',
            fill: true
        }]
    }
});

new Chart(document.getElementById('dashboardPerformanceChart'), {
    type: 'bar',
    data: {
        labels: ['10-A', '9-B', '8-C'],
        datasets: [{
            data: [78, 85, 72],
            backgroundColor: '#8b5cf6'
        }]
    }
});


// ======================= ANALYSTICS ==============================
// CLASS PERFORMANCE
const classCtx = document.getElementById('classPerformanceChart');

new Chart(classCtx, {
    type: 'bar',
    data: {
        labels: ['10-A', '9-B', '8-C', '7-A'],
        datasets: [{
            label: 'Average Marks',
            data: [78, 85, 72, 80],
            backgroundColor: '#6366f1'
        }]
    }
});

// SUBJECT ANALYSIS
const subjectCtx = document.getElementById('subjectChart');

new Chart(subjectCtx, {
    type: 'doughnut',
    data: {
        labels: ['Math', 'Science', 'English', 'History'],
        datasets: [{
            data: [80, 75, 85, 70],
            backgroundColor: [
                '#6366f1',
                '#8b5cf6',
                '#22c55e',
                '#f59e0b'
            ]
        }]
    }
});

// SAMPLE DATA (can replace with backend later)
const studentData = [
    { name: "Rahul", class: "10-A", subject: "math", marks: 96 },
    { name: "Sneha", class: "10-A", subject: "math", marks: 92 },
    { name: "Amit", class: "10-A", subject: "math", marks: 45 },
    { name: "Riya", class: "9-B", subject: "science", marks: 50 },
    { name: "Karan", class: "9-B", subject: "science", marks: 52 }
];

// FILTER FUNCTION
document.getElementById("classFilter").addEventListener("change", updateAnalytics);
document.getElementById("subjectFilter").addEventListener("change", updateAnalytics);

function updateAnalytics() {
    const selectedClass = document.getElementById("classFilter").value;
    const selectedSubject = document.getElementById("subjectFilter").value;

    let filtered = studentData;

    if (selectedClass !== "all") {
        filtered = filtered.filter(s => s.class === selectedClass);
    }

    if (selectedSubject !== "all") {
        filtered = filtered.filter(s => s.subject === selectedSubject);
    }

    generateAIInsight(filtered);
}

// AI INSIGHT (SMART LOGIC)
function generateAIInsight(data) {
    const weakStudents = data.filter(s => s.marks < 50);

    let text = "";

    if (weakStudents.length > 0) {
        text = `⚠️ ${weakStudents.length} students need attention: ` +
            weakStudents.map(s => s.name).join(", ");
    } else {
        text = "✅ All students are performing well!";
    }

    document.getElementById("aiInsightText").innerText = text;
}

// INITIAL LOAD
updateAnalytics();

// ================ LEAVE REQUEST ======================
// APPROVE
function approveLeave(btn) {
    const parent = btn.closest("div.flex");
    parent.innerHTML = `
            <span class="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                Approved
            </span>
        `;
}

// REJECT
function rejectLeave(btn) {
    const parent = btn.closest("div.flex");
    parent.innerHTML = `
            <span class="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full">
                Rejected
            </span>
        `;
}

// FILTER
document.getElementById("leaveFilter").addEventListener("change", function () {
    const value = this.value;
    const cards = document.querySelectorAll("#leaveList > div");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if (value === "all" || text.includes(value)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});


// ====================== MY LEAVE SECTION(TEACHER) ===================
let clBalance = 10;
let slBalance = 8;
let usedLeaves = 0;

// AUTO CALCULATE DAYS
document.getElementById("leaveFrom").addEventListener("change", calcDays);
document.getElementById("leaveTo").addEventListener("change", calcDays);

function calcDays() {
    const from = new Date(document.getElementById("leaveFrom").value);
    const to = new Date(document.getElementById("leaveTo").value);

    if (from && to && to >= from) {
        const diff = (to - from) / (1000 * 60 * 60 * 24) + 1;
        document.getElementById("totalDays").innerText = diff;
    }
}

function applyLeave() {
    const from = document.getElementById("leaveFrom").value;
    const to = document.getElementById("leaveTo").value;
    const reason = document.getElementById("leaveReason").value;
    const type = document.getElementById("leaveType").value;
    const days = parseInt(document.getElementById("totalDays").innerText);

    if (!from || !to || !reason || days <= 0) {
        alert("Fill all details correctly");
        return;
    }

    // CHECK BALANCE
    if (type === "CL" && days > clBalance) {
        alert("Not enough Casual Leave balance");
        return;
    }

    if (type === "SL" && days > slBalance) {
        alert("Not enough Sick Leave balance");
        return;
    }

    // UPDATE BALANCE
    if (type === "CL") clBalance -= days;
    if (type === "SL") slBalance -= days;

    usedLeaves += days;

    document.getElementById("clBalance").innerText = clBalance;
    document.getElementById("slBalance").innerText = slBalance;
    document.getElementById("usedLeaves").innerText = usedLeaves;

    // ADD TO LIST
    const leaveList = document.getElementById("teacherLeaveList");

    const item = document.createElement("div");
    item.className = "flex justify-between bg-yellow-50 p-3 rounded-xl";

    item.innerHTML = `
            <div>
                <p>${from} → ${to} (${days} days)</p>
                <p class="text-xs text-gray-500">${reason}</p>
            </div>
            <span class="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                Pending
            </span>
        `;

    leaveList.prepend(item);

    // RESET
    document.getElementById("leaveFrom").value = "";
    document.getElementById("leaveTo").value = "";
    document.getElementById("leaveReason").value = "";
    document.getElementById("totalDays").innerText = "0";
}


// ================================= POPUP NOTIFICATION ========================================
function showNotification(message, type = "info", duration = 4000) {
    const container = document.getElementById("notificationContainer");

    const notif = document.createElement("div");
    notif.className = `notification ${type}`;

    notif.innerHTML = `
        <div>${message}</div>
        <button onclick="this.parentElement.remove()">✖</button>
    `;

    container.appendChild(notif);

    // Show animation
    setTimeout(() => notif.classList.add("show"), 100);

    // Auto remove
    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => notif.remove(), 300);
    }, duration);
}


window.onload = function () {
    showNotification("👋 Welcome back, Teacher!", "success");

    setTimeout(() => {
        showNotification("📌 You have 3 pending tasks", "warning");
    }, 1500);

    setTimeout(() => {
        showNotification("📊 New analytics report available", "info");
    }, 3000);
};


// ================= DARK MODE ====================
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("darkToggle");

    // LOAD SAVED MODE
    const isDark = localStorage.getItem("darkMode") === "true";

    if (isDark) {
        document.documentElement.classList.add("dark");
        toggle.checked = true;
    }

    // TOGGLE MODE
    toggle.addEventListener("change", function () {
        if (this.checked) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    });
});

const btn = document.getElementById("darkToggleBtn");
const icon = document.getElementById("darkIcon");

btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("darkMode", isDark);

    icon.textContent = isDark ? "☀️" : "🌙";
});