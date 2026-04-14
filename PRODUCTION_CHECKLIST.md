# 🎯 Production Launch Checklist - The Golden Fork

## 🚨 CRITICAL - Do Before Launch

### 1. ⚙️ Update Configuration Files

- [ ] **Update `app/metadata.js`**:
  - Replace `YOUR_GOOGLE_VERIFICATION_CODE` with actual code
  - Update social media links (Twitter, Facebook, Instagram)
  - Verify `url: "https://www.thegoldenfork.me"` is correct

- [ ] **Verify Environment Variables** in production:
  ```env
  NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
  CLERK_SECRET_KEY=your_key
  # Add all from .env.local
  ```

### 2. 🎨 Create Required Images

- [ ] **Favicon Set** (Use https://realfavicongenerator.net/):
  - `favicon.ico`
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `apple-touch-icon.png` (180x180)
  - `android-chrome-192x192.png`
  - `android-chrome-512x512.png`

- [ ] **Social Media Images**:
  - `og-image.jpg` (1200x630) - For Facebook/Twitter previews
  - `logo.png` - Your restaurant logo

- [ ] **PWA Icons** (if using shortcuts):
  - `shortcut-menu.png` (96x96)
  - `shortcut-cart.png` (96x96)
  - `shortcut-orders.png` (96x96)

### 3. 🔍 Google Search Console

- [ ] Create account: https://search.google.com/search-console
- [ ] Add property: `https://www.thegoldenfork.me`
- [ ] Verify ownership (HTML tag method)
- [ ] Add verification code to `app/metadata.js`
- [ ] Submit sitemap: `https://www.thegoldenfork.me/sitemap.xml`
- [ ] Request indexing for homepage

### 4. 🌐 Domain & DNS Setup

- [ ] Domain registered: `thegoldenfork.me`
- [ ] SSL certificate active (HTTPS)
- [ ] DNS configured:
  ```
  A Record: @ → [Your server IP]
  CNAME: www → [Your hosting]
  ```
- [ ] Test: https://www.thegoldenfork.me loads correctly

### 5. 📊 Analytics Setup

- [ ] Google Analytics account created
- [ ] GA4 tracking ID obtained
- [ ] Add tracking code to `app/layout.js` (see guide)
- [ ] Test: Visit site and check Real-Time in GA

---

## ✅ IMPORTANT - Launch Day

### 1. 🏗️ Build & Deploy

```bash
# Test production build locally
npm run build
npm start

# Deploy to production
vercel --prod
# OR
git push origin main  # if auto-deploy enabled
```

### 2. 🧪 Test All Pages

- [ ] Homepage loads: `/`
- [ ] About page: `/about`
- [ ] Cart: `/cart`
- [ ] Checkout: `/checkout`
- [ ] Sign in/up works
- [ ] Orders page: `/my-orders`
- [ ] Admin panel (if applicable)

### 3. 📱 Mobile Testing

- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test tablet view
- [ ] Add to home screen works
- [ ] All buttons clickable
- [ ] Forms work correctly

### 4. 🎯 SEO Verification

- [ ] Visit: `https://www.thegoldenfork.me/sitemap.xml`
- [ ] Visit: `https://www.thegoldenfork.me/robots.txt`
- [ ] View page source: Check for JSON-LD structured data
- [ ] Test: https://search.google.com/test/rich-results
- [ ] Test: https://pagespeed.web.dev/

### 5. 💳 Payment Testing

- [ ] Test Cash on Delivery order
- [ ] Test Razorpay payment (use test mode)
- [ ] Verify order confirmation email/notification
- [ ] Check admin dashboard receives orders

### 6. 🔒 Security Checks

- [ ] All API keys are in environment variables (not hardcoded)
- [ ] `.env.local` is in `.gitignore`
- [ ] Admin routes are protected
- [ ] User authentication works
- [ ] HTTPS is enforced

---

## 🚀 RECOMMENDED - First Week

### 1. 📍 Google Business Profile

- [ ] Create profile: https://business.google.com
- [ ] Add business info:
  - Name: The Golden Fork
  - Address: [Your address]
  - Phone: +917736552508
  - Website: https://www.thegoldenfork.me
- [ ] Add photos (10+ recommended)
- [ ] Add menu items
- [ ] Set business hours
- [ ] Enable messaging

### 2. 🔗 Social Media

- [ ] Create/update Facebook Page
- [ ] Create/update Instagram Business
- [ ] Create/update Twitter
- [ ] Link all profiles in `app/metadata.js`
- [ ] Post launch announcement

### 3. 📊 Monitor & Track

- [ ] Check Google Search Console daily
- [ ] Monitor Google Analytics
- [ ] Check for 404 errors
- [ ] Monitor page speed
- [ ] Track conversion rate

### 4. 🎯 Marketing

- [ ] Share website link on WhatsApp status
- [ ] Create QR code for restaurant
- [ ] Print business cards with website
- [ ] Email existing customers
- [ ] Run Google Ads (optional)

---

## 📈 ONGOING - Monthly Tasks

### Month 1:
- [ ] Review Search Console performance
- [ ] Check which pages are indexed
- [ ] Fix any crawl errors
- [ ] Add fresh content/menu items

### Month 2:
- [ ] Analyze top-performing pages
- [ ] Improve low-traffic pages
- [ ] Add customer reviews
- [ ] Create blog posts (optional)

### Month 3:
- [ ] Monitor keyword rankings
- [ ] Update OpenGraph images seasonally
- [ ] Add new features based on analytics
- [ ] A/B test CTAs

---

## 🛠️ Quick Commands

### Development:
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check for errors
```

### Deployment (Vercel):
```bash
vercel              # Deploy to preview
vercel --prod       # Deploy to production
vercel logs         # View deployment logs
```

### Testing:
```bash
# Test sitemap
curl https://www.thegoldenfork.me/sitemap.xml

# Test robots
curl https://www.thegoldenfork.me/robots.txt

# Check build size
npm run build
```

---

## 📞 Support Resources

**Next.js Docs**: https://nextjs.org/docs  
**Vercel Support**: https://vercel.com/support  
**Google Search Console Help**: https://support.google.com/webmasters  
**Schema.org Reference**: https://schema.org/Restaurant

---

## ⚡ Quick Wins for Better SEO

1. **Add Alt Text to Images**: Describe every image
2. **Use Descriptive URLs**: Keep them short and meaningful
3. **Internal Linking**: Link between your pages
4. **Fast Load Times**: Already optimized with Next.js
5. **Mobile-First**: Already responsive
6. **Fresh Content**: Update menu regularly
7. **Customer Reviews**: Add testimonials page
8. **Local SEO**: Use location keywords

---

## 🎉 Launch Success Metrics

After 4 weeks, you should have:
- ✅ 20+ pages indexed by Google
- ✅ 100+ organic visits
- ✅ Rich snippets appearing
- ✅ Google Business listing active
- ✅ 5+ customer reviews
- ✅ Social media presence

---

## 📝 Notes

- Keep this checklist updated
- Mark completed items
- Review weekly
- Document any issues

**Last Updated**: October 30, 2025

---

**Ready to launch! 🚀 You've got this!**
