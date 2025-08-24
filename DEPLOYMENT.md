# 🚀 Deploying Sideflight to Vercel

## ✅ What's Ready

Your project is now configured for Vercel deployment with:
- **Static HTML site** (`index.html`)
- **API endpoint** (`/api/subscribe`) for email subscriptions
- **Proper CORS headers** for cross-origin requests
- **Vercel configuration** (`vercel.json`)

## 🚀 Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Set Environment Variables
After deployment, you need to set your Resend API key:

```bash
vercel env add RESEND_API_KEY
```

Or through the Vercel dashboard:
1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add `RESEND_API_KEY` with your actual Resend API key

### 5. Redeploy (if you added env vars)
```bash
vercel --prod
```

## 🔧 How It Works

- **Frontend**: Your `index.html` will be served as a static site
- **API**: The `/api/subscribe` endpoint will be handled by `api/subscribe.js` as a serverless function
- **Email**: Uses Resend to send welcome emails to subscribers

## 🌐 Production URL

After deployment, your site will be available at:
- **Main site**: `https://your-project-name.vercel.app`
- **API**: `https://your-project-name.vercel.app/api/subscribe`

## 🧪 Testing

1. **Local testing**: `npm start` (runs on localhost:3000)
2. **Production testing**: Deploy and test the live URL

## 📝 Notes

- The `server.js` file is only used for local development
- Vercel automatically handles the API routing based on the `api/` directory structure
- Your HTML form will work both locally and in production using the same `/api/subscribe` endpoint
