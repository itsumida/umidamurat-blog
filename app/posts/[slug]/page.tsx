import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/components/ViewTracker";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <ViewTracker slug={slug} />
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{post.title}</h1>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <span>
              {' '}· {post.tags.map((tag, index) => (
                <span key={tag}>
                  {index > 0 && ', '}
                  <Link
                    href={`/tags/${tag}`}
                    style={{ color: 'var(--link)' }}
                  >
                    {tag}
                  </Link>
                </span>
              ))}
            </span>
          )}
        </div>
      </header>

      <div className="prose" style={{ maxWidth: '65ch' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <footer style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
        <Link href="/" style={{ color: 'var(--link)' }}>
          ← Back to home
        </Link>
      </footer>
    </article>
  );
}
