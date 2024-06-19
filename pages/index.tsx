import Meta from '@/components/Meta';
import ContactIcon from '@/components/ContactIcon';
import * as API from './api/guide';
import { GetStaticProps } from 'next';
import { Post } from '@/lib/type';

interface IndexProps {
  posts: Post[];
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await API.getTravelGuideList();

  // 返回格式化后的数据
  console.log('formattedGuides', data);

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
            </div>
          </div>
        </div>
        {/* 最新的post部分 */}
        <div className="sm:px-8 mt-24 md:mt-28">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                  <div className="flex flex-col gap-16">
                    {posts?.map((p) => (
                      <article className="group relative flex flex-col items-start">
                        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                          <div
                            className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"
                            data-relingo-block="true"
                            data-relingo-parsed="true"
                          ></div>
                          <a
                            href="/articles/crafting-a-design-system-for-a-multiplanetary-future"
                            previewlistener="true"
                          >
                            <span
                              className="relative z-10"
                              data-relin-paragraph="34"
                              data-relingo-parsed="true"
                            >
                              Crafting a design system for a multiplanetary
                              future
                            </span>
                          </a>
                        </h2>
                        <time
                          className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                          datetime="2022-09-05"
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
                          September 5, 2022
                        </time>
                        <p
                          className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400"
                          data-relingo-block="true"
                          data-relin-paragraph="8"
                          data-relingo-parsed="true"
                        >
                          Most companies try to stay ahead of the curve when it
                          comes to visual design, but for Planetaria we needed
                          to create a brand that would still inspire us 100
                          years from now when humanity has spread across our
                          entire solar system.
                        </p>
                        <div
                          aria-hidden="true"
                          className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                        >
                          Read article
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
                      </article>
                    ))}
                  </div>
                  <div className="space-y-10 lg:pl-16 xl:pl-24">222</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
