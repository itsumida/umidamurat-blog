import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default async function TagsPage() {
  const posts = await getAllPosts();

  // Count posts per tag
  const tagCounts = posts.reduce((acc, post) => {
    post.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  // Calculate font sizes based on count
  const maxCount = Math.max(...sortedTags.map(([, count]) => count));
  const minCount = Math.min(...sortedTags.map(([, count]) => count));

  const getFontSize = (count: number) => {
    // Map count to font size range (1rem to 2.5rem)
    const minSize = 1;
    const maxSize = 2.5;

    if (maxCount === minCount) return 1.5; // All tags have same count

    const ratio = (count - minCount) / (maxCount - minCount);
    return minSize + ratio * (maxSize - minSize);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.73rem', marginBottom: '1.75rem', fontWeight: 'bold' }}>tags</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'baseline' }}>
        {sortedTags.map(([tag, count]) => (
          <div key={tag} style={{ fontSize: `${getFontSize(count)}rem` }}>
            <Link href={`/tags/${tag}`} style={{ color: 'var(--link)' }}>
              {tag}
            </Link>
            <span style={{ opacity: 0.6, marginLeft: '0.25rem', fontSize: '0.8rem' }}>({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
