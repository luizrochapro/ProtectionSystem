# Deploying to Bohr.io

This document explains how to deploy the PowerProtect frontend application to Bohr.io using **Option 2: SSR with Experimental Support**.

## Overview

This configuration enables full Next.js Server-Side Rendering (SSR) capabilities on Bohr.io, providing:

- ✅ Full Next.js features enabled
- ✅ Server-side rendering support
- ✅ API routes support (if needed in future)
- ✅ Image optimization enabled
- ✅ Streaming support
- ✅ Better for dynamic content

## Configuration

The project includes the following configuration files for Bohr.io deployment:

### 1. `.bohr.json`

This file contains the Bohr.io deployment configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npx next dev --port $PORT",
  "installCommand": "npm install",
  "publicPath": "./",
  "deployPath": "./",
  "env": {
    "BOHR_WEB_ADAPTER": "1",
    "BOHR_WEB_ADAPTER_TYPE": "nextjs",
    "BOHR_FUNCTION_RUNTIME": "nodejs18.x"
  }
}
```

### 2. `next.config.ts`

The Next.js configuration is set to use standalone output mode:

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
}
```

### 3. `package.json`

The build script is configured for SSR:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## Environment Variables

### Required Variables

Set the following environment variables in your Bohr.io project settings:

1. **NEXT_PUBLIC_API_URL**: The URL of your backend API
   - Example: `https://api.yourbackend.com`
   - For local development: `http://localhost:3001`

### Setting Environment Variables on Bohr.io

1. Go to your project settings on Bohr.io
2. Navigate to the "Environment Variables" section
3. Add each variable with its corresponding value
4. Variables prefixed with `NEXT_PUBLIC_` will be available in the browser
5. Other variables will only be available server-side

Example:
```
NEXT_PUBLIC_API_URL=https://api.yourbackend.com
```

## Deployment Steps

### First Time Deployment

1. **Connect your GitHub repository** to Bohr.io:
   - Go to [Bohr.io](https://bohr.io)
   - Sign in with your GitHub account
   - Click "New Project"
   - Select this repository

2. **Configure environment variables**:
   - In the project settings, add your environment variables
   - At minimum, set `NEXT_PUBLIC_API_URL` to your API endpoint

3. **Deploy**:
   - Bohr.io will automatically detect the `.bohr.json` configuration
   - The deployment will use Node.js 18.x runtime
   - Build process will run automatically
   - The app will be deployed with SSR enabled

### Automatic Deployments

Once connected, Bohr.io will automatically deploy:
- Every push to your main/master branch
- Pull request previews for each PR

### Manual Deployment

To trigger a manual deployment:
1. Go to your project on Bohr.io
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to your repository

## Features with SSR Configuration

### Enabled Features

- **Server-Side Rendering**: Pages are rendered on the server for better SEO and initial load performance
- **API Routes**: Next.js API routes are fully supported (can be added to `/app/api/*`)
- **Streaming**: React Server Components with streaming support
- **Dynamic Routes**: All Next.js dynamic routing features
- **Image Optimization**: Next.js Image component works (with unoptimized mode for Bohr.io compatibility)
- **Middleware**: Next.js middleware is supported

### API Integration

The application consumes an external API configured via `NEXT_PUBLIC_API_URL`. Make sure:

1. The API URL is set correctly in environment variables
2. CORS is properly configured on your backend
3. The API is accessible from Bohr.io's servers

## Build Output

With `output: 'standalone'` mode:

- Next.js creates a minimal standalone server
- All dependencies are bundled
- The `.next/standalone` folder contains everything needed to run the app
- Smaller deployment size compared to default output
- Better cold start performance

## Troubleshooting

### Build Fails

- **Check Node.js version**: Ensure you're using Node.js 18.x
- **Dependencies**: Run `npm install` locally to ensure package-lock.json is up to date
- **Environment variables**: Verify all required variables are set

### Runtime Errors

- **API Connection**: Verify `NEXT_PUBLIC_API_URL` is set correctly
- **CORS Issues**: Ensure backend allows requests from your Bohr.io domain
- **Check logs**: View deployment logs in Bohr.io dashboard

### Deployment Not Starting

- **Verify `.bohr.json`**: Ensure the file is valid JSON
- **Check build command**: Verify `npm run build` works locally
- **Dependencies**: Ensure all dependencies are in `package.json`

## Local Development vs Production

### Local Development

```bash
npm install
cp .env.example .env
# Edit .env and set NEXT_PUBLIC_API_URL
npm run dev
```

Visit http://localhost:3000

### Production (Bohr.io)

- Set environment variables in Bohr.io dashboard
- Push to GitHub
- Bohr.io automatically builds and deploys
- Visit your assigned Bohr.io URL

## Performance Optimization

### Recommended Practices

1. **Image Optimization**: Use Next.js `<Image>` component for automatic optimization
2. **Code Splitting**: Next.js automatically splits code by route
3. **Caching**: Configure appropriate cache headers in API responses
4. **React Query**: Already configured for efficient data fetching and caching

## Monitoring

After deployment:

1. **Check deployment logs** in Bohr.io dashboard
2. **Monitor runtime logs** for errors
3. **Test all features** on the deployed URL
4. **Verify API connectivity** from production environment

## Additional Resources

- [Bohr.io Documentation](https://docs.bohr.io)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Next.js Standalone Output](https://nextjs.org/docs/pages/api-reference/next-config-js/output)

## Support

For issues specific to:
- **Bohr.io deployment**: Contact Bohr.io support
- **Application bugs**: Open an issue in this repository
- **Next.js questions**: Refer to Next.js documentation
