import Meta from '@/components/Meta';
import ContactIcon from '@/components/ContactIcon';
import Image from 'next/image';
import * as API from './api/guide';
import { GetStaticProps } from 'next';
import { Post } from '@/lib/type';
import PostItemCard from '@/components/PostItemCard';
import backgroundImage from '@/public/imags/index.jpg';

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
const Home = ({ posts }: IndexProps) => {
  return (
    <>
      <Meta title="Jessie's Travel Guide" />
      <div className="flex-auto mx-auto w-full">
        <div className="relative w-full h-[500px] sm:h-[300px] overflow-hidden rounded-lg">
          <Image
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-10 md:p-12 sm:p-6">
            <h1 className="mb-4 sm:mb-2 text-2xl sm:text-lg font-bold text-white md:text-4xl">
              Jessie&apos;s Travel Blog
            </h1>
            <h1 className="text-4xl sm:text-lg font-bold text-white md:text-4xl">
              探索世界的奇幻之旅
            </h1>
            <div className="mt-4 text-white">
              <ContactIcon fillColor="zinc-100" />
            </div>
          </div>
        </div>

        {/* 最近post及订阅 */}
        <div className="mx-auto max-w-2xl lg:max-w-5xl mt-10">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-none"></div>
          <div className="flex flex-col gap-16">
            {posts?.map((item) => <PostItemCard item={item} key={item.id} />)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
