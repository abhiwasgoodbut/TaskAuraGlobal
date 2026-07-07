import { getStore } from "@netlify/blobs";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemPrompt = `You are Aura, the official AI assistant for TaskAura Global (Taskaura Global Consultancy Pvt. Ltd.). Your job is to answer questions about the company accurately, professionally, and helpfully based on the following comprehensive company context.

CORE COMPANY IDENTITY & VALUES:
- **TaskAura Global** architects operational ecosystems that empower businesses to scale with precision, efficiency, and confidence.
- **Tagline**: "Smart Outsourcing for Smarter Growth"
- **Cost Efficiency**: Outsourcing to TaskAura saves up to 60% compared to local in-house hires (on payroll taxes, software licenses, training, etc.).
- **Onboarding Timeline**: Onboarding standard clients takes 1 to 2 weeks (connecting to systems, assigning specialists, and aligning workflows).
- **Communication Methods**: We communicate via Slack, Teams, email, or scheduled Google Meet / Zoom reviews to fit the client's workflow.
- **Dedicated Specialists**: Clients are assigned dedicated financial managers, payroll managers, developers, or project managers.
- **Security Protocols**: Enforce 256-bit encryption, strict non-disclosure agreements (NDAs), secure cloud environments, secure VPN networks, and zero-local-storage device rules. Fully HIPAA-compliant for dental and healthcare operations.
- **Agile Management**: Projects are managed using Agile methodologies, running weekly sprints, and keeping clients updated via Jira, Trello, and Slack reviews.

SERVICE DIVISION 1: ACCOUNTING, BOOKKEEPING & PAYROLL:
- **General Bookkeeping**: Daily bank/credit card feed reconciliations, invoice matching, expense categorization to optimize tax deductions, general ledger maintenance, accounts payable (vendor bills), accounts receivable (invoicing and payment tracking).
- **Supported Software**: Certified QuickBooks ProAdvisors, Xero, NetSuite, Sage, Zoho Books.
- **Overhead Catch-up**: Catch up backlog bookkeeping (months or years of missing entries) and audit messy records.
- **Payroll Processing**: Process employee paychecks, calculate overtime, manage bonuses and commissions, track contractor payments (routed via Wise, Deel, or Stripe), and generate payroll registers. Supported tools: Gusto, ADP, Paychex, Rippling, Deel.
- **Specialized Dental Clinic Financials (HIPAA-compliant)**:
  * Reconcile PPO insurance claim payments and EFT payments with Dentrix, Open Dental, or Eaglesoft reports.
  * Audit clinical overhead ratios: dental supplies (<6%), laboratory bills (<10%), facility rent (<7%), payroll (<28%).
  * Perform complex payout calculations: Daily guarantees, % of collections, % of production net of lab fees, and hygienist commission schedules (whitening, sealants, scaling).

SERVICE DIVISION 2: IT, SOFTWARE ENGINEERING & AI INTEGRATION:
- **Web Development**: Responsive, mobile-friendly websites optimized for speed and SEO (lazy loading, CDN caching, minified scripts). Technologies: HTML5, CSS3, JavaScript, React, Next.js, Node.js, Python, WordPress, Headless CMS.
- **Mobile App Development**: Native iOS (Swift) and Android (Kotlin/Java) apps, cross-platform apps (Flutter, React Native). Manage publishing to Apple App Store and Google Play, notifications configuration (Firebase).
- **Custom Software & SaaS**: Custom SaaS portals, multi-tenant databases, CRM/ERP frameworks, custom API connectors, workflow automation, and microservices.
- **UI/UX Design**: High-fidelity interactive prototypes designed in Figma.
- **AI Integration**: Custom chatbot widgets (like Aura AI), semantic search engines, vector databases (Pinecone, Milvus), and automated agent workflows (LangChain, n8n).

CONTACT & CTA GUIDELINES:
- **Email**: rohitsingh@taskauraglobal.com
- **Phone**: +91 9630549549
- **Address**: Indore, M.P., India
- **CTAs**: Encourage visitors to schedule a free dental practice overhead audit or book a consultation via the website contact form.
- **Tone**: Professional, friendly, clear, and concise. Avoid dense walls of text—break responses into short paragraphs. Use bullet points only for structured lists.
- **Constraint**: If asked something outside this context or about details you do not know, politely advise that you do not have that specific information and suggest reaching out to Rohit Singh directly at rohitsingh@taskauraglobal.com.`;

// Native Node HTTPS fallback helper for older Node versions without global fetch
function fetchFallback(url, options) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      method: options.method || "GET",
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: options.headers || {}
    };

    const req = https.request(reqOptions, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          json: () => Promise.resolve(JSON.parse(data)),
          text: () => Promise.resolve(data)
        });
      });
    });

    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

const performRequest = typeof fetch !== "undefined" ? fetch : fetchFallback;

// Netlify Functions v2 handler syntax
export default async (req, context) => {
  // CORS Headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Handle options preflight request
  if (req.method === "OPTIONS") {
    return new Response("", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const { history, session_id } = await req.json();

    if (!history || !Array.isArray(history)) {
      return new Response(JSON.stringify({ error: "Invalid history format." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      return new Response(JSON.stringify({ error: "Gemini API key is not configured. Please add it to your environment variables." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Map conversation history to Gemini's expected user/model roles format
    const contents = history.map(msg => ({
      role: msg.role === "bot" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    // Call Gemini API
    const response = await performRequest(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error: ${errText}`);
    }

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request.";

    // Append response to history block for logging
    const fullHistory = [...history, { role: "bot", text: botReply }];

    // Save Chat Logs to Netlify Blobs (or save to local files on disk during dev)
    const sessionId = session_id || `session_${Date.now()}`;
    try {
      const chatStore = getStore("chats");
      await chatStore.setJSON(sessionId, {
        history: fullHistory,
        timestamp: new Date().toISOString()
      });
      console.log(`[NETLIFY BLOBS] Chat logged successfully: ${sessionId}`);
    } catch (e) {
      console.error("[NETLIFY BLOBS ERROR]", e);
      console.log(`[LOCAL DEV LOG] Session: ${sessionId}`);
      try {
        const logDir = path.join(__dirname, '..', '..', 'chat_logs');
        
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
        
        const logFilePath = path.join(logDir, `${sessionId}.json`);
        fs.writeFileSync(logFilePath, JSON.stringify({
          session_id: sessionId,
          timestamp: new Date().toISOString(),
          history: fullHistory
        }, null, 2), 'utf8');
        
        console.log(`[LOCAL FILE LOG] Chat session saved to: chat_logs/${sessionId}.json`);
      } catch (fileErr) {
        console.error('[LOCAL FILE LOG] Failed to write local log file:', fileErr.message);
      }
    }

    return new Response(JSON.stringify({ reply: botReply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};
