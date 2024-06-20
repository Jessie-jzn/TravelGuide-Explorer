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

const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <div className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8">
      {posts.map((item: Post) => (
        <GuideCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Index;
