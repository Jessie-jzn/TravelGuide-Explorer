import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';
import { MenuItem } from '../lib/type';
import { NavBarData } from '../public/utils/config';
import { useRouter } from 'next/router';
interface LayoutProps {
  children: React.ReactNode;
}
interface MenuProps {
  menuList: MenuItem[];
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const menuList = NavBarData;

  return (
    <div className="w-full">
      <div className="inset-0 items-center flex flex-col sm:px-8 bg-zinc-50 dark:bg-zinc-800">
        <div className="flex flex-col w-full max-w-7xl px-10 bg-white dark:bg-zinc-800">
          {!!menuList.length && <Header menuList={menuList} />}
          <main>{children}</main>
          <Footer menuList={menuList}></Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

const isActivePath = (path: string, uri: string): boolean => {
  if (uri === '/') {
    return path === '/';
  } else {
    return path.startsWith(uri);
  }
};

const Header: FC<MenuProps> = ({ menuList }: MenuProps) => {
  const { pathname } = useRouter();

  return (
    <div className="flex justify-center items-center mt-16 mx-auto w-full max-w-7xl">
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
      <div className="pointer-events-auto md:block ml-10 mr-10">
        <div className="flex rounded-full bg-white px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          {menuList.map((item) => {
            const isActive = isActivePath(pathname, item.uri) ;
            return (
              <Link href={item.uri} key={item.id}>
                <div
                  className={`relative block px-3 py-2 transition ${isActive ? 'text-teal-500 dark:text-teal-400' : 'hover:text-teal-500 dark:hover:text-teal-400'}`}
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
      <div className="flex space-x-4">
        <ThemeSwitch />
      </div>
    </div>
  );
};

const Footer: FC<MenuProps> = ({ menuList }: MenuProps) => {
  return (
    <div className="mt-32 flex-none">
      <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {menuList?.map((item: MenuItem) => (
              <Link href={item.uri} key={item.id}>
                <div className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()}, Built with Jessie &#128293;
          </div>
        </div>
      </div>
    </div>
  );
};
