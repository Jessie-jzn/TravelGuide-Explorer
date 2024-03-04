import Layout from '../components/Layout/index';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../lib/api';
import PostCard from '../components/post-card';

interface WorkProps {
  edges: any[]; // 根据实际情况定义 edges 的类型
}

const Work = ({ edges }: WorkProps) => {
  return (
    <Layout>
      <div className="relative px-8">
        <div className="max-w-screen-xl mx-auto my-12 md:mt-18 lg:mt-20">
          <h1 className="font-display text-secondary-500 text-4xl font-black tracking-wide">
            {/* {id} */}
          </h1>
        </div>
      </div>

      <div className="relative px-8 mb-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {edges.map((edgeItem, index) => (
              <PostCard key={index} edgeItem={edgeItem} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Work;

export const getStaticProps: GetStaticProps = async () => {
  const edges = await getAllPosts();

  return {
    props: { edges },
    revalidate: 10,
  };
};
