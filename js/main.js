// Countdown functionality with proper error handling and cleanup 
function updateCountdown() {
    try {
        const targetDate = new Date('2025-02-09T10:00:00+05:30').getTime();
        const countdownElement = document.querySelector('.countdown');
        
        if (!countdownElement) {
            throw new Error('Countdown element not found');
        }

        // Clear any existing intervals first
        let timer = null;

        const updateTimer = () => {
            const now = Date.now();
            const distance = targetDate - now;
            
            if (distance <= 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "<h2>Event has started!</h2>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const elements = {
                days: document.getElementById('days'),
                hours: document.getElementById('hours'), 
                minutes: document.getElementById('minutes'),
                seconds: document.getElementById('seconds')
            };

            // Check if all elements exist
            if (Object.values(elements).some(el => !el)) {
                throw new Error('One or more countdown elements not found');
            }

            // Update all elements
            Object.entries(elements).forEach(([key, el]) => {
                el.textContent = String(eval(key)).padStart(2, '0');
            });
        };

        // Run once immediately
        updateTimer();
        // Then start interval
        timer = setInterval(updateTimer, 1000);

        // Cleanup on page unload
        window.addEventListener('unload', () => clearInterval(timer));

    } catch (error) {
        console.error('Countdown error:', error);
        const element = document.querySelector('.countdown');
        if (element) {
            element.innerHTML = "<p>Loading countdown...</p>";
        }
    }
}

// Improved mobile menu with accessibility and cleanup
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('#nav-menu');
    
    if (!menuBtn || !navMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    const menuIcon = menuBtn.querySelector('i');
    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
        navMenu.classList.toggle('active');
        
        // Update icon
        if (menuIcon) {
            menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            lucide.createIcons();
        }

        // Update ARIA attributes
        menuBtn.setAttribute('aria-expanded', isOpen);
        navMenu.setAttribute('aria-hidden', !isOpen);
    };

    // Setup button
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');

    // Add click handler
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            toggleMenu();
        }
    });
}

// Initialize both features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    initializeMobileMenu();
    lucide.createIcons();
});