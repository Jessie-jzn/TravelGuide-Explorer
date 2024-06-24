import Meta from '@/components/Meta';
import ContactIcon from '@/components/ContactIcon';
import * as API from './api/guide';
import { GetStaticProps } from 'next';
import { Post } from '@/lib/type';
import PostItemCard from '@/components/PostItemCard';

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
      <div className="flex-auto mx-auto w-full px-4 sm:px-8 lg:px-8">
        {/* 个人自我介绍top */}
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <h1
            className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            data-relingo-block="true"
            data-relin-paragraph="6"
            data-relingo-parsed="true"
          >
            探索世界的奇幻之旅
          </h1>
          <p
            className="mt-6 mb-6 text-base text-zinc-600 dark:text-zinc-400"
            data-relingo-block="true"
            data-relin-paragraph="7"
            data-relingo-parsed="true"
          >
            大家好，我是热爱旅行的Jessie。我的足迹遍布中国每一个省份，以及日本、泰国、马来西亚等国。我热衷探索各地的文化、历史和美食，并与大家分享实用的旅行攻略和有趣的故事。旅行不仅是探索未知，更是发现自我。期待与你们一起开启新的冒险之旅！
          </p>
          <ContactIcon />
        </div>
        {/* image */}

        {/* 最近post及订阅 */}
        <div className="mx-auto max-w-2xl lg:max-w-5xl mt-10 grid  grid-cols-1 gap-y-20 lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts?.map((item) => <PostItemCard item={item} key={item.id} />)}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <form
              className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
              action="/thank-you"
            >
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 flex-none"
                >
                  <path
                    d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                    className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                  ></path>
                  <path
                    d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                    className="stroke-zinc-400 dark:stroke-zinc-500"
                  ></path>
                </svg>
                <span className="ml-3">订阅</span>
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                订阅我的文章，收到我的最新发布通知，可随时取消订阅。
              </p>
              <div className="mt-6 flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                />
                <button
                  className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
                  type="submit"
                >
                  订阅
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 flex-none"
                >
                  <path
                    d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                    className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                  ></path>
                  <path
                    d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
                    className="stroke-zinc-400 dark:stroke-zinc-500"
                  ></path>
                </svg>
                <span
                  className="ml-3"
                  data-relingo-block="true"
                  data-relin-paragraph="214"
                  data-relingo-parsed="true"
                >
                  分类
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
