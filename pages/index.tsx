import Link from "next/link";
import Layout from '../components/layout'
import Meta from '../components/Meta'
import { getSortedPosts, PostInfo } from "../public/utils/posts";
import { generateRssPostsFeed } from "../public/utils/rss";

interface HomeProps {
  posts: PostInfo[];
}

export default function Home({ posts }: HomeProps): JSX.Element {
  return (
    <Layout>
      <Meta title="All posts" />
      {posts.map(({ frontmatter: { title, description, date }, slug }: PostInfo) => (
        <article key={slug}>
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                <div className="text-4xl font-bold text-yellow-600 font-display">
                  {title}
                </div>
              </Link>
            </h3>
            <span className="text-sm">{date}</span>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  generateRssPostsFeed();
  const posts: PostInfo[] = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
