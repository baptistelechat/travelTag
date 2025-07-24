# Umami Analytics Configuration

This guide explains how to configure Umami Analytics to track usage of your TravelTag application.

## Prerequisites

- An Umami account (free available at [umami.is](https://umami.is))
- Access to your Umami dashboard

## Configuration

### 1. Create a new website in Umami

1. Log in to your Umami dashboard
2. Click on "Add website"
3. Fill in your website information:
   - **Name**: TravelTag (or your preferred name)
   - **Domain**: your-domain.com
   - **Timezone**: Select your timezone

### 2. Get configuration information

After creating the website, you will get:
- **Website ID**: A unique identifier for your site
- **Tracking Code**: The tracking script URL

### 3. Configure environment variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your values:
   ```env
   VITE_UMAMI_WEBSITE_ID=your-website-id
   VITE_UMAMI_SRC=https://your-umami-domain.com/script.js
   ```

### 4. Deploy to production

Umami tracking only activates in production. Make sure your environment variables are properly configured on your deployment platform.

### Temporarily enable in development

If you want to test tracking in development:

1. **Debug mode** (recommended):
   ```bash
   # Add to your .env file
   VITE_DEBUG=true
   ```
   Then restart your development server.

2. **Using preview mode**:
   ```bash
   npm run build
   npm run preview
   ```

⚠️ **Important**: Don't forget to remove `VITE_DEBUG=true` before production deployment!

## Tracked Events

The TravelTag application automatically tracks the following events:

### Main Events
- **png_download**: QR code PNG download
- **print**: QR code printing

### Tracked Properties
- Number of PNG downloads
- Number of prints
- Automatic visit data (page views, approximate location, etc.)

## Verification

To verify that tracking is working:

1. Deploy your application to production
2. Visit your site
3. Interact with the application (fill the form, generate a QR code, etc.)
4. Check in your Umami dashboard that events appear

## Managing multiple sites

Umami allows managing multiple websites from a single account:

1. In your dashboard, click "Add website"
2. Create as many sites as needed
3. Each site will have its own Website ID
4. Use the appropriate Website ID for each application

## Privacy

- Tracking only activates in production
- No personal data is collected
- Umami is GDPR compliant and doesn't require cookie banners
- Data is automatically anonymized

## Troubleshooting

### Tracking doesn't work

1. Check that you're in production mode (`NODE_ENV=production`)
2. Verify that environment variables are correctly defined
3. Check the browser console for errors
4. Make sure the Umami script URL is accessible

### Events don't appear

1. Events may take a few minutes to appear
2. Verify that the Website ID matches your site
3. Test with different actions (download, print, etc.)

## Support

For more information about Umami:
- [Official Documentation](https://umami.is/docs)
- [Umami GitHub](https://github.com/umami-software/umami)