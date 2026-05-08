(function () {
    'use strict';

    // Mobile nav toggle
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('is-open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('is-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Sticky nav shadow on scroll
    var siteNav = document.getElementById('site-nav');

    if (siteNav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                siteNav.classList.add('scrolled');
            } else {
                siteNav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Newsletter form — email validation + Ghost Members integration
    var newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        var emailInput  = newsletterForm.querySelector('.newsletter-input');
        var successMsg  = newsletterForm.querySelector('.newsletter-success');
        var errorMsg    = newsletterForm.querySelector('.newsletter-error');
        var emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function showError(msg) {
            if (errorMsg) {
                errorMsg.textContent = msg;
                errorMsg.style.display = 'block';
            }
            if (successMsg) successMsg.style.display = 'none';
        }

        function showSuccess() {
            if (successMsg) successMsg.style.display = 'block';
            if (errorMsg)   errorMsg.style.display   = 'none';
        }

        newsletterForm.addEventListener('submit', function (e) {
            var email = emailInput ? emailInput.value.trim() : '';

            if (!emailRegex.test(email)) {
                e.preventDefault();
                showError('Please enter a valid email address.');
                return;
            }

            if (errorMsg) errorMsg.style.display = 'none';
        });

        // Ghost Members events
        document.addEventListener('members:signup:success', showSuccess);
        document.addEventListener('members:signup:error', function () {
            showError('Something went wrong. Please try again.');
        });
    }
}());
