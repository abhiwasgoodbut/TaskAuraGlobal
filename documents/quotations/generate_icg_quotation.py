import os
import sys
from pathlib import Path

BASE_DIR = Path(r"c:\devoloper\TaskAura")
LOGO_B64_FILE = BASE_DIR / "asset" / "logo" / "logo_base64.txt"
OUTPUT_HTML = BASE_DIR / "documents" / "quotations" / "taskaura_icg_spatial_quotation.html"
OUTPUT_PDF = BASE_DIR / "documents" / "quotations" / "TaskAura_Quotation_ICG_Spatial_Showroom.pdf"

if LOGO_B64_FILE.exists():
    with open(LOGO_B64_FILE, "r", encoding="utf-8") as f:
        logo_b64 = f.read().strip()
    logo_src = f"data:image/png;base64,{logo_b64}"
else:
    logo_src = ""

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Project Quotation - Luxury Interior Design Platform & Interactive 3D Showroom</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 18mm 20mm 18mm 20mm;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }}

  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #212529;
    background: #ffffff;
    font-size: 12px;
    line-height: 1.5;
  }}

  .page-container {{
    max-width: 100%;
    margin: 0 auto;
  }}

  .page-break {{
    page-break-before: always;
    padding-top: 8px;
  }}

  .header-top {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }}

  .brand-logo {{
    height: 48px;
    width: auto;
    object-fit: contain;
  }}

  .brand-text-fallback {{
    font-size: 18px;
    font-weight: 700;
    color: #111;
  }}

  .doc-title {{
    font-size: 19px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
  }}

  .meta-grid {{
    font-size: 12px;
    color: #333333;
    line-height: 1.7;
    margin-bottom: 12px;
  }}

  .meta-grid strong {{
    color: #111;
    display: inline-block;
    width: 105px;
  }}

  hr.divider {{
    border: none;
    border-top: 1.5px solid #dcdcdc;
    margin: 12px 0 16px 0;
  }}

  .section-title {{
    font-size: 15px;
    font-weight: 700;
    color: #111827;
    margin: 14px 0 8px 0;
  }}

  .section-subtitle {{
    font-size: 12.5px;
    font-weight: 600;
    color: #1f2937;
    margin: 12px 0 6px 0;
  }}

  p.overview-text {{
    font-size: 12px;
    color: #374151;
    line-height: 1.55;
    margin-bottom: 8px;
  }}

  .tech-stack {{
    font-size: 12px;
    color: #111827;
  }}

  table.minimal-table {{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 11.5px;
  }}

  table.minimal-table th, 
  table.minimal-table td {{
    border: 1px solid #dcdcdc;
    padding: 6px 9px;
    text-align: left;
    vertical-align: middle;
  }}

  table.minimal-table th {{
    background-color: #f8f9fa;
    font-weight: 600;
    color: #212529;
  }}

  table.minimal-table td.col-num {{
    width: 5%;
    text-align: center;
    color: #495057;
  }}

  table.minimal-table td.col-feature {{
    width: 30%;
    font-weight: 600;
    color: #1f2937;
  }}

  table.minimal-table td.col-desc {{
    width: 65%;
    color: #374151;
  }}

  table.minimal-table td.col-cost {{
    text-align: right;
    width: 25%;
    font-weight: 600;
    color: #111827;
  }}

  table.minimal-table tr.total-row td {{
    font-weight: 700;
    background-color: #f8f9fa;
    color: #111827;
    font-size: 12px;
  }}

  ol.terms-list {{
    margin-left: 18px;
    margin-bottom: 20px;
    line-height: 1.65;
    color: #374151;
    font-size: 11.5px;
  }}

  ol.terms-list li {{
    margin-bottom: 5px;
  }}

  .signature-section {{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }}

  .sig-box {{
    width: 45%;
    line-height: 2.2;
    font-size: 12px;
    color: #111;
  }}

  .sig-line {{
    border-bottom: 1px solid #000;
    display: inline-block;
    width: 170px;
    height: 16px;
    vertical-align: bottom;
  }}
</style>
</head>
<body>

<div class="page-container">

  <!-- ==================== PAGE 1 ==================== -->
  <div>
    <div class="header-top">
      <div>
        {"<img src='" + logo_src + "' class='brand-logo' alt='TaskAura Global'>" if logo_src else "<div class='brand-text-fallback'>TASKAURA GLOBAL</div>"}
      </div>
      <div style="text-align: right; font-size: 11px; color: #6b7280;">
        Enterprise Web & AI Solutions<br>
        contact@taskaura.com | taskaura.com
      </div>
    </div>

    <div class="doc-title">📋 Project Quotation – Luxury Interior Platform & Interactive 3D Showroom</div>

    <div class="meta-grid">
      <div><strong>Date:</strong> September 21, 2026</div>
      <div><strong>Client:</strong> Luxury Interior Design Studio</div>
      <div><strong>Prepared By:</strong> Abhinay (TaskAura Global)</div>
      <div><strong>Validity:</strong> 30 days from issue date</div>
    </div>

    <hr class="divider">

    <div class="section-title">1. Project Overview</div>
    <p class="overview-text">
      An ultra-luxury architectural web platform inspired by the international <strong>ICG Galleries</strong> spatial showcase. The platform features an interactive 3D virtual showroom with drag-to-explore navigation, interactive material/design hotspot pins, slide-out specification drawers, room/floor selectors, fluid GSAP scroll physics, an AI spatial consultation advisor, and automated lead capture.
    </p>
    <div class="tech-stack">
      <strong>Technology Stack:</strong> Three.js / WebGL / Pannellum, Next.js (React), GSAP & Lenis Smooth Scroll, Tailwind CSS, OpenAI API, Webhook Automation (WhatsApp & CRM).
    </div>

    <hr class="divider">

    <div class="section-title">2. Scope of Work</div>

    <div class="section-subtitle">A. ICG-Inspired Interactive 3D Spatial Showroom</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 32%;">Feature</th>
          <th style="width: 62%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">1</td>
          <td class="col-feature">Interactive 3D / 360° Canvas</td>
          <td class="col-desc">Drag or scroll to look around and explore the showroom space with smooth camera damping and inertia physics</td>
        </tr>
        <tr>
          <td class="col-num">2</td>
          <td class="col-feature">Interactive Hotspot Pins</td>
          <td class="col-desc">Clickable eye/pulse pins placed on architectural elements (Moodboards, Materials, Custom Furniture, Lighting)</td>
        </tr>
        <tr>
          <td class="col-num">3</td>
          <td class="col-feature">Slide-Out Detail Drawers</td>
          <td class="col-desc">Aside modal sliding in upon pin click showing high-res material textures, dimensions, finish options, and direct inquiry CTA</td>
        </tr>
        <tr>
          <td class="col-num">4</td>
          <td class="col-feature">Multi-Floor / Room Switcher</td>
          <td class="col-desc">Interactive selector enabling visitors to switch between spaces (e.g., Living Lounge, Penthouse Suite, Studio Floor)</td>
        </tr>
        <tr>
          <td class="col-num">5</td>
          <td class="col-feature">Ambient Audio & Soundscapes</td>
          <td class="col-desc">Toggleable luxury background soundscape and subtle micro-interaction audio feedback</td>
        </tr>
      </tbody>
    </table>

    <div class="section-subtitle">B. Editorial Landing Page (8–9 Core Sections)</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 32%;">Section</th>
          <th style="width: 62%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">6</td>
          <td class="col-feature">Cinematic Hero</td>
          <td class="col-desc">Editorial typography, ambient spatial lighting glow, 4K video reel, and consultation CTA</td>
        </tr>
        <tr>
          <td class="col-num">7</td>
          <td class="col-feature">Studio Philosophy</td>
          <td class="col-desc">Brand narrative, spatial aesthetics, awards, and craftsmanship philosophy presentation</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-break">
    <div class="section-subtitle" style="margin-top: 0;">B. Editorial Landing Page (Continued)</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 32%;">Section</th>
          <th style="width: 62%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">8</td>
          <td class="col-feature">Curated Portfolio Showcase</td>
          <td class="col-desc">Category filter (Residential, Commercial, Minimalist) with fluid scroll reveals and Before/After slider</td>
        </tr>
        <tr>
          <td class="col-num">9</td>
          <td class="col-feature">AI Spatial Advisor</td>
          <td class="col-desc">AI-powered consultation widget generating instant tailored aesthetic and moodboard suggestions based on client inputs</td>
        </tr>
        <tr>
          <td class="col-num">10</td>
          <td class="col-feature">Services & Offerings</td>
          <td class="col-desc">Turnkey Renovations, 3D Spatial Visualizations, Space Planning, and Bespoke Furniture Curation</td>
        </tr>
        <tr>
          <td class="col-num">11</td>
          <td class="col-feature">Execution Blueprint</td>
          <td class="col-desc">4-phase visual trajectory (Consultation → 3D Concept → Procurement → Handover)</td>
        </tr>
        <tr>
          <td class="col-num">12</td>
          <td class="col-feature">Testimonials & Press</td>
          <td class="col-desc">High-trust client feedback, verified homeowner reviews, and architectural press badges</td>
        </tr>
        <tr>
          <td class="col-num">13</td>
          <td class="col-feature">Smart Lead Engine</td>
          <td class="col-desc">Multi-step consultation form capturing room sizes, budget tier, and timeline with automated validation</td>
        </tr>
        <tr>
          <td class="col-num">14</td>
          <td class="col-feature">Studio Global Footer</td>
          <td class="col-desc">Studio coordinates, direct contacts, social channels, copyright notice, and smooth navigation anchors</td>
        </tr>
      </tbody>
    </table>

    <div class="section-subtitle">C. Automation & Engineering Infrastructure</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 32%;">Feature</th>
          <th style="width: 62%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">15</td>
          <td class="col-feature">GSAP & Lenis Smooth Scroll</td>
          <td class="col-desc">60fps inertia scrolling, subtle parallax reveals, and zero cumulative layout shift (CLS)</td>
        </tr>
        <tr>
          <td class="col-num">16</td>
          <td class="col-feature">Lead Webhook Automation</td>
          <td class="col-desc">Zero-latency instant lead routing to Studio WhatsApp, Email (Resend), and Google Sheets CRM</td>
        </tr>
        <tr>
          <td class="col-num">17</td>
          <td class="col-feature">Asset & WebGL Optimization</td>
          <td class="col-desc">Compressed 3D textures, WebP/AVIF imagery, progressive asset loading, and 90+ Core Web Vitals</td>
        </tr>
      </tbody>
    </table>

    <hr class="divider">

    <div class="section-title">3. Deliverables</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 32%;">Deliverable</th>
          <th style="width: 62%;">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">1</td>
          <td class="col-feature">Figma UI/UX System</td>
          <td class="col-desc">Full high-fidelity prototype including landing page, 3D showroom controls, and aside modal layouts</td>
        </tr>
        <tr>
          <td class="col-num">2</td>
          <td class="col-feature">Interactive 3D Showroom Module</td>
          <td class="col-desc">Production-grade WebGL/Three.js spatial tour engine with pins, aside drawers, and floor selector</td>
        </tr>
        <tr>
          <td class="col-num">3</td>
          <td class="col-feature">Complete Web Platform Code</td>
          <td class="col-desc">Full Next.js / React source repository, modular components, and responsive front-end build</td>
        </tr>
        <tr>
          <td class="col-num">4</td>
          <td class="col-feature">AI & Webhook Automation Setup</td>
          <td class="col-desc">Integrated OpenAI consultation pipeline and live WhatsApp / CRM webhook routing</td>
        </tr>
        <tr>
          <td class="col-num">5</td>
          <td class="col-feature">Deployment & 30-Day Support</td>
          <td class="col-desc">Production deployment with custom domain, SSL, setup guide, and 30 days of warranty support</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== PAGE 3 ==================== -->
  <div class="page-break">
    <div class="section-title" style="margin-top: 0;">4. Pricing</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 75%;">Component</th>
          <th class="col-cost">Estimated Cost (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>UI/UX Design & Architectural System (Figma Prototype, 8–9 sections + 3D Showroom UI)</td>
          <td class="col-cost">₹ 15,000</td>
        </tr>
        <tr>
          <td>ICG-Style Interactive 3D Spatial Showroom (WebGL/Three.js Canvas, Hotspots & Aside Drawers)</td>
          <td class="col-cost">₹ 20,000</td>
        </tr>
        <tr>
          <td>Front-End Engineering & GSAP Scroll Dynamics (8–9 bespoke editorial sections, sliders)</td>
          <td class="col-cost">₹ 22,000</td>
        </tr>
        <tr>
          <td>AI Spatial Advisor & Style Recommendation Pipeline (OpenAI API integration)</td>
          <td class="col-cost">₹ 14,000</td>
        </tr>
        <tr>
          <td>Lead Capture Form & Webhook Automation (Instant WhatsApp & Studio CRM Routing)</td>
          <td class="col-cost">₹ 8,000</td>
        </tr>
        <tr>
          <td>3D Asset Optimization, Core Web Vitals Hardening & Production Cloud Deployment</td>
          <td class="col-cost">₹ 6,000</td>
        </tr>
        <tr class="total-row">
          <td>Total Project Investment</td>
          <td class="col-cost">₹ 85,000</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">5. Timeline</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 75%;">Phase</th>
          <th style="width: 25%;">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>UI/UX Design, Figma Wireframes & 3D Spatial Asset Preparation</td>
          <td>2 days</td>
        </tr>
        <tr>
          <td>Front-End Core & GSAP / Lenis Scroll Animation Engine</td>
          <td>4 days</td>
        </tr>
        <tr>
          <td>Interactive 3D Showroom Engine (WebGL, Hotspot Pins, Aside Modals)</td>
          <td>5 days</td>
        </tr>
        <tr>
          <td>AI Spatial Advisor Integration & Webhook Automation Pipeline</td>
          <td>2 days</td>
        </tr>
        <tr>
          <td>Performance Hardening, Cross-Browser Polish & Handover</td>
          <td>2 days</td>
        </tr>
        <tr class="total-row">
          <td>Total Estimated</td>
          <td>~15 working days</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">6. Terms & Conditions</div>
    <ol class="terms-list">
      <li><strong>Payment Milestone:</strong> 50% advance before project commencement, 30% upon approval of 3D Showroom & Alpha build, and 20% upon final delivery.</li>
      <li><strong>Revisions:</strong> Includes up to 2 rounds of design and spatial layout revisions post-delivery.</li>
      <li><strong>Third-Party Accounts:</strong> Domain, hosting, and any external third-party API usage fees are borne by the client.</li>
      <li><strong>Hypercare Warranty:</strong> Includes 30 calendar days of post-launch technical bug fixing, responsive adjustments, and performance monitoring.</li>
      <li><strong>Intellectual Property & Copyright:</strong> Upon 100% full payment settlement, <strong>all source code, 3D interactive assets, design files, and complete intellectual property / copyright ownership will be fully and unconditionally transferred to the Client</strong>. The developer retains only the non-exclusive privilege to present the finished work in their agency portfolio.</li>
    </ol>

    <div class="signature-section">
      <div class="sig-box">
        Client Signature: <span class="sig-line"></span><br>
        Date: <span class="sig-line"></span>
      </div>
      <div class="sig-box">
        Developer Signature: <span class="sig-line"></span><br>
        Date: <span class="sig-line"></span>
      </div>
    </div>
  </div>

</div>

</body>
</html>
"""

with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"HTML Template written to: {OUTPUT_HTML}")

try:
    from playwright.sync_api import sync_playwright
    print("Launching Playwright Edge to generate ICG Spatial Showroom PDF...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page()
        page.goto(OUTPUT_HTML.as_uri(), wait_until="networkidle")
        page.pdf(
            path=str(OUTPUT_PDF),
            format="A4",
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        browser.close()
    print(f"PDF generated successfully at: {OUTPUT_PDF}")
except Exception as e:
    import traceback
    traceback.print_exc()
    sys.exit(1)
