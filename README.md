# 🛕 Trivatinath Mandir — Vercel Deployment Guide

## Project Structure
```
mandir-vercel/
├── vercel.json              ← Vercel config
├── package.json
├── supabase_setup.sql       ← Run once in Supabase SQL editor
├── api/
│   ├── register.js          ← POST /api/register
│   └── registrations.js     ← GET  /api/registrations
└── public/                  ← All webpages files
    ├── index.html
    ├── register.html
    ├── admin.html
    ├── style.css
    └── ...
```

---

## STEP 1 — Set up Supabase (Free Database)

1. Go to **https://supabase.com** → Sign up free
2. Click **New Project** → name it `trivatinath-mandir`
3. Go to **SQL Editor → New Query**
4. Paste the contents of `supabase_setup.sql` → click **Run**
5. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon / public key** → `SUPABASE_KEY`

---

## STEP 2 — Deploy to Vercel

### Option A — Drag & Drop (Easiest, no account setup needed)
1. Go to **https://vercel.com** → Sign up free (use GitHub/Google)
2. Click **"Add New Project"**
3. Scroll down → **"Or deploy from your local project"** → drag the `mandir-vercel` folder
4. Click **Deploy**

### Option B — GitHub (Best for future updates)
1. Upload this folder to a GitHub repository
2. Go to **https://vercel.com → Add New Project → Import Git Repository**
3. Select your repo → click **Deploy**

---

## STEP 3 — Add Environment Variables

After deploying:
1. Go to your project in Vercel dashboard
2. Click **Settings → Environment Variables**
3. Add these two variables:

| Name            | Value                        |
|-----------------|------------------------------|
| `SUPABASE_URL`  | `https://xxxx.supabase.co`  |
| `SUPABASE_KEY`  | `your-anon-public-key`      |

4. Click **Save** → then go to **Deployments → Redeploy** to apply

---

## STEP 4 — Done! 🎉

Your site is live at:
- `https://your-project.vercel.app/register.html` — Registration page
- `https://your-project.vercel.app/admin.html` — Admin dashboard
- `https://your-project.vercel.app/api/registrations` — Raw data (JSON)

---

## Everything is FREE
| Service  | Free Tier Includes |
|----------|--------------------|
| Vercel   | Unlimited deployments, 100GB bandwidth, serverless functions |
| Supabase | 500MB database, 50,000 users/month |
"# trivatinath" 
