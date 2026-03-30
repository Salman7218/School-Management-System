document.addEventListener("DOMContentLoaded", () => {

    const menuButtons = document.querySelectorAll('.menu-btn');
    const allSections = document.querySelectorAll('.section');

    menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;

            // Remove active style from all buttons
            menuButtons.forEach(b => {
                b.classList.remove(
                    'bg-gradient-to-r',
                    'from-purple-100',
                    'to-indigo-100',
                    'text-purple-700',
                    'font-semibold',
                    'shadow'
                );
            });

            // Add active style to clicked button
            btn.classList.add(
                'bg-gradient-to-r',
                'from-purple-100',
                'to-indigo-100',
                'text-purple-700',
                'font-semibold',
                'shadow'
            );

            // Hide ALL sections (auto)
            allSections.forEach(sec => sec.classList.add('hidden'));

            // Show selected section
            const activeEl = document.getElementById(`${target}Section`);
            if (activeEl) {
                activeEl.classList.remove('hidden');
            } else {
                console.warn(`Section not found: ${target}Section`);
            }
        });
    });


    // ============================
    // MOBILE SEARCH
    // ============================
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearch = document.getElementById('mobileSearch');

    if (mobileSearchBtn && mobileSearch) {
        mobileSearchBtn.addEventListener('click', () => {
            mobileSearch.classList.toggle('hidden');
        });
    }


    // ============================
    // NOTIFICATIONS
    // ============================
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationMenu = document.getElementById('notificationMenu');
    const closeNotifications = document.getElementById('closeNotifications');

    if (notificationBtn && notificationMenu) {
        notificationBtn.addEventListener('click', () => {
            notificationMenu.classList.toggle('hidden');
        });
    }

    if (closeNotifications && notificationMenu) {
        closeNotifications.addEventListener('click', () => {
            notificationMenu.classList.add('hidden');
        });
    }


    // ============================
    // PROFILE MENU
    // ============================
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', () => {
            profileMenu.classList.toggle('hidden');
        });
    }


    // ============================
    // COMPLAINT MODAL
    // ============================
    const modal = document.getElementById("complaintModal");
    const openBtn = document.getElementById("openComplaintBtn");
    const closeBtn = document.getElementById("closeComplaintBtn");
    const cancelBtn = document.getElementById("cancelComplaintBtn");

    if (modal && openBtn && closeBtn && cancelBtn) {
        openBtn.onclick = () => modal.classList.remove("hidden");
        closeBtn.onclick = () => modal.classList.add("hidden");
        cancelBtn.onclick = () => modal.classList.add("hidden");

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.add("hidden");
        });
    }


    // ============================
    // PASSWORD MODAL
    // ============================
    const openPasswordModal = document.getElementById("openPasswordModal");
    const passwordModal = document.getElementById("passwordModal");
    const closePasswordModal = document.getElementById("closePasswordModal");

    const togglePassword = document.getElementById("togglePassword");
    const currentPass = document.getElementById("currentPass");
    const newPass = document.getElementById("newPass");
    const confirmPass = document.getElementById("confirmPass");
    const savePasswordBtn = document.getElementById("savePasswordBtn");

    if (openPasswordModal && passwordModal && closePasswordModal) {

        openPasswordModal.addEventListener("click", () => {
            passwordModal.classList.remove("hidden");
        });

        closePasswordModal.addEventListener("click", () => {
            passwordModal.classList.add("hidden");
        });

        passwordModal.addEventListener("click", (e) => {
            if (e.target === passwordModal) {
                passwordModal.classList.add("hidden");
            }
        });
    }

    // Toggle password visibility
    if (togglePassword && currentPass && newPass && confirmPass) {
        let show = false;

        togglePassword.addEventListener("click", () => {
            show = !show;

            const type = show ? "text" : "password";
            currentPass.type = type;
            newPass.type = type;
            confirmPass.type = type;

            togglePassword.innerHTML = show
                ? '<i class="bi bi-eye-slash-fill"></i><span>Hide Passwords</span>'
                : '<i class="bi bi-eye-fill"></i><span>Show Passwords</span>';
        });
    }

    // Save password validation
    if (savePasswordBtn && currentPass && newPass && confirmPass) {
        savePasswordBtn.addEventListener("click", () => {
            const current = currentPass.value.trim();
            const newP = newPass.value.trim();
            const confirm = confirmPass.value.trim();

            if (!current || !newP || !confirm) {
                alert("All fields are required!");
                return;
            }

            if (newP.length < 6) {
                alert("New password must be at least 6 characters.");
                return;
            }

            if (newP !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            alert("Password changed successfully!");

            currentPass.value = "";
            newPass.value = "";
            confirmPass.value = "";

            passwordModal.classList.add("hidden");
        });
    }


    // ============================
    // LOGOUT
    // ============================
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // Open modal
    document.getElementById('openAssignmentModal')?.addEventListener('click', () => {
        document.getElementById('assignmentModal').classList.remove('hidden');
    });

    // Close modal
    document.getElementById('closeAssignmentModal')?.addEventListener('click', () => {
        document.getElementById('assignmentModal').classList.add('hidden');
    });

    // Save assignment (basic demo)
    document.getElementById('saveAssignment')?.addEventListener('click', () => {

        const title = document.getElementById('assignmentTitle').value;
        const cls = document.getElementById('assignmentClassSelect').value;
        const due = document.getElementById('assignmentDue').value;

        if (!title || !due) {
            alert("Please fill all fields");
            return;
        }

        const container = document.getElementById('assignmentList');

        const card = document.createElement('div');
        card.className = "assignment-card bg-white p-5 rounded-2xl shadow-sm space-y-3";
        card.setAttribute('data-class', cls);

        card.innerHTML = `
        <p class="text-xs text-gray-500">${cls}</p>
        <h3 class="font-semibold">${title}</h3>
        <p class="text-xs text-gray-400">Due: ${due}</p>
        <span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full">
            New
        </span>
    `;

        container.prepend(card);

        document.getElementById('assignmentModal').classList.add('hidden');
    });


    // Open modal
    document.getElementById('openNoticeModal')?.addEventListener('click', () => {
        document.getElementById('noticeModal').classList.remove('hidden');
    });

    // Close modal
    document.getElementById('closeNoticeModal')?.addEventListener('click', () => {
        document.getElementById('noticeModal').classList.add('hidden');
    });

    // Save notice
    document.getElementById('saveNotice')?.addEventListener('click', () => {

        const title = document.getElementById('noticeTitle').value;
        const cls = document.getElementById('noticeClass').value;
        const desc = document.getElementById('noticeDesc').value;

        if (!title || !desc) {
            alert("Fill all fields");
            return;
        }

        const container = document.getElementById('noticeList');

        const card = document.createElement('div');
        card.className = "notice-card bg-white p-4 rounded-2xl shadow-sm";
        card.setAttribute('data-class', cls);

        const today = new Date().toLocaleDateString();

        card.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h3 class="font-semibold text-sm">📢 ${title}</h3>
                <p class="text-xs text-gray-500 mt-1">Class ${cls} • ${today}</p>
            </div>
            <span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full">
                New
            </span>
        </div>
        <p class="text-sm text-gray-600 mt-2">${desc}</p>
    `;

        container.prepend(card);

        document.getElementById('noticeModal').classList.add('hidden');
    });
});