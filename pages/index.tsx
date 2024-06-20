import Meta from '@/components/Meta';
import ContactIcon from '@/components/ContactIcon';
import * as API from './api/guide';
import { GetStaticProps } from 'next';
import { Post } from '@/lib/type';
import Link from 'next/link';

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
      <Meta title="Jessie's Blog" />
      <div className="flex-auto mt-10 mx-auto w-full max-w-7xl">
        {/* 个人自我介绍top */}
        <div className="sm:px-8 mt-9">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">

                <h1
                  className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                  data-relingo-block="true"
                  data-relin-paragraph="6"
                  data-relingo-parsed="true"
                >
                  Jessie的旅行日记：探索世界的奇幻之旅
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
              <div className="mx-auto max-w-2xl lg:max-w-5xl mt-10">
                <div className="max-w-screen-xl mx-auto my-12 md:mt-18 lg:mt-20">
                  <h1 className="font-display text-secondary-500 text-4xl font-black tracking-wide">
                    最新攻略
                  </h1>
                </div>
                <div className="flex flex-col gap-16">
                  {posts?.map((item) => (
                    <article className="group relative flex flex-col items-start" key={item.id}>
                      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        <div
                          className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"
                          data-relingo-block="true"
                          data-relingo-parsed="true"
                        ></div>
                        <span
                          className="relative z-10"
                          data-relin-paragraph="34"
                          data-relingo-parsed="true"
                        >
                          {item.name}
                        </span>
                      </h2>
                      <time
                        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                        dateTime={item.date}
                      >
                        <span
                          className="absolute inset-y-0 left-0 flex items-center"
                          aria-hidden="true"
                        >
                          <span
                            className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
                            data-relingo-block="true"
                            data-relingo-parsed="true"
                          ></span>
                        </span>
                        {item.date}
                      </time>
                      <p
                        className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400"
                        data-relingo-block="true"
                        data-relin-paragraph="8"
                        data-relingo-parsed="true"
                      >{item.description}
                      </p>
                      <Link href={`/guide/${item.id}`}>
                        <div
                          aria-hidden="true"
                          className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                        >
                          查看原文
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="ml-1 h-4 w-4 stroke-current"
                          >
                            <path
                              d="M6.75 5.75 9.25 8l-2.5 2.25"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mx-auto max-w-2xl lg:max-w-5xl mt-10">
                <form className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40" action="/thank-you">
                  <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 flex-none">
                      <path d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"></path>
                      <path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" className="stroke-zinc-400 dark:stroke-zinc-500"></path>
                    </svg>
                    <span className="ml-3">订阅</span>
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">订阅我的文章，收到我的最新发布通知，可随时取消订阅。</p>
                  <div className="mt-6 flex">
                    <input type="email" placeholder="Email address" className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10" />
                    <button className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none" type="submit">
                      订阅
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
