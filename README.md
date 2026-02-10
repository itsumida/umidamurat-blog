# Umida Murat's Blog

A modern, fast, and beautiful blog built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ Clean, minimalist design
- 🌙 Dark mode support (automatic based on system preferences)
- 📝 Write posts in Markdown or MDX
- 🏷️ Tag system for organizing posts
- 💻 Syntax highlighting for code blocks
- 📱 Fully responsive
- ⚡ Built with Next.js for optimal performance
- 🎨 Styled with Tailwind CSS

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your blog.

### 3. Create Your First Post

Create a new `.md` file in the `posts/` directory:

```markdown
---
title: "My First Post"
date: "2026-02-10"
excerpt: "This is a brief description of my post"
tags: ["personal", "thoughts"]
---

# My First Post

Write your content here...
```

The frontmatter (between the `---` markers) supports:
- `title` - Post title (required)
- `date` - Publication date in YYYY-MM-DD format (required)
- `excerpt` - Brief description shown on the homepage (optional)
- `tags` - Array of tags for categorization (optional)

## Project Structure

```
umidamurat-blog/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout with navigation
│   ├── page.tsx         # Homepage (lists all posts)
│   ├── about/           # About page
│   ├── posts/[slug]/    # Individual post pages
│   └── tags/            # Tag pages
├── components/          # Reusable React components
├── lib/                 # Utility functions
│   └── posts.ts        # Functions to read and parse posts
├── posts/              # Your blog posts (Markdown files)
└── public/             # Static assets

```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy
5. Add your custom domain (umidamurat.com) in the Vercel dashboard:
   - Go to Settings → Domains
   - Add `umidamurat.com` and `www.umidamurat.com`
   - Update your DNS settings with the provided records

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Your Information

Edit these files:
- `app/layout.tsx` - Update site title and navigation
- `app/about/page.tsx` - Write your about page
- `app/page.tsx` - Customize the homepage

### Styling

The blog uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles and dark mode colors

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
