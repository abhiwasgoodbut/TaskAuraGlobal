/* ========================================
   TASKAURA GLOBAL — Interactive Scripts
   ======================================== */

// ---- Web3Forms Configuration ----
// Enter your access key below (get a free key from https://web3forms.com/)
const WEB3FORMS_ACCESS_KEY = "7c88ed05-f8ef-4b67-b199-2f455d752ac1";

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
        if (window.innerWidth <= 768) {
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
