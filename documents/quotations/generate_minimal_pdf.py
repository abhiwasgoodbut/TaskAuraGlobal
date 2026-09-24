import os
import sys
from pathlib import Path

BASE_DIR = Path(r"c:\devoloper\TaskAura")
LOGO_B64_FILE = BASE_DIR / "asset" / "logo" / "logo_base64.txt"
OUTPUT_HTML = BASE_DIR / "documents" / "quotations" / "taskaura_minimal_quotation.html"
OUTPUT_PDF = BASE_DIR / "documents" / "quotations" / "TaskAura_Quotation_InteriorDesign_Minimal.pdf"

# Load logo
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
<title>Project Quotation - Luxury Interior Design Landing Page</title>
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
    font-size: 12.5px;
    line-height: 1.5;
  }}

  .page-container {{
    max-width: 100%;
    margin: 0 auto;
  }}

  /* Page Break Helpers */
  .page-break {{
    page-break-before: always;
    padding-top: 10px;
  }}

  /* Header Branding */
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
    letter-spacing: 0.5px;
    color: #111;
  }}

  .brand-tagline {{
    font-size: 10.5px;
    color: #666;
    margin-top: 2px;
  }}

  .doc-title {{
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }}

  .meta-grid {{
    font-size: 12.5px;
    color: #333333;
    line-height: 1.7;
    margin-bottom: 14px;
  }}

  .meta-grid strong {{
    color: #111;
    display: inline-block;
    width: 105px;
  }}

  hr.divider {{
    border: none;
    border-top: 1.5px solid #dcdcdc;
    margin: 14px 0 18px 0;
  }}

  /* Section Titles */
  .section-title {{
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    margin: 16px 0 10px 0;
  }}

  .section-subtitle {{
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    margin: 14px 0 8px 0;
  }}

  p.overview-text {{
    font-size: 12.5px;
    color: #374151;
    line-height: 1.6;
    margin-bottom: 8px;
  }}

  .tech-stack {{
    font-size: 12.5px;
    color: #111827;
    margin-bottom: 4px;
  }}

  .tech-stack strong {{
    color: #000;
  }}

  /* Tables */
  table.minimal-table {{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 14px;
    font-size: 12px;
  }}

  table.minimal-table th, 
  table.minimal-table td {{
    border: 1px solid #dcdcdc;
    padding: 7px 10px;
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
    width: 28%;
    font-weight: 600;
    color: #1f2937;
  }}

  table.minimal-table td.col-desc {{
    width: 67%;
    color: #374151;
  }}

  table.minimal-table td.col-cost {{
    text-align: right;
    width: 30%;
    font-weight: 500;
  }}

  table.minimal-table tr.total-row td {{
    font-weight: 700;
    background-color: #f8f9fa;
    color: #111827;
  }}

  table.minimal-table tr.total-row td.col-cost {{
    font-weight: 700;
  }}

  /* Terms */
  ol.terms-list {{
    margin-left: 18px;
    margin-bottom: 22px;
    line-height: 1.7;
    color: #374151;
    font-size: 12px;
  }}

  ol.terms-list li {{
    margin-bottom: 6px;
  }}

  ol.terms-list strong {{
    color: #111827;
  }}

  /* Signatures */
  .signature-section {{
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    padding-top: 10px;
  }}

  .sig-box {{
    width: 45%;
    line-height: 2.2;
    font-size: 12.5px;
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
    <!-- Logo Header -->
    <div class="header-top">
      <div>
        {"<img src='" + logo_src + "' class='brand-logo' alt='TaskAura Global'>" if logo_src else "<div class='brand-text-fallback'>TASKAURA GLOBAL</div>"}
      </div>
      <div style="text-align: right; font-size: 11px; color: #6b7280;">
        Enterprise Web & AI Solutions<br>
        contact@taskaura.com | taskaura.com
      </div>
    </div>

    <div class="doc-title">📋 Project Quotation – Luxury Interior Design Landing Page</div>

    <div class="meta-grid">
      <div><strong>Date:</strong> September 21, 2026</div>
      <div><strong>Client:</strong> Luxury Interior Design Studio</div>
      <div><strong>Prepared By:</strong> Abhinay (TaskAura Global)</div>
      <div><strong>Validity:</strong> 30 days from issue date</div>
    </div>

    <hr class="divider">

    <div class="section-title">1. Project Overview</div>
    <p class="overview-text">
      A bespoke, ultra-luxury landing page designed and developed for an interior design studio to showcase signature architectural projects with fluid scroll animations, interactive spatial exploration, automated lead capture, and an AI-powered consultation assistant.
    </p>
    <div class="tech-stack">
      <strong>Technology Stack:</strong> Next.js / Modern React, GSAP (ScrollTrigger), Lenis Smooth Scroll, Tailwind CSS, OpenAI API Integration, Webhook Automation (WhatsApp & CRM).
    </div>

    <hr class="divider">

    <div class="section-title">2. Scope of Work</div>

    <div class="section-subtitle">Landing Page Sections (8–9 Core Sections)</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 30%;">Section</th>
          <th style="width: 64%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">1</td>
          <td class="col-feature">Hero Section</td>
          <td class="col-desc">Cinematic visual showcase, elegant typography, ambient lighting effect, 4K project reel background, and consultation CTA</td>
        </tr>
        <tr>
          <td class="col-num">2</td>
          <td class="col-feature">Design Philosophy</td>
          <td class="col-desc">Studio story, design principles, spatial aesthetics, and brand philosophy presentation</td>
        </tr>
        <tr>
          <td class="col-num">3</td>
          <td class="col-feature">Portfolio Showcase</td>
          <td class="col-desc">Curated gallery categorized by space (Residential, Commercial, Minimalist) with fluid scroll transitions and Before/After slider</td>
        </tr>
        <tr>
          <td class="col-num">4</td>
          <td class="col-feature">AI Spatial Advisor</td>
          <td class="col-desc">Interactive AI consultation widget where visitors select room dimensions, style, and budget to get instant tailored style recommendations</td>
        </tr>
        <tr>
          <td class="col-num">5</td>
          <td class="col-feature">Services & Offerings</td>
          <td class="col-desc">Detailed cards/accordions for Turnkey Interior, 3D Rendering, Space Planning, and Custom Furniture Curation</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-break">
    <div class="section-subtitle" style="margin-top: 0;">Landing Page Sections (Continued)</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 30%;">Section</th>
          <th style="width: 64%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">6</td>
          <td class="col-feature">Execution Process</td>
          <td class="col-desc">4-step visual workflow (Consultation → 3D Concept → Procurement → Final Handover)</td>
        </tr>
        <tr>
          <td class="col-num">7</td>
          <td class="col-feature">Testimonials & Press</td>
          <td class="col-desc">Client reviews, high-profile homeowner feedback, and media/architectural feature stamps</td>
        </tr>
        <tr>
          <td class="col-num">8</td>
          <td class="col-feature">Smart Lead Form</td>
          <td class="col-desc">Interactive inquiry form capturing budget tier, property size, and timeline with automated validation</td>
        </tr>
        <tr>
          <td class="col-num">9</td>
          <td class="col-feature">Studio Footer</td>
          <td class="col-desc">Studio location coordinates, social links, contact info, legal copyright, and smooth back-to-top</td>
        </tr>
      </tbody>
    </table>

    <div class="section-subtitle">Interactive, AI & Technical Features</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 30%;">Feature</th>
          <th style="width: 64%;">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">10</td>
          <td class="col-feature">Fluid Scroll Animations</td>
          <td class="col-desc">GSAP & Lenis smooth inertia scrolling with parallax image reveals and zero layout shifts</td>
        </tr>
        <tr>
          <td class="col-num">11</td>
          <td class="col-feature">AI Style Recommendation Engine</td>
          <td class="col-desc">Automated prompt pipeline matching visitor inputs with the studio's design aesthetic library</td>
        </tr>
        <tr>
          <td class="col-num">12</td>
          <td class="col-feature">Lead Automation & Webhook</td>
          <td class="col-desc">Real-time instant lead notifications to WhatsApp, Email (Resend), and Google Sheets / CRM</td>
        </tr>
        <tr>
          <td class="col-num">13</td>
          <td class="col-feature">Responsive UI/UX</td>
          <td class="col-desc">100% pixel-perfect responsiveness across mobile, tablet, and ultra-wide displays</td>
        </tr>
        <tr>
          <td class="col-num">14</td>
          <td class="col-feature">Performance & SEO Optimization</td>
          <td class="col-desc">Next-gen WebP image compression, sub-second load times, and Google Schema markup</td>
        </tr>
      </tbody>
    </table>

    <hr class="divider">

    <div class="section-title">3. Deliverables</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 30%;">Deliverable</th>
          <th style="width: 64%;">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-num">1</td>
          <td class="col-feature">Figma UI/UX Design</td>
          <td class="col-desc">Complete interactive prototype and UI design system for desktop & mobile</td>
        </tr>
        <tr>
          <td class="col-num">2</td>
          <td class="col-feature">Full Source Code</td>
          <td class="col-desc">Clean, production-ready, modular Next.js / React repository</td>
        </tr>
        <tr>
          <td class="col-num">3</td>
          <td class="col-feature">AI Integration & Webhook</td>
          <td class="col-desc">Configured AI consultation prompt pipeline and automated lead dispatch to WhatsApp & CRM</td>
        </tr>
        <tr>
          <td class="col-num">4</td>
          <td class="col-feature">Production Deployment</td>
          <td class="col-desc">Live deployment on Vercel/Cloudflare with custom domain and SSL configuration</td>
        </tr>
        <tr>
          <td class="col-num">5</td>
          <td class="col-feature">Documentation & Support</td>
          <td class="col-desc">Setup guide, admin handover instructions, and 30 days post-launch warranty</td>
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
          <th style="width: 70%;">Component</th>
          <th class="col-cost">Estimated Cost (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>UI/UX Design & Wireframing (Figma Luxury Prototype, 8–9 sections)</td>
          <td class="col-cost">₹ 8,000</td>
        </tr>
        <tr>
          <td>Front-End Engineering & GSAP / Lenis Scroll Animations</td>
          <td class="col-cost">₹ 14,000</td>
        </tr>
        <tr>
          <td>Portfolio Showcase (Category Filter & Interactive Before/After Slider)</td>
          <td class="col-cost">₹ 5,000</td>
        </tr>
        <tr>
          <td>AI Spatial Advisor & Style Recommendation Pipeline</td>
          <td class="col-cost">₹ 5,000</td>
        </tr>
        <tr>
          <td>Lead Capture Form & Webhook Automation (WhatsApp & CRM)</td>
          <td class="col-cost">₹ 4,000</td>
        </tr>
        <tr>
          <td>Performance Optimization, Technical SEO & Production Deployment</td>
          <td class="col-cost">₹ 4,000</td>
        </tr>
        <tr class="total-row">
          <td>Total</td>
          <td class="col-cost">₹ 40,000</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">5. Timeline</div>
    <table class="minimal-table">
      <thead>
        <tr>
          <th style="width: 70%;">Phase</th>
          <th style="width: 30%;">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>UI/UX Design & Prototype Review</td>
          <td>3 days</td>
        </tr>
        <tr>
          <td>Front-End Core & Scroll Animations</td>
          <td>5 days</td>
        </tr>
        <tr>
          <td>Portfolio Showcase & Interactive Sliders</td>
          <td>3 days</td>
        </tr>
        <tr>
          <td>AI Integration & Automation Webhooks</td>
          <td>3 days</td>
        </tr>
        <tr>
          <td>Testing, Mobile Polish & Deployment</td>
          <td>2 days</td>
        </tr>
        <tr class="total-row">
          <td>Total Estimated</td>
          <td>~16 working days</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">6. Terms & Conditions</div>
    <ol class="terms-list">
      <li><strong>Payment Terms:</strong> 50% advance payment before project initiation, and remaining 50% upon final delivery and approval.</li>
      <li><strong>Revisions:</strong> Includes up to 2 rounds of design and layout revisions post-delivery.</li>
      <li><strong>Third-Party Accounts:</strong> Domain, hosting, and any third-party external API usage fees (e.g. OpenAI usage beyond free tier) are separate and borne by the client.</li>
      <li><strong>Post-Launch Support:</strong> Includes 30 days of complimentary technical bug fixing and performance support after launch.</li>
      <li><strong>Intellectual Property & Copyright:</strong> Upon 100% full payment settlement, <strong>all source code, design assets, and complete intellectual property / copyright ownership will be fully and unconditionally transferred to the Client</strong>. The developer retains only the right to display the completed project in their agency portfolio.</li>
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

# Write HTML template
with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"HTML Template written to: {OUTPUT_HTML}")

# Generate PDF via Playwright
try:
    from playwright.sync_api import sync_playwright
    print("Launching Playwright Edge to generate Minimal PDF...")
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
    print(f"Minimal PDF generated successfully at: {OUTPUT_PDF}")
except Exception as e:
    import traceback
    traceback.print_exc()
    sys.exit(1)
