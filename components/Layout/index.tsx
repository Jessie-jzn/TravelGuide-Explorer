import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';
import { MenuItem } from '../../lib/type';
import { NavBarData } from '../../public/utils/config';
// import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
// import { getAllMenu } from '../../lib/api';
import getMenuList from '@/lib/notion/getMenuList';
interface LayoutProps {
  children: React.ReactNode;
  menuList: MenuItem[];
}
interface MenuProps {
  menuList: MenuItem[];
}

const Layout: FC<LayoutProps> = ({ menuList, children }: LayoutProps) => {
  // const [menuList, setMenuList] = useState<MenuItem[]>([]);
  // const { t } = useTranslation('common');

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     // const menuData = await getAllMenu();
  //     const menuData = NavBarData;
  //     setMenuList(menuData);
  //   };
  //   fetchMenu();
  // }, []);

  return (
    <div className="w-full">
      <div className="inset-0 items-center flex flex-col sm:px-8 bg-zinc-50">
        <div className="flex flex-col w-full max-w-7xl px-10 bg-white">
          {!!menuList.length && <Header menuList={menuList} />}
          <main>{children}</main>
          <Footer menuList={menuList}></Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

const Header: FC<MenuProps> = ({ menuList }: MenuProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  // const { t } = useTranslation('common');

  const toggleDarkMode = (checked: boolean): void => {
    const theme = checked ? 'dark' : 'light';
    setTheme(theme);
  };

  return (
    <div className="flex justify-center items-center mt-16 mx-auto w-full max-w-7xl">
      <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
        <a href="/">
          <img
            src="https://avatars.githubusercontent.com/u/18711470?v=4"
            className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
          />
        </a>
      </div>
      <div className="pointer-events-auto md:block ml-10 mr-10">
        <div className="flex rounded-full bg-white px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          {menuList.map((item) => (
            <Link href={item.uri} key={item.id}>
              <div className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <DarkModeSwitch
          checked={resolvedTheme === 'dark'}
          onChange={toggleDarkMode}
        />
      </div>
    </div>
  );
};

const Footer: FC<MenuProps> = ({ menuList }: MenuProps) => {
  return (
    <footer className="mt-32 flex-none">
      <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {menuList?.map((item: MenuItem) => (
              <Link href={item.uri} key={item.id}>
                <div className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()}, Built with Jessie &#128293;
          </div>
        </div>
      </div>
    </footer>
  );
};
