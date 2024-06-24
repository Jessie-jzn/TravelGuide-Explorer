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
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  px-4 sm:px-8 lg:px-8">
      {posts.map((item: Post) => (
        <GuideCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Index;
