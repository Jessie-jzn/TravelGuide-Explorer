import { FC } from 'react';

import { NavBarData } from '../public/utils/config';
import Header from './Header';
import Footer from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const menuList = NavBarData;

  return (
    <div className="w-full flex relative flex-col bg-white dark:bg-zinc-800">
      <div className="xl:px-80 lg:px-40 md:px-10 lg:max-w-full sm:p-4">
        {!!menuList.length && <Header menuList={menuList} />}
        <main className="mb-auto mt-10">{children}</main>
      </div>
      <Footer menuList={menuList}></Footer>
    </div>
  );
};

export default Layout;
