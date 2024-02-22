import Layout from '../components/Layout/index';
import Link from 'next/link';
import { getSortedPosts, PostInfo } from '../public/utils/posts';
import fs from 'fs';
import matter from 'gray-matter';
import { generateRssPostsFeed } from "../public/utils/rss";

interface WorkProps {
  posts: PostInfo[];
}
const Work = ({ posts }: WorkProps) => {
  return (
    <Layout>
      {/* <SEO title="All posts" />
      <Bio className="my-14" /> */}
      {posts.map(({ frontmatter: { title, description, date } }) => (
        <article key={title}>
          <header>
            <h3>{title}</h3>
            <span>{date}</span>
          </header>
          <section>
            <p>{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
};
export default Work;

export async function getStaticProps() {
  generateRssPostsFeed();
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
// export async function getStaticProps() {
//     const files = fs.readdirSync(`${process.cwd()}/content/posts`);

//     const posts = files.map((filename) => {
//       const markdownWithMetadata = fs
//         .readFileSync(`content/posts/${filename}`)
//         .toString();

//       const { data } = matter(markdownWithMetadata);

//       // Convert post date to format: Month day, Year
//       const options = { year: "numeric", month: "long", day: "numeric" };
//       const formattedDate = data.date.toLocaleDateString("en-US", options);

//       const frontmatter = {
//         ...data,
//         date: formattedDate,
//       };

//       return {
//         slug: filename.replace(".md", ""),
//         frontmatter,
//       };
//     });

//     return {
//       props: {
//         posts,
//       },
//     };
//   }
