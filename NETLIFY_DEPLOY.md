# 🚀 Netlify Deployment Guide

## Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Run `npm run build` to create the `dist` folder
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to the deploy area
4. Your site will be live instantly!

### Option 2: Git Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically deploy on every push

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run build
netlify deploy --dir=dist --prod
```

## 🔧 Fixed Issues

✅ **Asset Paths** - Now using relative paths (`./assets/`)  
✅ **Routing** - Changed to HashRouter for Netlify compatibility  
✅ **Netlify Config** - Added `netlify.toml` with proper settings  
✅ **Redirects** - Added `_redirects` file for client-side routing  

## 🐛 Troubleshooting

### If you still see a blank screen:

1. **Check the browser console** (F12) for errors
2. **Verify the build** - Make sure `npm run build` completes successfully
3. **Check Netlify logs** - Go to your site's deploy logs in Netlify dashboard
4. **Clear cache** - Hard refresh (Ctrl+F5) or clear browser cache

### Common Issues:

**Issue**: "Cannot find module" errors
**Solution**: Make sure all dependencies are installed with `npm install`

**Issue**: 404 errors on refresh
**Solution**: The `_redirects` file should handle this automatically

**Issue**: Assets not loading
**Solution**: The relative paths should fix this

## 📁 Files Added for Netlify

- `netlify.toml` - Netlify configuration
- `public/_redirects` - URL redirects for SPA routing
- Updated `vite.config.ts` - Relative asset paths

## 🎯 Your Portfolio Features

✅ **No more Lovable popup**  
✅ **Clean, smooth background**  
✅ **Mobile responsive**  
✅ **Pixel art theme**  
✅ **Ready for Netlify**  

## 🚀 Next Steps

1. **Deploy to Netlify** using one of the methods above
2. **Test on mobile** - Your site is now fully responsive
3. **Share your URL** - Your portfolio is live!

Your portfolio should now work perfectly on Netlify! 🎉
