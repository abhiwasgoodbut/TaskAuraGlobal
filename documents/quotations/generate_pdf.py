import os
import sys
from pathlib import Path

# Paths
BASE_DIR = Path(r"c:\devoloper\TaskAura")
LOGO_B64_FILE = BASE_DIR / "asset" / "logo" / "logo_base64.txt"
OUTPUT_HTML = BASE_DIR / "documents" / "quotations" / "taskaura_quotation_template.html"
OUTPUT_PDF = BASE_DIR / "documents" / "quotations" / "TaskAura_Commercial_Quotation_InteriorDesign.pdf"

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
<title>Commercial Quotation & Proposal - TaskAura Global</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4 portrait;
    margin: 0;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1a1a24;
    background: #ffffff;
    line-height: 1.5;
    font-size: 13px;
  }}

  .page {{
    width: 210mm;
    min-height: 297mm;
    height: 297mm;
    padding: 22mm 24mm 20mm 24mm;
    position: relative;
    background: #ffffff;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }}

  .page:last-child {{
    page-break-after: avoid;
  }}

  /* Decorative top/bottom accents */
  .page-accent-top {{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #d4af37 0%, #f3e5ab 50%, #997929 100%);
  }}

  .page-watermark {{
    position: absolute;
    right: -40px;
    bottom: 80px;
    font-size: 180px;
    font-weight: 900;
    color: rgba(212, 175, 55, 0.03);
    user-select: none;
    pointer-events: none;
    letter-spacing: -5px;
    line-height: 1;
    z-index: 0;
    font-family: 'Playfair Display', serif;
  }}

  .content-layer {{
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }}

  /* Header Styles */
  .header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #eaeaf0;
    padding-bottom: 18px;
    margin-bottom: 22px;
  }}

  .logo-wrap {{
    display: flex;
    align-items: center;
    gap: 16px;
  }}

  .logo-img {{
    height: 52px;
    width: auto;
    object-fit: contain;
  }}

  .company-meta {{
    display: flex;
    flex-direction: column;
  }}

  .company-name {{
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #0f1117;
    text-transform: uppercase;
  }}

  .company-tagline {{
    font-size: 10px;
    color: #b38728;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }}

  .doc-meta {{
    text-align: right;
  }}

  .doc-badge {{
    display: inline-block;
    background: #0f1117;
    color: #d4af37;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }}

  .doc-ref {{
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
  }}

  .doc-date {{
    font-size: 11px;
    color: #334155;
    font-weight: 500;
  }}

  /* Client & Executive Box */
  .client-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 22px;
  }}

  .info-col h4 {{
    font-size: 10px;
    text-transform: uppercase;
    color: #94a3b8;
    letter-spacing: 1px;
    margin-bottom: 6px;
    font-weight: 700;
  }}

  .info-col .name {{
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
  }}

  .info-col .detail {{
    font-size: 11.5px;
    color: #475569;
    line-height: 1.45;
  }}

  /* Section Title */
  .section-title {{
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  .section-title::before {{
    content: "";
    display: inline-block;
    width: 4px;
    height: 16px;
    background: #d4af37;
    border-radius: 2px;
  }}

  .lead-summary {{
    font-size: 12.5px;
    color: #334155;
    line-height: 1.6;
    margin-bottom: 20px;
  }}

  /* Deliverable Grid / Cards */
  .deliverables-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }}

  .deliverable-card {{
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #1e293b;
    border-radius: 6px;
    padding: 11px 14px;
  }}

  .deliverable-card.gold-accent {{
    border-left-color: #d4af37;
    background: #fffdfa;
  }}

  .card-num {{
    font-size: 10px;
    font-weight: 800;
    color: #b38728;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }}

  .card-title {{
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
    margin: 2px 0 4px 0;
  }}

  .card-desc {{
    font-size: 10.5px;
    color: #475569;
    line-height: 1.45;
  }}

  /* Feature Badges */
  .tech-pills {{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }}

  .pill {{
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    padding: 3px 8px;
  }}

  .pill.highlight {{
    background: #fef9c3;
    border-color: #fde047;
    color: #854d0e;
  }}

  /* Tables */
  .pricing-table {{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 11.5px;
  }}

  .pricing-table th {{
    background: #0f172a;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 9px 12px;
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  .pricing-table th.tar {{
    text-align: right;
  }}

  .pricing-table td {{
    padding: 10px 12px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
    vertical-align: top;
  }}

  .pricing-table td.tar {{
    text-align: right;
    font-weight: 600;
    color: #0f172a;
  }}

  .pricing-table tbody tr:nth-child(even) {{
    background: #f8fafc;
  }}

  .total-row td {{
    background: #fffdf5 !important;
    border-top: 2px solid #d4af37;
    border-bottom: 2px solid #d4af37;
    font-weight: 800 !important;
    font-size: 13px;
    color: #0f172a !important;
  }}

  .total-amount {{
    color: #997929 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  }}

  /* Terms and Copyright Box */
  .terms-box {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 14px 16px;
    margin-bottom: 18px;
    font-size: 10.5px;
    color: #475569;
    line-height: 1.55;
  }}

  .terms-box h5 {{
    font-size: 11px;
    color: #0f172a;
    font-weight: 700;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }}

  .terms-box h5::before {{
    content: "■";
    color: #d4af37;
    font-size: 8px;
  }}

  .terms-box p {{
    margin-bottom: 8px;
  }}

  .terms-box p:last-child {{
    margin-bottom: 0;
  }}

  /* Milestone split */
  .milestones-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }}

  .milestone-item {{
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 12px;
    background: #ffffff;
  }}

  .milestone-percent {{
    font-size: 18px;
    font-weight: 800;
    color: #b38728;
    line-height: 1;
    margin-bottom: 4px;
  }}

  .milestone-title {{
    font-size: 11px;
    font-weight: 700;
    color: #0f172a;
  }}

  .milestone-val {{
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    margin-top: 2px;
  }}

  /* Signatures */
  .signature-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px dashed #cbd5e1;
  }}

  .sig-block {{
    display: flex;
    flex-direction: column;
  }}

  .sig-label {{
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 30px;
  }}

  .sig-line {{
    border-bottom: 1px solid #94a3b8;
    margin-bottom: 8px;
  }}

  .sig-signer {{
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
  }}

  .sig-title {{
    font-size: 10.5px;
    color: #64748b;
  }}

  /* Footer */
  .footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eaeaf0;
    padding-top: 12px;
    font-size: 9.5px;
    color: #94a3b8;
  }}

  .footer-left {{
    display: flex;
    gap: 14px;
  }}

  .footer-right {{
    font-weight: 600;
    color: #64748b;
  }}
</style>
</head>
<body>

  <!-- ==================== PAGE 1: EXECUTIVE BRIEF & SCOPE OVERVIEW ==================== -->
  <div class="page">
    <div class="page-accent-top"></div>
    <div class="page-watermark">AURA</div>

    <div class="content-layer">
      <div>
        <!-- Header -->
        <div class="header">
          <div class="logo-wrap">
            {"<img src='" + logo_src + "' class='logo-img' alt='TaskAura Global Logo'>" if logo_src else ""}
            <div class="company-meta">
              <span class="company-name">TASKAURA GLOBAL</span>
              <span class="company-tagline">Delivering Growth Beyond Boundaries</span>
            </div>
          </div>
          <div class="doc-meta">
            <div class="doc-badge">COMMERCIAL PROPOSAL</div>
            <div class="doc-ref">Ref: TAG-QT-2026-IN842</div>
            <div class="doc-date">Date: September 21, 2026</div>
          </div>
        </div>

        <!-- Client & Issuer Details -->
        <div class="client-grid">
          <div class="info-col">
            <h4>PREPARED FOR (CLIENT)</h4>
            <div class="name">Luxury Interior Studio & Spatial Design</div>
            <div class="detail">
              <strong>Attn:</strong> Studio Principal & Creative Director<br>
              <strong>Engagement:</strong> Bespoke AI-Powered Interior Portfolio Platform<br>
              <strong>Location:</strong> India
            </div>
          </div>
          <div class="info-col">
            <h4>PREPARED BY (SERVICE PROVIDER)</h4>
            <div class="name">TaskAura Global Inc.</div>
            <div class="detail">
              <strong>Division:</strong> Enterprise Web & AI Engineering<br>
              <strong>Email:</strong> contact@taskaura.com | global@taskaura.com<br>
              <strong>Website:</strong> taskaura.com
            </div>
          </div>
        </div>

        <!-- Executive Summary -->
        <div class="section-title">1. Executive Overview & Solution Intent</div>
        <p class="lead-summary">
          TaskAura Global is pleased to submit this commercial quotation for designing and developing a high-converting, ultra-luxury <strong>Interior Design Landing Page with Integrated AI Consultation & Workflow Automation</strong>. The platform will fuse immersive spatial aesthetics, fluid scroll physics, and automated intelligent lead qualification to position the studio at the absolute pinnacle of contemporary architectural design.
        </p>

        <!-- Scope Grid Part 1 -->
        <div class="section-title">2. Architectural Scope of Work (8–9 Core Sections)</div>
        <div class="deliverables-grid">
          <div class="deliverable-card gold-accent">
            <div class="card-num">Section 01</div>
            <div class="card-title">Cinematic Hero & Dynamic Atmosphere</div>
            <div class="card-desc">High-impact editorial typographic headline, dynamic ambient spatial glow, 4K video/3D project reel integration, and instant luxury consultation CTA.</div>
          </div>

          <div class="deliverable-card">
            <div class="card-num">Section 02</div>
            <div class="card-title">Design Philosophy & Studio Identity</div>
            <div class="card-desc">Editorial split-grid conveying spatial harmony, craftsmanship narrative, prestigious awards, and signature architectural philosophy.</div>
          </div>

          <div class="deliverable-card gold-accent">
            <div class="card-num">Section 03</div>
            <div class="card-title">Curated Spatial Portfolio Showcase</div>
            <div class="card-desc">Multi-category filter (Penthouses, Luxury Villas, Commercial, Minimalist), fluid scroll-triggered image transitions, and interactive Before/After sliders.</div>
          </div>

          <div class="deliverable-card">
            <div class="card-num">Section 04</div>
            <div class="card-title">AI Spatial Advisor & Style Intelligence</div>
            <div class="card-desc">Interactive AI engine allowing prospective clients to input room dimensions, aesthetic taste, and budget to receive an instant moodboard concept and personalized preview.</div>
          </div>

          <div class="deliverable-card">
            <div class="card-num">Section 05</div>
            <div class="card-title">Comprehensive Service Offerings</div>
            <div class="card-desc">Interactive tabs detailing Full Turnkey Renovations, 3D Spatial Visualizations, Bespoke Furniture Curation, and Lighting Engineering.</div>
          </div>

          <div class="deliverable-card gold-accent">
            <div class="card-num">Section 06</div>
            <div class="card-title">Execution Blueprint & Workflow Timeline</div>
            <div class="card-desc">Visual 4-phase trajectory from Initial Consultation -> 3D Conceptualization -> Material Procurement -> Final Spatial Handover.</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-left">
          <span>TaskAura Global • Confidential Document</span>
          <span>TAG-QT-2026-IN842</span>
        </div>
        <div class="footer-right">Page 1 of 3</div>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 2: TECHNICAL SPECIFICATIONS & WORKFLOW ==================== -->
  <div class="page">
    <div class="page-accent-top"></div>
    <div class="page-watermark">TECH</div>

    <div class="content-layer">
      <div>
        <!-- Header -->
        <div class="header">
          <div class="logo-wrap">
            {"<img src='" + logo_src + "' class='logo-img' alt='TaskAura Global Logo'>" if logo_src else ""}
            <div class="company-meta">
              <span class="company-name">TASKAURA GLOBAL</span>
              <span class="company-tagline">Delivering Growth Beyond Boundaries</span>
            </div>
          </div>
          <div class="doc-meta">
            <div class="doc-badge">TECHNICAL SPECIFICATION</div>
            <div class="doc-ref">Ref: TAG-QT-2026-IN842</div>
            <div class="doc-date">September 21, 2026</div>
          </div>
        </div>

        <!-- Scope Grid Part 2 -->
        <div class="section-title">2. Architectural Scope of Work (Continuation)</div>
        <div class="deliverables-grid">
          <div class="deliverable-card">
            <div class="card-num">Section 07</div>
            <div class="card-title">Client Accolades & Architectural Press</div>
            <div class="card-desc">High-trust testimonial carousel featuring verified homeowner reviews, architectural digest press mentions, and high-resolution project stamps.</div>
          </div>

          <div class="deliverable-card gold-accent">
            <div class="card-num">Section 08</div>
            <div class="card-title">Smart Lead Engine & Webhook Automation</div>
            <div class="card-desc">Multi-step interactive consultation form capturing budget, square footage, property type, with real-time automated dispatch to WhatsApp & Studio CRM.</div>
          </div>

          <div class="deliverable-card" style="grid-column: span 2;">
            <div class="card-num">Section 09</div>
            <div class="card-title">Luxury Studio Global Footer & Legal Architecture</div>
            <div class="card-desc">Bespoke studio brand emblem, direct architectural studio coordinates, social direct lines, legal copyright declarations, and fast-navigation anchors.</div>
          </div>
        </div>

        <!-- Technical Pillars -->
        <div class="section-title">3. Engineering & Automation Capabilities</div>
        <div class="deliverables-grid">
          <div class="deliverable-card">
            <div class="card-title" style="font-size:11.5px;">Bespoke UI/UX & Creative Direction</div>
            <div class="card-desc">Handcrafted design tokens in Figma, luxury typography pairing, dark/warm editorial spatial palette, mobile-first responsive architecture tested across 20+ viewport breakpoints.</div>
          </div>

          <div class="deliverable-card">
            <div class="card-title" style="font-size:11.5px;">Fluid Physics & Scroll Dynamics</div>
            <div class="card-desc">Integrated GSAP (GreenSock) & Lenis virtual scroll engine providing buttery 60fps inertia scrolling, subtle parallax reveals, and Zero Cumulative Layout Shift (CLS).</div>
          </div>

          <div class="deliverable-card gold-accent">
            <div class="card-title" style="font-size:11.5px;">AI Consultation & Prompt Pipeline</div>
            <div class="card-desc">Intelligent AI recommendation pipeline matching client spatial aspirations with studio design catalogues, delivering personalized project estimates instantly.</div>
          </div>

          <div class="deliverable-card gold-accent">
            <div class="card-title" style="font-size:11.5px;">Automated Lead Dispatch & CRM Sync</div>
            <div class="card-desc">Zero-latency webhook integrations dispatching incoming client inquiries instantly to the studio director's WhatsApp, Google Sheets master register, and email notification via Resend.</div>
          </div>
        </div>

        <div class="tech-pills">
          <span class="pill highlight">GSAP ScrollTrigger</span>
          <span class="pill highlight">Lenis Smooth Scroll</span>
          <span class="pill">Next.js / Modern React</span>
          <span class="pill highlight">Custom AI Pipeline</span>
          <span class="pill">Webhook Automation (WhatsApp/CRM)</span>
          <span class="pill">Core Web Vitals 95+</span>
          <span class="pill">Figma Luxury Prototype</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-left">
          <span>TaskAura Global • Engineering Architecture</span>
          <span>TAG-QT-2026-IN842</span>
        </div>
        <div class="footer-right">Page 2 of 3</div>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 3: COMMERCIALS, TIMELINE & COPYRIGHT ==================== -->
  <div class="page">
    <div class="page-accent-top"></div>
    <div class="page-watermark">TERMS</div>

    <div class="content-layer">
      <div>
        <!-- Header -->
        <div class="header">
          <div class="logo-wrap">
            {"<img src='" + logo_src + "' class='logo-img' alt='TaskAura Global Logo'>" if logo_src else ""}
            <div class="company-meta">
              <span class="company-name">TASKAURA GLOBAL</span>
              <span class="company-tagline">Delivering Growth Beyond Boundaries</span>
            </div>
          </div>
          <div class="doc-meta">
            <div class="doc-badge">COMMERCIAL TERMS</div>
            <div class="doc-ref">Ref: TAG-QT-2026-IN842</div>
            <div class="doc-date">September 21, 2026</div>
          </div>
        </div>

        <!-- Commercial Pricing Table -->
        <div class="section-title">4. Commercial Investment (Indian Rupees - INR)</div>
        <table class="pricing-table">
          <thead>
            <tr>
              <th style="width: 8%;">Item</th>
              <th style="width: 68%;">Deliverable Description</th>
              <th class="tar" style="width: 24%;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td><strong>Bespoke UI/UX Creative Direction & Figma Prototype</strong><br><span style="font-size:10px; color:#64748b;">Luxury aesthetic curation, custom spatial typography, component design system, and full desktop & mobile interactive wireframes.</span></td>
              <td class="tar">₹ 25,000</td>
            </tr>
            <tr>
              <td>02</td>
              <td><strong>Front-End Engineering & Scroll Animation Architecture</strong><br><span style="font-size:10px; color:#64748b;">Implementation of 8–9 bespoke sections, Lenis smooth scroll, GSAP micro-interactions, portfolio filter, and Before/After slider.</span></td>
              <td class="tar">₹ 38,000</td>
            </tr>
            <tr>
              <td>03</td>
              <td><strong>AI Spatial Advisor Integration & Webhook Automation Pipeline</strong><br><span style="font-size:10px; color:#64748b;">Interactive AI style estimation engine, multi-step consultation form, and instant lead dispatch to WhatsApp & studio CRM.</span></td>
              <td class="tar">₹ 22,000</td>
            </tr>
            <tr>
              <td>04</td>
              <td><strong>Asset Optimization, Core Web Vitals Hardening & Deployment</strong><br><span style="font-size:10px; color:#64748b;">Next-gen WebP/AVIF compression, sub-second load times (95+ Google PageSpeed), technical SEO schema, and custom domain setup.</span></td>
              <td class="tar">₹ 10,000</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>TOTAL COMMERCIAL INVESTMENT</strong></td>
              <td class="tar total-amount">₹ 95,000</td>
            </tr>
          </tbody>
        </table>

        <!-- Milestone Schedule -->
        <div class="section-title">5. Milestone Payment Structure</div>
        <div class="milestones-grid">
          <div class="milestone-item">
            <div class="milestone-percent">50%</div>
            <div class="milestone-title">Advance Kickoff</div>
            <div class="milestone-val">₹ 47,500 INR</div>
            <div style="font-size:9.5px; color:#64748b; margin-top:3px;">Initiation of project, creative direction & Figma wireframing.</div>
          </div>
          <div class="milestone-item">
            <div class="milestone-percent">30%</div>
            <div class="milestone-title">Alpha Build Review</div>
            <div class="milestone-val">₹ 28,500 INR</div>
            <div style="font-size:9.5px; color:#64748b; margin-top:3px;">Upon client approval of UI/UX and staging link deployment.</div>
          </div>
          <div class="milestone-item">
            <div class="milestone-percent">20%</div>
            <div class="milestone-title">Handover & Live Launch</div>
            <div class="milestone-val">₹ 19,000 INR</div>
            <div style="font-size:9.5px; color:#64748b; margin-top:3px;">Final AI validation, production deployment & code handover.</div>
          </div>
        </div>

        <!-- Intellectual Property & Copyright Clause -->
        <div class="terms-box">
          <h5>Intellectual Property, Copyright Ownership & Terms</h5>
          <p>
            <strong>1. Complete Copyright & Ownership Assignment:</strong> Upon receipt of the final milestone payment (100% project settlement), <strong>all intellectual property rights, source code, visual design files, custom brand assets, and proprietary layout designs created under this agreement shall transfer unconditionally and exclusively to the Client</strong>. The Client shall hold full, unencumbered worldwide copyright ownership to the platform and code.
          </p>
          <p>
            <strong>2. Studio Portfolio Exemption:</strong> TaskAura Global retains only the non-exclusive privilege to present the finished digital work, screenshots, and case study excerpts within its professional agency portfolio and award submissions.
          </p>
          <p>
            <strong>3. Confidentiality & Data Security:</strong> TaskAura Global shall maintain strict non-disclosure of all architectural renderings, client identity records, and business metrics disclosed during the engagement.
          </p>
          <p>
            <strong>4. Hypercare Warranty:</strong> Includes <strong>30 calendar days of post-launch technical warranty</strong> covering bug remediation, responsive adjustments, and performance monitoring at zero additional cost.
          </p>
        </div>

        <!-- Sign-Off Section -->
        <div class="signature-grid">
          <div class="sig-block">
            <div class="sig-label">AUTHORIZED FOR TASKAURA GLOBAL</div>
            <div class="sig-line"></div>
            <div class="sig-signer">Managing Director / Lead Partner</div>
            <div class="sig-title">TaskAura Global Enterprise Solutions</div>
          </div>
          <div class="sig-block">
            <div class="sig-label">ACCEPTED & AUTHORIZED FOR CLIENT</div>
            <div class="sig-line"></div>
            <div class="sig-signer">Principal / Authorized Signatory</div>
            <div class="sig-title">Luxury Interior Design Studio</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-left">
          <span>TaskAura Global • Legal & Commercial Agreement</span>
          <span>TAG-QT-2026-IN842</span>
        </div>
        <div class="footer-right">Page 3 of 3</div>
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
    print("Launching Playwright Edge to generate PDF...")
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

