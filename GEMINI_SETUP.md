# Google Gemini API Key Configuration Guide

This guide describes how to configure the Google Gemini API key for the TaskAura website chatbot, both for local development and live Netlify hosting.

---

## 1. Getting your Free API Key

1.  Go to the [Google AI Studio](https://aistudio.google.com/) website.
2.  Log in using any standard Google account.
3.  Click the blue **Get API key** button in the top left.
4.  Click **Create API key** and select whether you want to attach it to an existing Google Cloud project or a new one.
5.  Copy your generated API key string (looks like `AIzaSy...`).

---

## 2. Local Development Setup

We have created a `.env` file in the project root. Paste your key there:

```env
GEMINI_API_KEY=AIzaSyYourKeyHere...
```

---

## 3. Production Deployment (Netlify)

Since the website is hosted on Netlify, you must set the environment variable in your Netlify dashboard so the live chatbot can access it securely:

1.  Log in to your **Netlify Dashboard**.
2.  Go to your TaskAura site: **Sites** -> **[Your Site Name]**.
3.  Navigate to **Site Configuration** -> **Environment variables**.
4.  Click **Add a variable** -> **Add single variable**.
5.  Set the fields:
    *   **Key**: `GEMINI_API_KEY`
    *   **Value**: *[Paste your copied API key here]*
6.  Click **Create variable**.
7.  Trigger a new deploy or push a commit to apply the new variable. The serverless function will automatically load this key on every chat request.
