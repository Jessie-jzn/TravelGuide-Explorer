import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import { useRouter } from 'next/router';
import { MenuItem } from '../lib/type';
import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

interface MenuProps {
  menuList: MenuItem[];
}
const isActivePath = (path: string, uri: string): boolean => {
  if (uri === '/') {
    return path === '/';
  } else {
    return path.startsWith(uri);
  }
};
const Header = ({ menuList }: MenuProps) => {
  const { pathname } = useRouter();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const handleClickMenuItem = (uri: string) => {
    setVisible(false);
    router.push(uri);
  };

  return (
    <div className="flex justify-between items-center mt-8 w-full">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
          <Link href="/">
            <Image
              alt="avatars"
              src="https://avatars.githubusercontent.com/u/18711470?v=4"
              className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="ml-2 sm:hidden">Jessie的旅行日记</div>
      </div>
      <div className="flex max-w-2xl lg:max-w-5xl">
        <div className="pointer-events-auto sm:hidden block px-10">
          <div className="flex rounded-full bg-white px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
            {menuList.map((item) => {
              const isActive = isActivePath(pathname, item.uri);
              return (
                <Link href={item.uri} key={item.id}>
                  <div
                    className={`relative px-3 py-2 transition ${isActive ? 'text-teal-500 dark:text-teal-400' : 'hover:text-teal-500 dark:hover:text-teal-400'}`}
                  >
                    {item.title}
                    {isActive && (
                      <span
                        className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
                        data-relingo-parsed="true"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="pointer-events-auto hidden sm:block">
          <button
            className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
            type="button"
            onClick={() => setVisible(true)}
          >
            菜单
            <svg
              viewBox="0 0 8 6"
              aria-hidden="true"
              className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
            >
              <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none"></path>
            </svg>
          </button>
          <div
            className={`${visible ? 'visible' : 'hidden'} fixed inset-0 z-201 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80 opacity-100 `}
          ></div>
          <div
            className={`${visible ? 'visible' : 'hidden'} fixed inset-x-4 top-8 z-201 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 opacity-100 scale-100`}
            data-relingo-parsed="true"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <button
                aria-label="Close menu"
                className="-m-1 p-1"
                type="button"
                onClick={() => setVisible(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                >
                  <path
                    d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                    fill="none"
                    stroke="currentColor"
                  ></path>
                </svg>
              </button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                导航
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {menuList.map((item) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => handleClickMenuItem(item.uri)}
                    >
                      <div className="block py-2">{item.title}</div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex space-x-4">
          <ThemeSwitch />
        </div>
        <div className="flex space-x-4">
          <Analytics />
        </div>
      </div>
    </div>
  );
};
export default Header;
