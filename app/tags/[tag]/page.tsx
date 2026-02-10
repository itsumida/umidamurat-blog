import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const filteredPosts = posts
    .filter((post) => post.tags?.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.73rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        posts tagged with <span style={{ color: 'var(--link)' }}>{tag}</span>
      </h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem' }}>
        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
      </p>

      <div>
        {filteredPosts.map((post) => (
          <article key={post.slug} style={{ marginBottom: '1.75rem' }}>
            <Link
              href={`/posts/${post.slug}`}
              style={{ color: 'var(--link)', fontSize: '1.2rem', fontWeight: '600' }}
            >
              {post.title}
            </Link>
            <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.8 }}>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {post.excerpt && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
