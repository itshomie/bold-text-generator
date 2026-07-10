(function () {
    'use strict';

    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeLabel = themeToggle ? themeToggle.querySelector('[data-theme-label]') : null;
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.getElementById('primary-navigation');

    function getTheme() {
        return root.dataset.theme === 'dark' ? 'dark' : 'light';
    }

    function updateThemeControl() {
        if (!themeToggle) return;

        const isDark = getTheme() === 'dark';
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');

        if (themeLabel) {
            themeLabel.textContent = isDark ? 'Light' : 'Dark';
        }
    }

    if (themeToggle) {
        updateThemeControl();

        themeToggle.addEventListener('click', function () {
            const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
            root.dataset.theme = nextTheme;

            try {
                localStorage.setItem('theme', nextTheme);
            } catch (error) {
                // Theme still changes for this page when storage is unavailable.
            }

            updateThemeControl();
        });
    }

    function closeNavigation(options) {
        if (!navToggle || !navigation) return;

        navigation.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');

        if (options && options.returnFocus) {
            navToggle.focus();
        }
    }

    if (navToggle && navigation) {
        navToggle.addEventListener('click', function () {
            const shouldOpen = navToggle.getAttribute('aria-expanded') !== 'true';
            navigation.classList.toggle('is-open', shouldOpen);
            navToggle.setAttribute('aria-expanded', String(shouldOpen));
            document.body.classList.toggle('menu-open', shouldOpen);
        });

        navigation.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                closeNavigation();
            }
        });

        document.addEventListener('click', function (event) {
            if (navToggle.getAttribute('aria-expanded') !== 'true') return;
            if (navigation.contains(event.target) || navToggle.contains(event.target)) return;
            closeNavigation();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                closeNavigation({ returnFocus: true });
            }
        });

        window.matchMedia('(min-width: 821px)').addEventListener('change', function (event) {
            if (event.matches) {
                closeNavigation();
            }
        });
    }
})();
