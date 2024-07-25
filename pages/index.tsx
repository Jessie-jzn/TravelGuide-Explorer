import Meta from '@/components/Meta';
import ContactIcon from '@/components/ContactIcon';
import Image from 'next/image';
import * as API from '@/lib/api/guide';
// import { getPage } from '@/lib/notion/getNotionPage';
import { NOTION_GUIDE_ID } from '@/lib/constants';

import { GetStaticProps } from 'next';
import { Post } from '@/lib/type';
// import PostItemCard from '@/components/PostItemCard';
import backgroundImage from '@/public/imags/index.jpg';
import PostItemHome from '@/components/PostItemHome';
import { useEffect } from 'react';
import { CommonSEO } from '@/components/SEO';

interface IndexProps {
  posts: Post[];
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await API.getTravelGuideList();
  // const datas = await getPage({});

  // console.log('datas', datas);

  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
};
const Home = ({ posts }: IndexProps) => {
  const getPage = (params: any) => {
    return fetch(`/api/fetchGuideList`, {
      method: 'POST',
      body: JSON.stringify({
        pageId: NOTION_GUIDE_ID,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }

        const error: any = new Error(res.statusText);
        error.response = res;
        return Promise.reject(error);
      })
      .then((res) => res.json());
  };

  useEffect(() => {
    getPage({});
  }, []);
  return (
    <>
      <Meta title="Jessie's Travel Guide" />
      <CommonSEO title="index" description="" image="" ogType="website" />
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
