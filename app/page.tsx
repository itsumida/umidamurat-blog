import { getAllPosts } from "@/lib/posts";
import { getAllViews } from "@/lib/views";
import Link from "next/link";
import PostList from "@/components/PostList";

export default async function Home() {
  const posts = await getAllPosts();
  const views = getAllViews();

  const sortedPosts = posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get popular posts (posts with views, sorted by view count)
  const popularPosts = posts
    .map((post) => ({
      ...post,
      views: views[post.slug] || 0,
    }))
    .filter((post) => post.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div>
      {sortedPosts.length === 0 ? (
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "1rem", lineHeight: "1.75" }}>
            No posts yet. Create your first post in the <code>posts/</code>{" "}
            directory!
          </p>
        </section>
      ) : (
        <>
          {popularPosts.length > 0 && (
            <section style={{ marginBottom: "3.5rem" }}>
              <h2
                style={{
                  fontSize: "1.73rem",
                  marginBottom: "1.75rem",
                  fontWeight: "bold",
                }}
              >
                popular
              </h2>
              <div>
                {popularPosts.map((post) => (
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
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "0.25rem",
                        opacity: 0.8,
                      }}
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
                              <Link
                                href={`/tags/${tag}`}
                                style={{ color: "var(--link)" }}
                              >
                                {tag}
                              </Link>
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontSize: "1.73rem",
                marginBottom: "1.75rem",
                fontWeight: "bold",
              }}
            >
              recent
            </h2>
            <PostList posts={sortedPosts} />
          </section>
        </>
      )}
    </div>
  );
}
