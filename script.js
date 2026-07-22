/* ========================================
   TASKAURA GLOBAL — Interactive Scripts
   ======================================== */

// ---- Web3Forms Configuration ----
// Enter your access key below (get a free key from https://web3forms.com/)
const WEB3FORMS_ACCESS_KEY = "bfc14f9f-7037-4217-b56a-ea8fe9f8b38e";

document.addEventListener('DOMContentLoaded', () => {
  // ---- Force scroll to top on page refresh ----
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');
  const heroVideo = document.getElementById('hero-video');

  // ---- Navbar: scrolled state ----
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile Menu Toggle ----
  const toggleMenu = () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      menu.classList.remove('open');
      hamburger.classList.remove('active');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
      
      // Close dropdowns when closing menu
      document.querySelectorAll('.navbar__dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    } else {
      menu.classList.add('open');
      hamburger.classList.add('active');
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
  };

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking normal links (not dropdown toggles)
  document.querySelectorAll('.navbar__link:not(.navbar__link--dropdown), .navbar__dropdown-item, .navbar__btn-cta').forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('open')) toggleMenu();
    });
  });

  // Mobile Dropdowns Accordion Toggle
  document.querySelectorAll('.navbar__dropdown').forEach(dropdown => {
    const toggleLink = dropdown.querySelector('.navbar__link--dropdown');
    if (toggleLink) {
      toggleLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 1199) {
          e.preventDefault();
          e.stopPropagation();
          
          const isActive = dropdown.classList.contains('active');
          
          // Collapse other active dropdowns
          document.querySelectorAll('.navbar__dropdown').forEach(other => {
            if (other !== dropdown) other.classList.remove('active');
          });
          
          if (isActive) {
            dropdown.classList.remove('active');
          } else {
            dropdown.classList.add('active');
          }
        }
      });
    }
  });

  // ---- Ensure video plays ----
  const playVideo = () => {
    if (heroVideo && heroVideo.tagName === 'VIDEO' && heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  };

  playVideo();
  document.addEventListener('click', playVideo, { once: true });
  document.addEventListener('touchstart', playVideo, { once: true });

  // ---- Services Section: Accordion Interactions ----
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-item__header');
    const panel = item.querySelector('.accordion-item__panel');

    if (header && panel) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other open accordion items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherPanel = otherItem.querySelector('.accordion-item__panel');
            if (otherPanel) otherPanel.style.maxHeight = '0';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          panel.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px'; // Dynamic height calculation for seamless transition
        }
      });
    }
  });

  // Auto-expand the first item on initial load for a premium welcoming feel
  const firstItem = document.getElementById('accordion-service-1');
  if (firstItem) {
    setTimeout(() => {
      firstItem.classList.add('active');
      const firstPanel = firstItem.querySelector('.accordion-item__panel');
      if (firstPanel) firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }, 300);
  }

  // ---- About Section: Video Playback & Scroll Reveal Observer ----
  const aboutSection = document.getElementById('about-section');
  const aboutVideo = document.getElementById('about-logo-video');

  if (aboutSection && aboutVideo) {
    const observerOptions = {
      root: null,
      threshold: 0.25, // Triggers when 25% of the section is visible
    };

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('in-view');
          
          // Reset and play the video from the beginning
          aboutVideo.currentTime = 0;
          aboutVideo.play().catch(err => {
            console.log("Video auto-play blocked or interrupted:", err);
          });
        } else {
          // Pause when scrolled out of view to conserve resources
          aboutVideo.pause();
        }
      });
    }, observerOptions);

    aboutObserver.observe(aboutSection);
  }

  // ---- Contact Section: Interaction, Reveal & Form Submission ----
  const contactSection = document.getElementById('contact-section');
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');

  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactSection.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.15 });

    contactObserver.observe(contactSection);
  }

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual feedback states
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = '<span>Sending...</span>';

      const formData = new FormData(contactForm);
      // Append access key for Web3Forms API
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'New Contact Message from ' + formData.get('name'));
      formData.append('from_name', 'TaskAura Global');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 200 && result.success) {
          submitBtn.innerHTML = '<span>Message Sent!</span>';
          submitBtn.style.background = '#39e58e'; // Active green feedback color
          submitBtn.style.boxShadow = '0 8px 24px rgba(57, 229, 142, 0.3)';
          contactForm.reset();
        } else {
          console.error(result);
          submitBtn.innerHTML = '<span>Error Sending!</span>';
          submitBtn.style.background = '#ff4d4d'; // Error red feedback color
          submitBtn.style.boxShadow = '0 8px 24px rgba(255, 77, 77, 0.3)';
        }
      })
      .catch((error) => {
        console.error(error);
        submitBtn.innerHTML = '<span>Connection Error!</span>';
        submitBtn.style.background = '#ff4d4d';
        submitBtn.style.boxShadow = '0 8px 24px rgba(255, 77, 77, 0.3)';
      })
      .finally(() => {
        // Restore original state
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
          submitBtn.innerHTML = originalText;
        }, 3000);
      });
    });
  }

  // =========================================================================
  // ---- LIQUID GLASS GENERATOR SYSTEM ----
  // =========================================================================
  const initLiquidGlass = () => {
    const nav = document.getElementById('navbar-capsule');
    if (!nav) return;

    // 1. Create and inject SVG container for defs if it does not exist
    let svgContainer = document.getElementById('liquid-glass-svg-container');
    if (!svgContainer) {
      svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgContainer.id = 'liquid-glass-svg-container';
      svgContainer.setAttribute('width', '0');
      svgContainer.setAttribute('height', '0');
      svgContainer.setAttribute('style', 'position: absolute; pointer-events: none; overflow: hidden; top: -100px; left: -100px;');
      svgContainer.setAttribute('color-interpolation-filters', 'sRGB');
      
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.id = 'liquid-glass-svg-defs';
      svgContainer.appendChild(defs);
      document.body.appendChild(svgContainer);
    }

    const svgDefs = document.getElementById('liquid-glass-svg-defs');

    // 2. Refraction profiles and height maps formulas matching exact site maths
    const SURFACE_FNS = {
      convex_squircle: (x) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),
      convex_circle: (x) => Math.sqrt(1 - (1 - x) * (1 - x)),
      concave: (x) => 1 - Math.sqrt(1 - (1 - x) * (1 - x)),
      lip: (x) => {
        const convex = Math.pow(1 - Math.pow(1 - Math.min(x * 2, 1), 4), 0.25);
        const concave = 1 - Math.sqrt(1 - (1 - x) * (1 - x)) + 0.1;
        const t = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
        return convex * (1 - t) + concave * t;
      },
    };

    const calculateRefractionProfile = (glassThickness, bezelWidth, heightFn, ior, samples = 128) => {
      const eta = 1 / ior;
      const refract = (nx, ny) => {
        const dot = ny;
        const k = 1 - eta * eta * (1 - dot * dot);
        if (k < 0) return null;
        const sq = Math.sqrt(k);
        return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
      };
      
      const profile = new Float64Array(samples);
      for (let i = 0; i < samples; i++) {
        const x = i / samples;
        const y = heightFn(x);
        const dx = x < 1 ? 0.0001 : -0.0001;
        const y2 = heightFn(x + dx);
        const deriv = (y2 - y) / dx;
        const mag = Math.sqrt(deriv * deriv + 1);
        const ref = refract(-deriv / mag, -1 / mag);
        if (!ref) {
          profile[i] = 0;
          continue;
        }
        profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
      }
      return profile;
    };

    const generateDisplacementMap = (w, h, radius, bezelWidth, profile, maxDisp) => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(w, h);
      const d = img.data;
      
      for (let i = 0; i < d.length; i += 4) {
        d[i] = 128;
        d[i + 1] = 128;
        d[i + 2] = 0;
        d[i + 3] = 255;
      }

      const r = radius;
      const rSq = r * r;
      const r1Sq = (r + 1) ** 2;
      const rBSq = Math.max(r - bezelWidth, 0) ** 2;
      const wB = w - r * 2;
      const hB = h - r * 2;
      const S = profile.length;

      for (let y1 = 0; y1 < h; y1++) {
        for (let x1 = 0; x1 < w; x1++) {
          const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
          const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
          const dSq = x * x + y * y;
          if (dSq > r1Sq || dSq < rBSq) continue;
          const dist = Math.sqrt(dSq);
          const fromSide = r - dist;
          const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
          if (op <= 0 || dist === 0) continue;
          const cos = x / dist;
          const sin = y / dist;
          const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
          const disp = profile[bi] || 0;
          const dX = (-cos * disp) / maxDisp;
          const dY = (-sin * disp) / maxDisp;
          const idx = (y1 * w + x1) * 4;
          d[idx] = (128 + dX * 127 * op + 0.5) | 0;
          d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
        }
      }
      ctx.putImageData(img, 0, 0);
      return canvas.toDataURL();
    };

    const generateSpecularMap = (w, h, radius, bezelWidth, angle = Math.PI / 3) => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(w, h);
      const d = img.data;
      d.fill(0);

      const r = radius;
      const rSq = r * r;
      const r1Sq = (r + 1) ** 2;
      const rBSq = Math.max(r - bezelWidth, 0) ** 2;
      const wB = w - r * 2;
      const hB = h - r * 2;
      const sv = [Math.cos(angle), Math.sin(angle)];

      for (let y1 = 0; y1 < h; y1++) {
        for (let x1 = 0; x1 < w; x1++) {
          const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
          const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
          const dSq = x * x + y * y;
          if (dSq > r1Sq || dSq < rBSq) continue;
          const dist = Math.sqrt(dSq);
          const fromSide = r - dist;
          const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
          if (op <= 0 || dist === 0) continue;
          const cos = x / dist;
          const sin = -y / dist;
          const dot = Math.abs(cos * sv[0] + sin * sv[1]);
          const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
          const coeff = dot * edge;
          const col = (255 * coeff) | 0;
          const alpha = (col * coeff * op) | 0;
          const idx = (y1 * w + x1) * 4;
          d[idx] = col;
          d[idx + 1] = col;
          d[idx + 2] = col;
          d[idx + 3] = alpha;
        }
      }
      ctx.putImageData(img, 0, 0);
      return canvas.toDataURL();
    };

    // 3. Rebuild filter function for target element dimensions
    const rebuildNavbarFilter = () => {
      const w = nav.offsetWidth;
      const h = nav.offsetHeight;
      if (w < 2 || h < 2) return;

      // Extract dynamic border radius from CSS computed styles to support capsule/pill transition
      const computedStyle = window.getComputedStyle(nav);
      const computedRadius = parseFloat(computedStyle.borderRadius) || 38;

      // High fidelity parameters from reference
      const glassThick = 80;
      const bezelW = 60;
      const ior = 3.0;
      const scaleRatio = 1.0;
      const blurAmt = 0.3;
      const specOpacity = 0.50;
      const specSat = 4;

      const heightFn = SURFACE_FNS.convex_squircle;
      const clampedBezel = Math.min(bezelW, computedRadius - 1, Math.min(w, h) / 2 - 1);

      const profile = calculateRefractionProfile(glassThick, clampedBezel, heightFn, ior, 128);
      const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
      const dispUrl = generateDisplacementMap(w, h, computedRadius, clampedBezel, profile, maxDisp);
      const specUrl = generateSpecularMap(w, h, computedRadius, clampedBezel * 2.5);
      const scale = maxDisp * scaleRatio;

      svgDefs.innerHTML = `
        <filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmt}" result="blurred_source" />
          <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp_map" />
          <feDisplacementMap in="blurred_source" in2="disp_map"
            scale="${scale}" xChannelSelector="R" yChannelSelector="G"
            result="displaced" />
          <feColorMatrix in="displaced" type="saturate" values="${specSat}" result="displaced_sat" />
          <feImage href="${specUrl}" x="0" y="0" width="${w}" height="${h}" result="spec_layer" />
          <feComposite in="displaced_sat" in2="spec_layer" operator="in" result="spec_masked" />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="${specOpacity}" />
          </feComponentTransfer>
          <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
      `;
    };

    // 4. Create a ResizeObserver to trigger on size changes (window resize, scroll height transitions)
    const resizeObserver = new ResizeObserver(() => {
      rebuildNavbarFilter();
    });
    resizeObserver.observe(nav);

    // Initial build
    rebuildNavbarFilter();
  };

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    const content = item.querySelector('.faq-item__content');
    if (!trigger || !content) return;
    
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-item__content');
          if (otherContent) {
            otherContent.style.maxHeight = '0';
            otherContent.style.opacity = '0';
          }
        }
      });
      
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      }
    });
  });

  // ---- FAQ Scroll Spy & Navigation ----
  const faqLinks = document.querySelectorAll('.faq__nav-link');
  const faqSections = document.querySelectorAll('.faq__section');
  
  if (faqLinks.length > 0 && faqSections.length > 0) {
    // Smooth scroll on click
    faqLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const headerOffset = 130;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Scroll spy active class toggling
    const handleScrollSpy = () => {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 160; // Offset for header + padding
      
      faqSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });
      
      if (currentSectionId) {
        faqLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
            
            // Scroll category bar on mobile to keep active item visible
            const parentList = link.closest('.faq__nav-list');
            if (parentList && window.innerWidth <= 1024) {
              const linkRect = link.getBoundingClientRect();
              const listRect = parentList.getBoundingClientRect();
              if (linkRect.left < listRect.left || linkRect.right > listRect.right) {
                parentList.scrollTo({
                  left: link.offsetLeft - parentList.offsetWidth / 2 + link.offsetWidth / 2,
                  behavior: 'smooth'
                });
              }
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScrollSpy);
    // Trigger once on load
    handleScrollSpy();
  }

  // ---- Portfolio Filter Logic ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and add to the clicked one
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const isMatch = filterValue === 'all' || card.getAttribute('data-category') === filterValue;

          // Clear any existing transition timeout for this card to prevent rapid click conflicts
          if (card.dataset.timeoutId) {
            clearTimeout(parseInt(card.dataset.timeoutId));
            card.removeAttribute('data-timeout-id');
          }

          if (isMatch) {
            // Show matching card
            card.classList.remove('hidden');
            // Trigger reflow to ensure the transition runs smoothly
            void card.offsetWidth; 
            card.style.opacity = '';
            card.style.transform = '';
            card.style.pointerEvents = '';
          } else {
            // Hide non-matching card
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            card.style.pointerEvents = 'none';

            const timeoutId = setTimeout(() => {
              card.classList.add('hidden');
              card.removeAttribute('data-timeout-id');
            }, 300);
            card.dataset.timeoutId = timeoutId;
          }
        });
      });
    });
  }

  // ---- IntersectionObserver Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ---- Smooth scroll and filter activation for hash links ----
  const handleHashLink = (hash, isInitialLoad = false) => {
    if (!hash) return;
    try {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        if (targetEl.classList.contains('portfolio-card')) {
          // 1. Trigger the 'All' filter button to ensure the card is visible
          const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
          if (allFilterBtn && !allFilterBtn.classList.contains('active')) {
            allFilterBtn.click();
          }
          
          // 2. Wait a brief moment for the cards to animate/become visible, then scroll
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a temporary highlight effect to the card to draw the user's attention
            targetEl.classList.add('highlight-glow');
            setTimeout(() => targetEl.classList.remove('highlight-glow'), 2200);
          }, 350);
        } else if (isInitialLoad) {
          // Force scrollIntoView on initial page load because window.scrollTo(0,0) blocks default jump
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch (e) {
      console.warn("Invalid hash target for scroll:", hash);
    }
  };

  // Listen for hash changes (clicking dropdown links on the same page)
  window.addEventListener('hashchange', () => {
    handleHashLink(window.location.hash, false);
  });

  // Handle initial page load with hash
  if (window.location.hash) {
    // Delay slightly to allow content/DOM to be fully ready
    setTimeout(() => {
      handleHashLink(window.location.hash, true);
    }, 600);
  }

  // ---- AI Integration Browser Mockup Slideshow ----
  const browserMockup = document.querySelector('.browser-mockup');
  if (browserMockup) {
    const tabs = browserMockup.querySelectorAll('.browser-tab');
    const slidesWrapper = browserMockup.querySelector('#browser-slides-wrapper');
    let activeIndex = 0;
    let slideshowInterval = null;

    const startSlideshow = () => {
      slideshowInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % tabs.length;
        updateSlide(activeIndex);
      }, 4000); // Switch slide every 4 seconds
    };

    const stopSlideshow = () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };

    const updateSlide = (index) => {
      const targetTab = tabs[index];
      if (targetTab && slidesWrapper) {
        // Shift slide wrapper by index percentage
        const shiftPercent = -index * 25; // 4 slides = 25% each
        slidesWrapper.style.transform = `translateX(${shiftPercent}%)`;

        tabs.forEach(t => t.classList.remove('active'));
        targetTab.classList.add('active');
        
        // Auto-scroll mobile tabs bar to keep active tab visible
        const tabsContainer = browserMockup.querySelector('.browser-tabs');
        if (tabsContainer) {
          const tabRect = targetTab.getBoundingClientRect();
          const containerRect = tabsContainer.getBoundingClientRect();
          if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
            tabsContainer.scrollTo({
              left: targetTab.offsetLeft - tabsContainer.offsetWidth / 2 + targetTab.offsetWidth / 2,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    // Initialize slideshow
    startSlideshow();

    // Click handler for manual override
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        activeIndex = index;
        updateSlide(activeIndex);
        // Reset the timer so it stays on the clicked slide for a full duration
        stopSlideshow();
        startSlideshow();
      });
    });

    // Pause on hover
    browserMockup.addEventListener('mouseenter', stopSlideshow);
    browserMockup.addEventListener('mouseleave', startSlideshow);
  }

  // ---- Aura AI Chatbot Widget ----
  function initChatbot() {
    // Inject Chatbot HTML container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'taskaura-chatbot';
    chatContainer.innerHTML = `
      <div class="chat-trigger-group">
        <div class="chat-trigger-label" id="chat-trigger-label">
          Ask! Aura
        </div>
        <button class="chat-trigger" id="chat-trigger" aria-label="Open AI Assistant" style="padding: 0; overflow: hidden;">
          <img class="chat-icon-open" src="asset/logo/chat-logo.png" alt="Open Chat" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;">
          <svg class="chat-icon-close" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none; color: #06060c;">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="chat-panel" id="chat-panel">
        <div class="chat-header">
          <div class="chat-header__info">
            <img src="asset/logo/chat-logo.png" class="chat-avatar" alt="Ask! Aura Logo">
            <div>
              <h4 class="chat-title">Ask! Aura</h4>
              <span class="chat-status">Online • AI Assistant</span>
            </div>
          </div>
          <button class="chat-close" id="chat-close" aria-label="Close Chat">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="chat-messages" id="chat-messages">
          <div class="chat-msg chat-msg--bot">
            <div class="chat-msg__bubble">
              Hello! I'm Aura, your AI assistant. How can I help you with TaskAura Global's services today?
            </div>
          </div>
        </div>

        <form class="chat-input-area" id="chat-form">
          <input type="text" class="chat-input" id="chat-input" placeholder="Ask about our services..." required autocomplete="off">
          <button type="submit" class="chat-send-btn" id="chat-send-btn" aria-label="Send Message">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(chatContainer);

    const trigger = document.getElementById('chat-trigger');
    const triggerLabel = document.getElementById('chat-trigger-label');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const iconOpen = trigger.querySelector('.chat-icon-open');
    const iconClose = trigger.querySelector('.chat-icon-close');

    // Retrieve or create unique session ID for chat persistence logs
    let sessionId = localStorage.getItem('taskaura_chat_session');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
      localStorage.setItem('taskaura_chat_session', sessionId);
    }

    // Keep conversation memory state
    let history = [
      { role: 'bot', text: "Hello! I'm Aura, your AI assistant. How can I help you with TaskAura Global's services today?" }
    ];

    // Toggle Chat Panel visibility
    const toggleChat = () => {
      const isActive = panel.classList.toggle('active');
      if (isActive) {
        iconOpen.style.display = 'none';
        iconClose.style.display = 'block';
        triggerLabel.classList.add('hidden'); // Hide the text label when panel is open
        chatInput.focus();
      } else {
        iconOpen.style.display = 'block';
        iconClose.style.display = 'none';
        triggerLabel.classList.remove('hidden'); // Show the text label when panel is closed
      }
    };

    trigger.addEventListener('click', toggleChat);
    triggerLabel.addEventListener('click', toggleChat); // Label is also clickable to open chat
    closeBtn.addEventListener('click', toggleChat);

    // Convert basic markdown (bold, bullet points, newlines) to HTML safely
    const formatMarkdown = (text) => {
      // Escape HTML to prevent XSS
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Bold: **text** -> <strong>text</strong>
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Bullet points: lines starting with * or -
      const lines = html.split('\n');
      let inList = false;
      const processedLines = [];

      for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          if (!inList) {
            processedLines.push('<ul style="margin: 8px 0; padding-left: 20px; list-style-type: disc;">');
            inList = true;
          }
          processedLines.push(`<li>${trimmed.substring(2)}</li>`);
        } else {
          if (inList) {
            processedLines.push('</ul>');
            inList = false;
          }
          processedLines.push(line);
        }
      }
      if (inList) {
        processedLines.push('</ul>');
      }

      // Join and replace remaining newlines with linebreaks
      return processedLines.join('\n').replace(/\n/g, '<br>');
    };

    // Append Message helper
    const appendMessage = (role, text) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg chat-msg--${role}`;
      msgDiv.innerHTML = `<div class="chat-msg__bubble">${formatMarkdown(text)}</div>`;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Streaming Typewriter Message helper
    const appendMessageStream = (role, text) => {
      if (role === 'user') {
        appendMessage('user', text);
        return;
      }

      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg chat-msg--bot`;
      msgDiv.innerHTML = `<div class="chat-msg__bubble"></div>`;
      chatMessages.appendChild(msgDiv);
      const bubble = msgDiv.querySelector('.chat-msg__bubble');

      const chunks = text.match(/\S+|\s+/g) || [];
      let currentText = '';
      let i = 0;

      const stream = () => {
        if (i < chunks.length) {
          currentText += chunks[i];
          bubble.innerHTML = formatMarkdown(currentText);
          chatMessages.scrollTop = chatMessages.scrollHeight;
          i++;
          setTimeout(stream, 25);
        } else {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      };

      stream();
    };

    // Show/Hide Typing Indicator helpers
    let typingIndicator = null;
    const showTypingIndicator = () => {
      if (typingIndicator) return;
      typingIndicator = document.createElement('div');
      typingIndicator.className = 'chat-msg chat-msg--bot';
      typingIndicator.id = 'chat-typing-indicator';
      typingIndicator.innerHTML = `
        <div class="chat-msg__bubble typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
      if (typingIndicator) {
        typingIndicator.remove();
        typingIndicator = null;
      }
    };

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      chatInput.value = '';
      appendMessage('user', text);
      history.push({ role: 'user', text });

      showTypingIndicator();

      // Check if running directly on file://
      if (window.location.protocol === 'file:') {
        removeTypingIndicator();
        appendMessage('bot', '⚠️ **Direct File Mode**: You are viewing this page directly from your hard drive. Browsers prevent local files from calling serverless APIs.\n\nTo test the chatbot locally:\n1. Open your terminal in this folder.\n2. Run **`netlify dev`** (starts the local serverless backend).\n3. View the site at the URL provided (usually `http://localhost:8888`).');
        return;
      }

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            history,
            session_id: sessionId
          })
        });

        removeTypingIndicator();

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            appendMessageStream('bot', data.reply);
            history.push({ role: 'bot', text: data.reply });
          } else {
            appendMessage('bot', 'Sorry, I am having trouble connecting to my brain right now. Please try again.');
          }
        } else {
          const errText = response.status === 404
            ? 'Backend server not found (404). Please ensure you are running the site via **`netlify dev`** to host the serverless functions.'
            : `API server returned error ${response.status}. Please check your environment variables.`;
          appendMessage('bot', `⚠️ ${errText}`);
        }
      } catch (err) {
        removeTypingIndicator();
        console.error('Chatbot request failed:', err);
        appendMessage('bot', '⚠️ Could not reach the server. If testing locally, make sure you ran **`netlify dev`** to start the local backend, not just a static server.');
      }
    });
  }

  // Initialize Chatbot UI
  initChatbot();

  initLiquidGlass();
});

// ---- Preloader Fade-out ----
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
  }
});

// Fallback: hide preloader after 3 seconds in case of slow resources
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
}, 3000);
