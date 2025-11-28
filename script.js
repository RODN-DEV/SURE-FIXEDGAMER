// --- DOM Elements & Setup ---
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawer-overlay');
const contentDiv = document.getElementById('content');
const headerTitle = document.getElementById('header-title');
const passwordModal = document.getElementById('password-modal');
const passwordInput = document.getElementById('password-input');
const submitPasswordBtn = document.getElementById('submit-password');
const cancelPasswordBtn = document.getElementById('cancel-password');
const passwordError = document.getElementById('password-error');
const drawerNavList = document.getElementById('drawer-nav-list'); // New element reference

// Password protection
const validPasswords = ['12300', '12400', '12500'];
let currentView = 'home';
let isAuthenticated = false;

// --- Navigation/Drawer Functionality ---

/**
 * Closes the navigation drawer.
 */
const closeDrawer = () => {
    drawer.classList.remove('drawer-open');
    drawer.classList.add('drawer-closed');
    overlay.classList.add('hidden');
};

/**
 * Defines all navigation items and their properties.
 */
const navItems = [
    { title: 'Home', view: 'home', icon: 'fas fa-home' },
    { title: 'Daily Free Tips', view: 'free-tips', icon: 'fas fa-bullhorn' },
    { title: 'Ultimate VIP', view: 'ultimate', icon: 'fas fa-trophy', vip: true },
    { title: 'Top Special VIP', view: 'top-secret', icon: 'fas fa-lock', vip: true },
    { title: 'VIP O/U Tips', view: 'over-under', icon: 'fas fa-chart-line', vip: true },
    { title: 'VIP BTTS Tips', view: 'btts', icon: 'fas fa-handshake', vip: true },
    { title: 'Contact Support', view: 'support', icon: 'fas fa-headset' },
    { title: 'Privacy Policy', view: 'privacy', icon: 'fas fa-shield-alt' }, // New policy link
];

/**
 * Populates the navigation drawer list dynamically.
 */
const populateNavigationDrawer = () => {
    drawerNavList.innerHTML = navItems.map(item => {
        // VIP tag for visual distinction
        const vipTag = item.vip ? '<span class="ml-2 px-2 py-0.5 text-xs font-bold bg-yellow-500 text-slate-900 rounded-full">VIP</span>' : '';
        
        // Use navigate() for all link clicks
        return `
            <li>
                <a href="#" class="flex items-center p-3 rounded-lg text-slate-700 hover:bg-gray-100 transition" 
                   onclick="navigate('${item.view}'); return false;">
                    <i class="${item.icon} w-5 text-lg"></i>
                    <span class="ml-3 font-semibold">${item.title}</span>
                    ${vipTag}
                </a>
            </li>
        `;
    }).join('');
};

// VIP Views that require password (derived from navItems)
const vipViews = navItems.filter(item => item.vip).map(item => item.view);

// --- Router ---
/**
 * Main application router. Navigates to the specified view.
 * @param {string} view - The name of the view function to call.
 */
const navigate = (view) => {
    // 1. Close the drawer every time a link is clicked
    closeDrawer();
    
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    currentView = view;
    
    // 2. Check if view requires authentication
    if (vipViews.includes(view) && !isAuthenticated) {
        passwordModal.classList.remove('hidden');
        return;
    }
    
    // 3. Render the correct content view
    switch(view) {
        case 'home': contentDiv.innerHTML = renderHome(); break;
        case 'free-tips': contentDiv.innerHTML = renderFreeTips(); break;
        case 'top-secret': contentDiv.innerHTML = renderTopSecret(); break;
        case 'ultimate': contentDiv.innerHTML = renderUltimate(); break;
        case 'over-under': contentDiv.innerHTML = renderOverUnder(); break;
        case 'btts': contentDiv.innerHTML = renderBTTS(); break;
        case 'support': contentDiv.innerHTML = renderSupport(); break;
        case 'privacy': contentDiv.innerHTML = renderPrivacyPolicy(); break; // New route
        default: contentDiv.innerHTML = renderHome();
    }
};

// --- Event Listeners ---

// Hamburger menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    drawer.classList.remove('drawer-closed');
    drawer.classList.add('drawer-open');
    overlay.classList.remove('hidden');
});

// Close drawer on overlay click
overlay.addEventListener('click', closeDrawer);

// Password modal handlers
submitPasswordBtn.addEventListener('click', () => {
    const password = passwordInput.value.trim();
    
    if (validPasswords.includes(password)) {
        isAuthenticated = true;
        passwordModal.classList.add('hidden');
        passwordInput.value = '';
        passwordError.classList.add('hidden');
        navigate(currentView);
    } else {
        passwordError.textContent = 'Incorrect password. Try again.';
        passwordError.classList.remove('hidden');
    }
});

cancelPasswordBtn.addEventListener('click', () => {
    passwordModal.classList.add('hidden');
    passwordInput.value = '';
    passwordError.classList.add('hidden');
    // Navigate back to home if authentication is cancelled
    navigate('home');
});


// --- Initialization ---

// Populate the drawer with all navigation links on load
populateNavigationDrawer();

// Initialize the application to the home view
navigate('home');