const APP_NAME = "School Name";
document.querySelectorAll(".app-name").forEach(el => {
  el.textContent = APP_NAME;
});

// UTILITIES
// Debounce (prevents performance issues on resize)
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Safe query helper
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

// PROFILE DROPDOWN
const profileBtn = $("#profileBtn");
const profileMenu = $("#profileMenu");

if (profileBtn && profileMenu) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    profileMenu.classList.add("hidden");
  });
}

// MOBILE SIDEBAR TOGGLE (USING YOUR BUTTON)
const sidebar = document.querySelector("aside");
const mobileSidebarBtn = document.getElementById("mobileSidebarBtn");

if (mobileSidebarBtn) {
  mobileSidebarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("-translate-x-full");
  });
}

// Prepare sidebar for mobile
function setupResponsiveSidebar() {
  if (window.innerWidth < 768) {
    sidebar.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "z-40",
      "-translate-x-full",
      "transition-transform",
      "duration-300"
    );
  } else {
    sidebar.classList.remove("-translate-x-full", "fixed", "z-40");
  }
}

window.addEventListener("resize", debounce(setupResponsiveSidebar));
setupResponsiveSidebar();

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 768 &&
    !sidebar.contains(e.target) &&
    e.target !== mobileSidebarBtn
  ) {
    sidebar.classList.add("-translate-x-full");
  }
});

// MOBILE SEARCH TOGGLE (NEW)
const searchIcon = document.getElementById("searchIcon");
const mobileSearch = document.getElementById("mobileSearch");

if (searchIcon && mobileSearch) {
  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileSearch.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!mobileSearch.contains(e.target) && e.target !== searchIcon) {
      mobileSearch.classList.add("hidden");
    }
  });
}

// SECTION SWITCHING (SAFE + SMOOTH)
const menus = $$(".menu");
const sections = $$(".section");

menus.forEach((m) => {
  m.addEventListener("click", () => {
    // Update active menu
    menus.forEach((x) =>
      x.classList.remove("bg-purple-100", "text-purple-600", "font-semibold")
    );
    m.classList.add("bg-purple-100", "text-purple-600", "font-semibold");

    // Switch sections safely
    sections.forEach((s) => s.classList.remove("active"));

    const target = document.getElementById(m.dataset.target);
    if (target) target.classList.add("active");

    // Auto-close sidebar on mobile after click
    if (window.innerWidth < 768) {
      sidebar.classList.add("-translate-x-full");
    }
  });
});

// CHART HELPER (SAFE)
function createChart(id, config) {
  const el = document.getElementById(id);
  if (!el) return;

  // Destroy existing chart if exists (prevents memory leaks)
  if (el._chartInstance) {
    el._chartInstance.destroy();
  }

  el._chartInstance = new Chart(el, {
    ...config,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...config.options,
    },
  });
}

// DASHBOARD CHARTS

// Attendance (Student Dashboard)
createChart("attendanceChart", {
  type: "doughnut",
  data: {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [92, 8],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { position: "bottom" },
    },
  },
});

// Extra charts (won’t break if elements don’t exist)
createChart("attendanceDonut", {
  type: "doughnut",
  data: {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        data: [92, 8, 3],
        backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: { legend: { position: "bottom" } },
    cutout: "65%",
  },
});

createChart("performanceChart", {
  type: "doughnut",
  data: {
    labels: ["Excellent", "Good", "Needs Improvement"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#22c55e", "#3b82f6", "#f97316"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    cutout: "70%",
  },
});

//Admin dashboard chart
createChart("chart", {
  type: "doughnut",
  data: {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [12000, 3000],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { position: "bottom" },
    },
  },
});


// ACCESSIBILITY + UX IMPROVEMENTS

// Add keyboard support to menu items
menus.forEach((m) => {
  m.setAttribute("tabindex", "0");
  m.addEventListener("keypress", (e) => {
    if (e.key === "Enter") m.click();
  });
});


// ======= FIX: LINK DROPDOWN "MY PROFILE" TO PROFILE SECTION =======

const myProfileLink = document.getElementById("myProfileLink");

if (myProfileLink) {
  myProfileLink.addEventListener("click", () => {

    // 1) Close dropdown
    profileMenu.classList.add("hidden");

    // 2) Remove active from all sections
    sections.forEach((s) => s.classList.remove("active"));

    // 3) Show profile section
    const profileSection = document.getElementById("profile");
    if (profileSection) profileSection.classList.add("active");

    // 4) Update sidebar active menu (same style as others)
    menus.forEach((x) =>
      x.classList.remove("bg-purple-100", "text-purple-600", "font-semibold")
    );

    const sidebarProfile = document.querySelector('.menu[data-target="profile"]');
    if (sidebarProfile) {
      sidebarProfile.classList.add(
        "bg-purple-100",
        "text-purple-600",
        "font-semibold"
      );
    }

    // 5) Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function toggleEventForm() {
  const form = document.getElementById("eventForm");
  form.classList.toggle("translate-x-full");
}

// admina dashboard notice and event section tab button
function showTab(tab) {

  const noticesTab = document.getElementById('noticesTab');
  const eventTab = document.getElementById('eventTab');

  const noticesBtn = document.getElementById('noticesBtn');
  const eventBtn = document.getElementById('eventBtn');

  // Hide both tabs
  noticesTab.classList.add('hidden');
  eventTab.classList.add('hidden');

  // Reset button styles
  noticesBtn.classList.remove('border-indigo-600', 'text-indigo-600');
  noticesBtn.classList.add('text-gray-500');

  eventBtn.classList.remove('border-indigo-600', 'text-indigo-600');
  eventBtn.classList.add('text-gray-500');

  // Show selected tab
  if (tab === 'notices') {
    noticesTab.classList.remove('hidden');
    noticesBtn.classList.add('border-b-2', 'border-indigo-600', 'text-indigo-600');
    noticesBtn.classList.remove('text-gray-500');
  } else {
    eventTab.classList.remove('hidden');
    eventBtn.classList.add('border-b-2', 'border-indigo-600', 'text-indigo-600');
    eventBtn.classList.remove('text-gray-500');
  }
}


// 
document.addEventListener("DOMContentLoaded", function () {

  // ================= DEMO DATA =================
  const resultsData = [
    { year: 2025, exam: "Midterm", subject: "Math", marks: 88, grade: "A", remark: "Very Good" },
    { year: 2025, exam: "Midterm", subject: "English", marks: 76, grade: "B+", remark: "Good" },
    { year: 2025, exam: "Midterm", subject: "Science", marks: 82, grade: "A-", remark: "Well Done" },

    { year: 2024, exam: "Final", subject: "Math", marks: 91, grade: "A+", remark: "Excellent" },
    { year: 2024, exam: "Final", subject: "English", marks: 79, grade: "B+", remark: "Good" },
    { year: 2024, exam: "Final", subject: "Science", marks: 85, grade: "A", remark: "Great" }
  ];

  // ================= TABLE RENDER =================
  function renderTable() {
    const year = document.getElementById('yearFilter').value;
    const exam = document.getElementById('examFilter').value;

    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = '';

    const filtered = resultsData.filter(r =>
      (year === 'all' || r.year == year) &&
      (exam === 'all' || r.exam === exam)
    );

    filtered.forEach(r => {
      tbody.innerHTML += `
        <tr class="border-b">
            <td>${r.year}</td>
            <td>${r.exam}</td>
            <td>${r.subject}</td>
            <td>${r.marks} / 100</td>
            <td class="text-green-600">${r.grade}</td>
            <td>${r.remark}</td>
        </tr>
      `;
    });
  }

  // ================= PDF DOWNLOAD (FIXED) =================
  window.downloadResults = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Student Result Report", 14, 15);

    const tableColumn = ["Year", "Exam", "Subject", "Marks", "Grade", "Remarks"];
    const tableRows = [];

    resultsData.forEach(r => {
      tableRows.push([
        r.year,
        r.exam,
        r.subject,
        r.marks + " / 100",
        r.grade,
        r.remark
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25
    });

    doc.save("Student_Results.pdf");
  };

  // ================= CHART =================
  let performanceChartInstance = null;

  function loadPerformanceChart() {
    const ctx = document.getElementById('performanceChart2');

    if (performanceChartInstance) {
      performanceChartInstance.destroy();
    }

    performanceChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Math', 'English', 'Science'],
        datasets: [{
          label: 'Marks',
          data: [88, 76, 82],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // ================= EVENTS =================
  document.getElementById('yearFilter').addEventListener('change', renderTable);
  document.getElementById('examFilter').addEventListener('change', renderTable);

  // ================= INITIAL LOAD =================
  renderTable();
  loadPerformanceChart(); // ✅ IMPORTANT

});


// Assignments section
// FILTER FUNCTION
function filterAssignments(event, status) {
  const items = document.querySelectorAll(".assignment");
  const buttons = document.querySelectorAll(".filter-btn");

  // reset buttons
  buttons.forEach(btn => {
    btn.classList.remove("text-blue-600", "border-blue-600", "border-b-2");
    btn.classList.add("text-gray-500");
  });

  event.currentTarget.classList.add("text-blue-600", "border-blue-600", "border-b-2");

  // filter items
  items.forEach(item => {
    if (status === "all" || item.dataset.status === status) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// COUNT FUNCTION
function updateCounts() {
  const items = document.querySelectorAll(".assignment");

  let counts = {
    all: 0,
    new: 0,
    pending: 0,
    submitted: 0
  };

  items.forEach(item => {
    const status = item.dataset.status;

    counts.all++;
    if (counts[status] !== undefined) {
      counts[status]++;
    }
  });

  document.getElementById("count-all").innerText = counts.all;
  document.getElementById("count-new").innerText = counts.new;
  document.getElementById("count-pending").innerText = counts.pending;
  document.getElementById("count-submitted").innerText = counts.submitted;
}

// SEARCH FUNCTION
document.getElementById("searchInput").addEventListener("keyup", function () {
  const value = this.value.toLowerCase();
  const items = document.querySelectorAll(".assignment");

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(value) ? "block" : "none";
  });
});

// INIT
document.addEventListener("DOMContentLoaded", () => {
  updateCounts();
});

// Library //
function openModal() {
  bookModal.classList.remove('hidden');
  bookModal.classList.add('flex');
}
function closeModal() {
  bookModal.classList.add('hidden');
}

function openFineModal() {
  fineModal.classList.remove('hidden');
  fineModal.classList.add('flex');
}
function closeFineModal() {
  fineModal.classList.add('hidden');
}

function switchTab(tab) {
  availableTab.classList.add('hidden');
  issuedTab.classList.add('hidden');

  document.getElementById(tab + 'Tab').classList.remove('hidden');
}

function handleAddBook(e) {
  e.preventDefault();

  const title = bookTitle.value;
  const isbn = bookISBN.value;

  const row = `
  <tr>
    <td class="px-4 py-2">${title}</td>
    <td class="px-4 py-2">${isbn}</td>
    <td class="px-4 py-2">-</td>
    <td class="px-4 py-2">-</td>
    <td class="px-4 py-2 text-right">
      <button class="text-blue-500">Issue</button>
    </td>
  </tr>`;

  document.getElementById('bookTable').innerHTML += row;

  closeModal();
}

function saveFine(e) {
  e.preventDefault();
  alert("Fine Saved ✅");
  closeFineModal();
}
