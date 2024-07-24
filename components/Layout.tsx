import { FC } from 'react';
import SiteConfig from '../site.config';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="w-full flex relative flex-col bg-white dark:bg-zinc-800">
      <div className="xl:px-80 lg:px-40 md:px-10 lg:max-w-full sm:p-4">
        {!!SiteConfig.navigationLinks.length && (
          <Header navigationLinks={SiteConfig.navigationLinks} />
        )}
        <main className="mb-auto mt-10">{children}</main>
      </div>
      <Footer navigationLinks={SiteConfig.navigationLinks}></Footer>
    </div>
  );
};

export default Layout;
