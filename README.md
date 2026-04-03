# CineX — Content Explorer

CineX is a premium, Netflix-inspired movie discovery platform built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. It leverages the **The Movie Database (TMDB)** API to provide a seamless browsing and search experience for movie enthusiasts.

## 🚀 Quick Start

Follow these 4 steps to get the project running locally:

1. **Clone & Enter**:
   ```bash
   git clone <repository-url>
   cd content-explorer
   ```

2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment**:
   Create a `.env.local` file in the root and add your TMDB API Key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

4. **Launch**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🏗️ Architecture & Decisions

### **1. Deployment Strategy: Why Vercel?**
While Cloudflare Workers is a powerful platform, **Vercel** was chosen for this project for the following technical reasons:
*   **Native Next.js Support**: As the creators of Next.js, Vercel provides day-zero support for all features, including **Turbopack** and advanced **App Router** caching, without needing the complex adapters (like OpenNext) required for Cloudflare.
*   **Built-in Image Optimization**: Vercel handles `next/image` optimization out-of-the-box, ensuring that large TMDB posters and backdrops are automatically resized and served in modern formats (WebP/AVIF) at the edge.
*   **Simplified CI/CD for Next.js 16**: Vercel's build pipeline is specifically tuned for Next.js, handling Environment Variables and Edge Middleware with zero configuration.

### **2. Feature-Based Structure**
The project follows a modular architecture:
*   `app/lib/api.ts`: Centralized API abstraction layer. Components do not call `fetch` directly.
*   `app/components/`: Reusable UI components (MovieCard, SearchInput, Pagination).
*   `app/types/`: Shared TypeScript interfaces ensuring type safety across the app.

### **3. URL-Driven State Management**
All search, filtering, and pagination states are synchronized with the **URL parameters** (`query`, `page`). 
*   **Decision**: This ensures that search results are fully shareable and that the user's position is maintained after a browser refresh or "Back" navigation.

---

## ⚡ Performance Optimizations

CineX is optimized for **Core Web Vitals**, targeting a Lighthouse Performance score of 90+.

1.  **LCP Optimization**: 
    *   The Hero backdrop on the movie detail page and the top-row movie posters use `priority={true}` and `loading="eager"` to ensure the Largest Contentful Paint occurs as early as possible.
2.  **Zero-CLS Font Loading**: 
    *   Implemented via `next/font/local`. By bundling the **Geist** font files locally, we eliminate external network requests to Google Fonts and prevent Cumulative Layout Shift (CLS) during font swapping.
3.  **Intelligent Caching**: 
    *   Native `fetch` is used with `next: { revalidate: 3600 }` (1 hour) to cache API responses on the server, significantly reducing latency for subsequent requests.
4.  **Debounced Search**: 
    *   Search input uses a custom **400ms debounce** hook and React 19's `useTransition` to prevent unnecessary API spam while keeping the UI responsive.

---

## ✅ Mandatory Features (Rubric Compliance)

*   **F-1 Listing Page**: SSR-rendered grid with 20 items per page. Responsive layout (1 col mobile, 3-5 col desktop).
*   **F-2 Detail Page**: Dynamic route `/movies/[id]` with full metadata, dynamic SEO (OG images), and breadcrumb navigation.
*   **F-3 Search & Filtering**: URL-driven search with debounce and real-time UI feedback.
*   **F-4 States**: Shimmer skeleton loaders (`app/loading.tsx`), actionable `error.tsx` boundaries, and a dedicated "No Results found" UI.
*   **F-5 Deployment**: Fully optimized and ready for production on Vercel.

---

## 🐛 Known Issues & Solutions

During development and deployment, the following issues were encountered and resolved:

### **Issue 1: Vercel Environment Variable Secret Reference Error**
**Problem**: Deployment failed with error `NEXT_PUBLIC_TMDB_API_KEY references Secret "tmdb_api_key", which does not exist`.

**Root Cause**: The `vercel.json` file contained a reference to a non-existent Vercel Secret:
```json
"env": {
  "NEXT_PUBLIC_TMDB_API_KEY": "@tmdb_api_key"
}
```

**Solution**: Updated `vercel.json` to use the actual API key value instead of a secret reference, since `NEXT_PUBLIC_` variables are meant to be public.

**Lesson**: When deploying to Vercel, avoid using `@secret_name` references unless the secret is explicitly created in Vercel's Secrets Management panel.

### **Issue 2: Environment Variables Not Injected on Vercel**
**Problem**: API calls failed despite setting environment variables in Vercel dashboard.

**Solution**: Ensure environment variables are set in **Vercel Project Settings → Environment Variables**, not just in `.env.local`. For Vercel deployments:
1. Remove hardcoded values from `vercel.json`
2. Set variables via Vercel Dashboard (Settings → Environment Variables)
3. Redeploy after changes

---

## 🧪 Testing

The project includes unit tests for critical UI components and logic using **Vitest** and **React Testing Library**.
*   `MovieCard.test.tsx`: Verifies metadata rendering, link generation, and image fallback behavior.
*   `useDebounce.test.ts`: Ensures correct timing of debounced value updates.

Run tests with: `npm run test:run`

---

## 🛠️ Tech Stack
*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS v4 (Vanilla CSS variables)
*   **Icons**: Lucide React (Professional SVG icons)
*   **Testing**: Vitest + React Testing Library
*   **Data**: TMDB API

---

*Built for the Content Explorer Assessment.*
