# Deployment & Integration Guide

**Nang Devit's Personal Portfolio Website**  
**Domain:** [www.nangdevit.xyz](https://www.nangdevit.xyz)  
**Stack:** Next.js (Full-Stack App Router) &bull; TypeScript &bull; Tailwind CSS &bull; Telegram Bot API &bull; Vercel

---

## 1. Telegram Bot Integration Setup

The contact form sends instant, secure notifications to your Telegram Group whenever a recruiter, hiring manager, or client submits a message on [www.nangdevit.xyz](https://www.nangdevit.xyz).

### Step 1: Create a Telegram Bot via @BotFather
1. Open Telegram and search for the official account **`@BotFather`** (verified badge).
2. Start the conversation and send:
   ```text
   /newbot
   ```
3. Enter a friendly name for your bot, e.g.:
   ```text
   Nang Devit Portfolio Alerts
   ```
4. Enter a username ending in `bot`, e.g.:
   ```text
   nangdevit_portfolio_bot
   ```
5. `@BotFather` will reply with your **Bot Token**. It looks like:
   ```text
   7123456789:AAFlkB4..._EXAMPLE_TOKEN_...XYZ
   ```
   > ⚠️ **Security Warning**: Keep this token secret. Never commit it to GitHub.

---

### Step 2: Add Bot to Group & Get Group ID and Topic ID

#### A. Get the Group ID (`TELEGRAM_GROUP_ID`):
1. In Telegram, create or open your **Supergroup** (make sure Topics / Forums are enabled in group settings if you want to organize by topic).
2. Add your bot (e.g. `@nangdevit_portfolio_bot`) to the group and grant it **Administrator** privileges (at minimum: "Post Messages" or "Send Messages").
3. Send any message in the group.
4. Open your web browser and visit:
   ```text
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
5. Look for `"chat":{"id": -100xxxxxxxxxx, "title": "..."}`.
   The number starting with `-100...` is your **`TELEGRAM_GROUP_ID`**.

#### B. Get the Topic ID (`TELEGRAM_TOPIC_ID`):
1. Inside your Telegram Supergroup, find or create the specific topic (thread) where you want contact messages to land (e.g. **"Portfolio Messages"** or **"General"**).
2. **Right-click** (on Telegram Desktop) or **Tap and hold** (on Mobile) on the Topic name.
3. Select **"Copy Link"**.
4. The link looks like this:
   ```text
   https://t.me/c/2456789012/15
   ```
   The last number (`15` in this example) is your **`TELEGRAM_TOPIC_ID`** (Telegram `message_thread_id`)!
5. In your `.env.local`:
   ```env
   TELEGRAM_GROUP_ID="-1002456789012"
   TELEGRAM_TOPIC_ID="15"
   ```

---

### Step 3: Configure Environment Variables

#### For Local Testing:
Edit `.env.local`:
```env
TELEGRAM_BOT_TOKEN="your_bot_token_here"
TELEGRAM_GROUP_ID="-100xxxxxxxxxx"
TELEGRAM_TOPIC_ID="your_topic_id_number"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

#### For Vercel Production:
1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** &rarr; **Environment Variables**.
3. Add the following variables:
   - **`TELEGRAM_BOT_TOKEN`**: your bot token
   - **`TELEGRAM_GROUP_ID`**: your supergroup ID (starting with `-100...`)
   - **`TELEGRAM_TOPIC_ID`**: your topic number (e.g. `2`, `15`)
   - **`NEXT_PUBLIC_SITE_URL`**: `https://www.nangdevit.xyz`
4. Select all environments (**Production**, **Preview**, **Development**).
5. Click **Save** and trigger a redeploy.

---

## 2. Deploying to Vercel

### Option A: Deploy via GitHub (Recommended)
1. Push your project to a private or public repository on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Nang Devit Corporate Portfolio"
   git remote add origin https://github.com/devitnang/nangdevit-portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New..."** &rarr; **"Project"**.
4. Import your `nangdevit-portfolio` repository.
5. In the build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Under **Environment Variables**, paste:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SITE_URL`
7. Click **Deploy**. Vercel will build and deploy the site in ~1 minute.

---

## 3. Custom Domain Configuration (www.nangdevit.xyz)

To connect your custom domain **`www.nangdevit.xyz`**:

### Step 1: Add Domain in Vercel
1. In your Vercel Project Dashboard, navigate to **Settings** &rarr; **Domains**.
2. Enter `www.nangdevit.xyz` and click **Add**.
3. Choose the recommended redirect configuration:
   - Redirect `nangdevit.xyz` to `www.nangdevit.xyz` (or vice versa).

### Step 2: Configure DNS Records at Domain Registrar
Log in to your DNS provider (e.g. Namecheap, Cloudflare, GoDaddy, Hostinger) and add the following records:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |
| **A** | `@` (root) | `76.76.21.21` | Automatic / 3600 |

### Step 3: SSL Verification
- Vercel automatically generates and provisions a free, auto-renewing **Let's Encrypt SSL certificate**.
- Once DNS records propagate (typically 5–30 minutes), the domain status in Vercel will turn green (`Valid Configuration`).

---

## 4. Verification Checklist

- [x] Responsive layout on Desktop, Tablet, and Mobile.
- [x] Light Mode and Dark Mode toggling with persistent corporate palette.
- [x] CV download points directly to `public/assets/cv/NANGDEVIT__CV.pdf`.
- [x] Profile picture rendering from `public/assets/images/nangdevit.PNG`.
- [x] NEC Experience timeline displaying `public/assets/images/logo/National_Election_Committee.png`.
- [x] SETEC Institute Education card displaying `public/assets/images/logo/setec_institute.png`.
- [x] Project gallery and carousel with interactive screenshots, GitHub, and Demo buttons.
- [x] Centralized project management in `src/data/projectsData.ts`.
- [x] Contact form with real-time validation, spam prevention (honeypot), and Telegram Bot notification delivery.
- [x] SEO robots.txt and dynamic sitemap.xml generated.

