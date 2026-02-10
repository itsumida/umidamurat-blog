"use client";

import { useState } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

export default function PostList({ posts }: { posts: Post[] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div>
        {visiblePosts.map((post) => (
          <article key={post.slug} style={{ marginBottom: "1.75rem" }}>
            <Link
              href={`/posts/${post.slug}`}
              style={{
                color: "var(--link)",
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
            >
              {post.title}
            </Link>
            <div
              style={{ fontSize: "0.9rem", marginTop: "0.25rem", opacity: 0.8 }}
            >
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.tags && post.tags.length > 0 && (
                <span>
                  {" "}
                  ·{" "}
                  {post.tags.map((tag, index) => (
                    <span key={tag}>
                      {index > 0 && ", "}
                      <Link href={`/tags/${tag}`} style={{ color: "var(--link)" }}>
                        {tag}
                      </Link>
                    </span>
                  ))}
                </span>
              )}
            </div>
            {post.excerpt && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
      </div>
      {hasMore && (
        <div style={{ marginTop: "1.75rem" }}>
          <button
            onClick={() => setVisibleCount(visibleCount + 5)}
            style={{
              background: "none",
              border: "none",
              color: "var(--link)",
              cursor: "pointer",
              fontSize: "1rem",
              fontFamily: "inherit",
              textDecoration: "none",
              padding: 0,
            }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            load more →
          </button>
        </div>
      )}
    </>
  );
}
