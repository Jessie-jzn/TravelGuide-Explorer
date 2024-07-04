import { useState } from 'react';
import { GetStaticProps } from 'next';
import * as API from '@/lib/api/guide';
import GuideCard from '@/components/GuideCard';
import { Post, Country } from '@/lib/type';

interface IndexProps {
  guidesByCountry: Country[];
}

const getGuidesByCountry = (guides: Post[], countries: Country[]) => {
  const res = countries.map((country) => {
    return {
      ...country,
      guides: guides.filter((guide) => country.guide.includes(guide.id)),
    };
  });
  return res;
};

export const getStaticProps: GetStaticProps = async () => {
  const [guideList = [], countryList] = await Promise.all([
    API.getTravelGuideList(),
    API.getCountryList(),
  ]);

  // 提取包含指南的国家列表
  const guidesByCountry = getGuidesByCountry(guideList, countryList);

  console.log('guidesByCountry', guidesByCountry);

  return {
    props: {
      guidesByCountry: guidesByCountry,
      posts: guideList,
    },
    revalidate: 10,
  };
};

const Index = ({ guidesByCountry }: IndexProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700  px-4 sm:px-8 lg:px-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          旅行攻略
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          I primarily cover web development and tech topics, occasionally
          sharing insights into my personal life.
        </p>
        <div className="relative max-w-lg">
          <label>
            <span className="sr-only">搜索相关攻略</span>
            <input
              aria-label="搜索相关攻略"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索相关攻略"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
          </label>
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {guidesByCountry.map(
        (item: Country) =>
          !!item.guides.length && (
            <div key={item.id} className="w-full pt-8 pb-8">
              <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                {item.icon}
                {item.name}
              </h3>
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-none">
                {item.guides.map((post: Post) => (
                  <GuideCard post={post} key={post.id} />
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default Index;
