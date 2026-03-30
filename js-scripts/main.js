document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // SIDEBAR SECTION SWITCH
    // ============================
    const sections = ['dashboard', 'attendance', 'assignments', 'exams', 'timetable', 'studhostel', 'library', 'notices', 'profile'];
    const menuButtons = document.querySelectorAll('.menu-btn');

    menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;

            // Active button styling
            menuButtons.forEach(b =>
                b.classList.remove('bg-gradient-to-r', 'from-purple-100', 'to-indigo-100', 'text-purple-700', 'font-semibold', 'shadow')
            );

            btn.classList.add('bg-gradient-to-r', 'from-purple-100', 'to-indigo-100', 'text-purple-700', 'font-semibold', 'shadow');

            // Hide all sections
            sections.forEach(sec => {
                const el = document.getElementById(sec + 'Section');
                if (el) el.classList.add('hidden');
            });

            // Show selected
            const activeEl = document.getElementById(target + 'Section');
            if (activeEl) activeEl.classList.remove('hidden');
        });
    });


    // ============================
    // MOBILE SIDEBAR
    // ============================
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');

    if (mobileSidebarBtn && sidebar && mobileOverlay) {
        mobileSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            mobileOverlay.classList.toggle('hidden');
        });

        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            mobileOverlay.classList.add('hidden');
        });
    }


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

});