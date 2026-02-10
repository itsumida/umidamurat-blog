# Deployment Guide for umidamurat.com

## Deploy to Vercel (Free & Easy)

### Step 1: Push to GitHub

```bash
cd /Users/umidamurat/umidamurat-blog
git init
git add .
git commit -m "Initial commit: Blog setup"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/umidamurat-blog.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click "Add New" → "Project"
3. Import your `umidamurat-blog` repository
4. Vercel will auto-detect Next.js settings - just click "Deploy"
5. Wait for deployment to complete (usually 1-2 minutes)

### Step 3: Add Your Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Add your domain:
   - Enter `umidamurat.com` and click "Add"
   - Also add `www.umidamurat.com` (recommended)

### Step 4: Configure DNS

Vercel will show you DNS records to add. Go to your domain registrar (where you bought umidamurat.com) and add these records:

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Option B: Using CNAME (if A records don't work)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 5: Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Usually happens within 1-2 hours
- Check status in Vercel dashboard (it will show "Valid Configuration" when ready)

## Alternative: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy"
6. Add custom domain in Site settings → Domain management

## Alternative: Deploy to Your Own Server

### Build for Production

```bash
npm run build
npm start
```

The app runs on port 3000 by default. Use a reverse proxy (nginx/Apache) to serve it on port 80/443.

### Using PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "umidamurat-blog" -- start
pm2 save
pm2 startup
```

## Environment Variables (if needed later)

If you add features that need API keys or secrets, add them in:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Own server: Create `.env.local` file

## Updating Your Blog

After making changes:

```bash
git add .
git commit -m "Add new post"
git push
```

Vercel/Netlify will automatically rebuild and deploy your changes.

## Troubleshooting

**"Domain is not configured correctly"**
- Wait longer for DNS propagation
- Double-check DNS records match exactly

**"Build failed"**
- Check build logs in Vercel/Netlify dashboard
- Test locally with `npm run build`

**"Port 3000 already in use"**
- Stop other services on port 3000, or Next.js will use 3001 automatically
