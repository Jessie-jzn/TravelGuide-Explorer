import { FC } from 'react';
import Link from 'next/link';

import { MenuItem } from '../lib/type';
import { NavBarData } from '../public/utils/config';
import Header from './Header';
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
      <div className="inset-0 items-center flex flex-col sm:px-4 md:px-10 lg:px-20 bg-white dark:bg-zinc-800">
        <div className="flex flex-col w-full bg-white dark:bg-zinc-800">
          {!!menuList.length && <Header menuList={menuList} />}
          <main>{children}</main>
          <Footer menuList={menuList}></Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

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
