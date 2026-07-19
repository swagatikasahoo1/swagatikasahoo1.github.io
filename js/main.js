/* =============================================================
   Swagatika Sahoo — Professional Academic Portfolio
   JavaScript — js/main.js
   Premium Edition · Multi-Page Routing
   ============================================================= */

(function () {
    'use strict';

    /* -------------------- Utilities -------------------- */
    function throttle(fn, limit) {
        var inThrottle = false;
        return function () {
            var args = arguments, ctx = this;
            if (!inThrottle) {
                fn.apply(ctx, args);
                inThrottle = true;
                setTimeout(function () { inThrottle = false; }, limit);
            }
        };
    }

    /* -------------------- 1. Theme (Day / Night) -------------------- */
    function initTheme() {
        var root = document.documentElement;
        var btn  = document.getElementById('themeToggle');
        if (!btn) return;

        function syncMeta(theme) {
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) {
                meta.setAttribute('content', theme === 'dark' ? '#000000' : '#f6f8fc');
            }
        }

        function applyTheme(theme, persist, withRipple) {
            if (withRipple && btn) {
                btn.style.transform = 'scale(0.85) rotate(180deg)';
                setTimeout(function () { btn.style.transform = ''; }, 300);
            }
            root.setAttribute('data-theme', theme);
            btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
            btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode (T)' : 'Switch to dark mode (T)');
            syncMeta(theme);
            if (persist) {
                try { localStorage.setItem('theme', theme); } catch (e) {}
            }
        }

        applyTheme(root.getAttribute('data-theme') || 'light', false, false);

        btn.addEventListener('click', function () {
            var current = root.getAttribute('data-theme') || 'light';
            applyTheme(current === 'light' ? 'dark' : 'light', true, true);
        });

        document.addEventListener('keydown', function (e) {
            if ((e.key === 't' || e.key === 'T') &&
                !e.metaKey && !e.ctrlKey && !e.altKey &&
                !/^(input|textarea|select)$/i.test(e.target.tagName)) {
                e.preventDefault();
                btn.click();
            }
        });

        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            var mqHandler = function (e) {
                try {
                    if (!localStorage.getItem('theme')) {
                        applyTheme(e.matches ? 'dark' : 'light', false, false);
                    }
                } catch (err) {}
            };
            if (mq.addEventListener) mq.addEventListener('change', mqHandler);
            else if (mq.addListener) mq.addListener(mqHandler);
        }
    }

    /* -------------------- 2. Scroll Progress Bar -------------------- */
    function initProgressBar() {
        var bar = document.getElementById('progressBar');
        if (!bar) return;
        function update() {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }
        window.addEventListener('scroll', throttle(update, 10), { passive: true });
        window.addEventListener('resize', throttle(update, 100), { passive: true });
        update();
    }

    /* -------------------- 3. Header Shadow on Scroll -------------------- */
    function initHeaderScroll() {
        var header = document.getElementById('siteHeader');
        if (!header) return;
        function toggle() {
            header.classList.toggle('scrolled', window.scrollY > 8);
        }
        window.addEventListener('scroll', throttle(toggle, 50), { passive: true });
        toggle();
    }

    /* -------------------- 4. Page Routing (multi-page SPA) -------------------- */
    function initPageRouting() {
        var pages     = document.querySelectorAll('.page');
        var navLinks  = document.querySelectorAll('[data-page-link]');
        var validIds  = Array.prototype.map.call(pages, function (p) {
            return p.getAttribute('data-page');
        });
        var isAnimating = false;

        function showPage(id, opts) {
            opts = opts || {};
            if (validIds.indexOf(id) === -1) id = 'home';
            if (isAnimating) return;
            isAnimating = true;

            // Update active page
            pages.forEach(function (page) {
                page.classList.remove('active');
                // Reset all reveal elements inside
                page.querySelectorAll('.reveal').forEach(function (el) {
                    el.classList.remove('visible');
                });
            });

            var target = document.querySelector('.page[data-page="' + id + '"]');
            if (target) {
                // Small delay so the fade-out feels intentional
                setTimeout(function () {
                    target.classList.add('active');
                    // Re-observe reveals for the new page
                    observeRevealsIn(target);
                    // Scroll to top of the new page
                    if (!opts.skipScroll) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setTimeout(function () { isAnimating = false; }, 500);
                }, 50);
            } else {
                isAnimating = false;
            }

            // Update active nav link
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('data-page-link') === id) link.classList.add('active');
            });

            // Update URL hash without triggering a scroll
            if (!opts.skipHash) {
                var newHash = '#' + id;
                if (window.location.hash !== newHash) {
                    try {
                        history.pushState({ page: id }, '', newHash);
                    } catch (e) {
                        window.location.hash = newHash;
                    }
                }
            }

            // Update document title
            var titles = {
                home:         'Swagatika Sahoo — Assistant Professor, IIIT Dharwad',
                about:        'About — Swagatika Sahoo',
                research:     'Research — Swagatika Sahoo',
                people:       'Research Group — Swagatika Sahoo',
                teaching:     'Teaching — Swagatika Sahoo',
                publications: 'Publications — Swagatika Sahoo',
                talks:        'Invited Talks — Swagatika Sahoo',
                service:      'Service — Swagatika Sahoo',
                tools:        'Tools & Data — Swagatika Sahoo',
                videos:       'Talks & Videos — Swagatika Sahoo',
                gallery:      'Photo Gallery — Swagatika Sahoo',
                prospective:  'Prospective Students — Swagatika Sahoo',
                awards:       'Awards & Honours — Swagatika Sahoo'
            };
            document.title = titles[id] || titles.home;
        }

        // Click handler for any [data-page-link]
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var id = this.getAttribute('data-page-link');
                if (!id) return;
                e.preventDefault();
                showPage(id);
                // Close mobile menu if open
                var hamburger = document.getElementById('hamburger');
                var navMenu   = document.getElementById('navLinks');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', function (e) {
            var id = (e.state && e.state.page) || (window.location.hash || '').replace('#', '') || 'home';
            showPage(id, { skipHash: true, skipScroll: true });
            window.scrollTo(0, 0);
        });

        // Initial page from URL hash
        var initial = (window.location.hash || '').replace('#', '') || 'home';
        showPage(initial, { skipHash: true, skipScroll: true });
    }

    /* -------------------- 5. Mobile Menu -------------------- */
    function initMobileMenu() {
        var hamburger = document.getElementById('hamburger');
        var navLinks  = document.getElementById('navLinks');
        if (!hamburger || !navLinks) return;

        function close() {
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        }
        function open() {
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            navLinks.classList.add('active');
        }

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            if (hamburger.classList.contains('open')) close();
            else open();
        });

        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) close();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && hamburger.classList.contains('open')) close();
        });

        var resizeHandler = throttle(function () {
            if (window.innerWidth > 768) close();
        }, 150);
        window.addEventListener('resize', resizeHandler);
    }

    /* -------------------- 6. Reveal on Scroll -------------------- */
    var revealObserver = null;
    function observeRevealsIn(scope) {
        if (!revealObserver) return;
        var elements = (scope || document).querySelectorAll('.reveal:not(.visible)');
        elements.forEach(function (el) { revealObserver.observe(el); });
    }

    function initRevealAnimations() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }
        revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        // Observe reveals in the initial active page
        var initialPage = document.querySelector('.page.active');
        if (initialPage) observeRevealsIn(initialPage);
    }

    /* -------------------- 7. Back to Top Button -------------------- */
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;
        function toggle() {
            btn.classList.toggle('visible', window.scrollY > 400);
        }
        window.addEventListener('scroll', throttle(toggle, 80), { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* -------------------- 8. Subtle Parallax on Hero Photo -------------------- */
    function initParallax() {
        var photo = document.querySelector('.photo-frame');
        if (!photo) return;
        var handler = throttle(function () {
            var y = window.scrollY;
            if (y < 600) photo.style.transform = 'translateY(' + (y * 0.08) + 'px)';
        }, 16);
        window.addEventListener('scroll', handler, { passive: true });
    }

    /* -------------------- 9. Animated Counter for Stats -------------------- */
    function initCounters() {
        var stats = document.querySelectorAll('.stat-value');
        if (!stats.length || !('IntersectionObserver' in window)) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var text = el.textContent.trim();
                var match = text.match(/(\d+)/);
                if (!match) { observer.unobserve(el); return; }
                var target = parseInt(match[1], 10);
                var suffix = text.replace(match[1], '');
                var current = 0;
                var step = Math.max(1, Math.ceil(target / 30));
                var interval = setInterval(function () {
                    current += step;
                    if (current >= target) { current = target; clearInterval(interval); }
                    el.textContent = current + suffix;
                }, 35);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });
        stats.forEach(function (s) { observer.observe(s); });
    }

    /* -------------------- 10. Daily Quote of the Day -------------------- */
    function initDailyQuote() {
        var textEl   = document.getElementById('quoteText');
        var authorEl = document.getElementById('quoteAuthor');
        var dayEl    = document.getElementById('quoteDay');
        var monthEl  = document.getElementById('quoteMonth');
        if (!textEl) return;

        // Academic / research / inspirational quotes
        var quotes = [
            { text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.", author: "Bill Gates" },
            { text: "Research is what I'm doing when I don't know what I'm doing.", author: "Wernher von Braun" },
            { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
            { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
            { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
            { text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", author: "Albert Einstein" },
            { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
            { text: "If we knew what it was we were doing, it would not be called research, would it?", author: "Albert Einstein" },
            { text: "The scientist discovers a new type of material or energy and the engineer discovers a new use for it.", author: "Gordon Lindsay Glegg" },
            { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
            { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
            { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
            { text: "The only source of knowledge is experience.", author: "Albert Einstein" },
            { text: "Logic is the beginning of wisdom, not the end.", author: "Leonard Nimoy" },
            { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
            { text: "Whether you think you can, or you think you can't — you're right.", author: "Henry Ford" },
            { text: "We cannot solve our problems with the same thinking we used when we created them.", author: "Albert Einstein" },
            { text: "The art of science consists in asking the right questions.", author: "Anonymous" },
            { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
            { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
            { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie" },
            { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
            { text: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
            { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
            { text: "What we know is a drop, what we don't know is an ocean.", author: "Isaac Newton" },
            { text: "Science and everyday life cannot and should not be separated.", author: "Rosalind Franklin" },
            { text: "I have no special talent. I am only passionately curious.", author: "Albert Einstein" },
            { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
            { text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou" },
            { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
        ];

        // Pick a quote based on the day of the year (so it changes daily)
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff  = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        var quoteIndex = dayOfYear % quotes.length;

        textEl.textContent   = quotes[quoteIndex].text;
        authorEl.textContent = quotes[quoteIndex].author;

        var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        dayEl.textContent   = days[now.getDay()];
        monthEl.textContent = now.getDate() + ' ' + months[now.getMonth()];
    }

    /* -------------------- 11. Flash Cards Auto-Rotate -------------------- */
    function initFlashCards() {
        var cards = document.querySelectorAll('.flash-card');
        var dots  = document.querySelectorAll('.flash-dot');
        if (cards.length <= 1) return;
        var current = 0;
        var interval = 5000;

        function show(idx) {
            cards.forEach(function (c, i) {
                c.classList.toggle('active', i === idx);
            });
            dots.forEach(function (d, i) {
                d.classList.toggle('active', i === idx);
            });
            current = idx;
        }

        // Click on dots
        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-index'), 10);
                show(idx);
                resetTimer();
            });
        });

        // Auto-rotate
        var timer;
        function startTimer() {
            timer = setInterval(function () {
                show((current + 1) % cards.length);
            }, interval);
        }
        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }
        startTimer();
    }

    /* -------------------- 12. Video Modal -------------------- */
    function initVideoModal() {
        var thumbs = document.querySelectorAll('[data-video-id], [data-video-src]');
        thumbs.forEach(function (thumb) {
            thumb.addEventListener('click', function (e) {
                e.preventDefault();
                var type = this.getAttribute('data-video-type');
                var src, content;
                if (type === 'youtube') {
                    var id = this.getAttribute('data-video-id');
                    content = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                } else {
                    var videoSrc = this.getAttribute('data-video-src');
                    content = '<video controls autoplay><source src="' + videoSrc + '" type="video/mp4">Your browser does not support the video tag.</video>';
                }
                openVideoModal(content);
            });
        });
    }

    function openVideoModal(content) {
        var modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML =
            '<div class="video-modal-backdrop"></div>' +
            '<div class="video-modal-content">' +
                '<button class="video-modal-close" aria-label="Close video">×</button>' +
                content +
            '</div>';
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        setTimeout(function () { modal.classList.add('open'); }, 10);

        function close() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(function () { modal.remove(); }, 250);
        }
        modal.querySelector('.video-modal-close').addEventListener('click', close);
        modal.querySelector('.video-modal-backdrop').addEventListener('click', close);
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
        });
    }

    /* -------------------- 13. Gallery Filter -------------------- */
    function initGalleryFilter() {
        var filters = document.querySelectorAll('.gallery-filter');
        var items   = document.querySelectorAll('.gallery-item');
        if (!filters.length || !items.length) return;

        filters.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = this.getAttribute('data-filter');

                filters.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                items.forEach(function (item) {
                    var cat = item.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        item.style.display = '';
                        // re-trigger animation
                        item.classList.remove('visible');
                        setTimeout(function () { item.classList.add('visible'); }, 30);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /* -------------------- Init -------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initPageRouting();
        initProgressBar();
        initHeaderScroll();
        initMobileMenu();
        initRevealAnimations();
        initBackToTop();
        initParallax();
        initCounters();
        initDailyQuote();
        initFlashCards();
        initVideoModal();
        initGalleryFilter();
    });
})();
