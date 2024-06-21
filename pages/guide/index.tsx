import { GetStaticProps } from 'next';
import * as API from '../api/guide';
import GuideCard from '@/components/GuideCard';
import { Post } from '@/lib/type';

interface IndexProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await API.getTravelGuideList();

  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
};

const Index = ({ posts }: IndexProps): React.JSX.Element => {
  return (
    <div className="grid sm:gap-8 gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
      {posts.map((item: Post) => (
        <GuideCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Index;
