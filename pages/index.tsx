import SocialContactIcon from '@/components/layout/SocialContactIcon';
import Image from 'next/image';
// import * as API from '@/lib/api/guide';
// import { getPage } from '@/lib/notion/getNotionPage';
import { NOTION_GUIDE_ID } from '@/lib/constants';

import { GetStaticProps } from 'next';
import { Post } from '@/lib/type';
// import PostItemCard from '@/components/PostItemCard';
import backgroundImage from '@/public/imags/index.jpg';
import PostItemHome from '@/components/PostItemHome';
import getDataBaseList from '@/lib/notion/getDataBaseList';
// import { useEffect } from 'react';
import { CommonSEO } from '@/components/SEO';

interface IndexProps {
  posts: Post[];
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await getDataBaseList({
    pageId: NOTION_GUIDE_ID,
    from: 'index',
  });

  return {
    props: {
      posts: data.allPages?.filter((_, index) => index < 6),
    },
    revalidate: 10,
  };
};
const Home = ({ posts }: IndexProps) => {
  return (
    <>
      <CommonSEO title="index" description="" image="" ogType="website" />
      <div className="flex-auto mx-auto w-full">
        <div className="relative w-full h-[500px] sm:h-[300px] overflow-hidden rounded-lg">
          <Image
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end  p-10 md:p-12 sm:p-6">
            <h1 className="mb-4 sm:mb-2 text-2xl sm:text-lg font-bold text-white md:text-4xl">
              Jessie&apos;s Travel Blog
            </h1>
            <h1 className="text-4xl sm:text-lg font-bold text-white md:text-4xl">
              探索世界的奇幻之旅
            </h1>
            <SocialContactIcon
              prop={{
                className: 'mt-4 text-white w-full flex space-x-4',
                theme: 'white',
              }}
            />
          </div>
        </div>

        {/* 最近post及订阅 */}
        <div className="mx-auto w-full mt-10 mb-40">
          <div className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            最新攻略
          </div>
          <div className="grid gap-8 sm:grid-cols-1 grid-cols-3 md:grid-cols-2 border-none">
            {posts?.map((item) => <PostItemHome post={item} key={item.id} />)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
