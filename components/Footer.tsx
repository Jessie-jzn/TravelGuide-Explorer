'use client';
import React from 'react';
import Link from 'next/link';
import { MenuItem, Country } from '@/lib/type';
interface MenuProps {
  navigationLinks: MenuItem[];
  countryList?: Country[];
}

const Footer = ({ navigationLinks, countryList = [] }: MenuProps) => {
  return (
    <div className="box-border flex flex-col items-center p-16 xl:px-80 lg:px-40 md:px-10 w-fullbg-[#F6F6F7] border-t border-[#E8E8EA] dark:border-zinc-900 dark:bg-zinc-800">
      <div className="flex flex-wrap justify-between w-full pb-8">
        <div className="flex flex-col max-w-xs">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            关于
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            我的足迹遍布中国每一个省份，以及日本、泰国、马来西亚等国。我热衷探索各地的文化、历史和美食，并与大家分享实用的旅行攻略和有趣的故事。旅行不仅是探索未知，更是发现自我。期待与你们一起开启新的冒险之旅！
          </p>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            <strong>Email :</strong> znjessie858@gmail.com
          </p>
          {/* <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong>Phone :</strong> 880 123 456 789
          </p> */}
        </div>
        <div className="flex flex-col sm:mt-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            导航
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {navigationLinks?.map((item: MenuItem) => (
              <Link href={item.url} key={item.id}>
                <li className="relative block py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:mt-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            分类
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {countryList.map((country) => (
              <li key={country.id}>{country.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:mt-8 md:mt-8 lg:mt-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            订阅
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            订阅我的文章，收到我的最新发布通知，可随时取消订阅
          </p>
          <form className="rounded-2xl" action="/thank-you">
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
        </div>
      </div>
      <div className="w-full pt-8 sm:pt-4 sm:pb-4 border-t pb-16 dark:border-zinc-900 border-[#E8E8EA] dark:bg-zinc-800">
        <div className="text-sm text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()}, Built with Jessie &#128293;{' '}
        </div>
      </div>
    </div>
  );
};

export default Footer;
