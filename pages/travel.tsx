import Layout from '../components/Layout/index';
import HeroPost from "../components/hero-post";
import { GetStaticProps } from "next";
import { getAllPostsForHome } from "../lib/api";

const Work = ({ allPosts: { edges }, preview }) => {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);
  console.log('heroPost',heroPost)
  return (
    <Layout>
      {/* <SEO title="All posts" />
      <Bio className="my-14" /> */}
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.featuredImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          content={heroPost.content}
        />
      )}
      {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
    </Layout>
  );
};
export default Work;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
