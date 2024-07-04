import { FC } from 'react';

// import { NavBarData } from '../public/utils/config';
import SiteConfig from '../site.config';
import Header from './Header';
import Footer from './Footer';
// import { useEffect, useState } from 'react';

// import * as API from '@/lib/api/guide';
interface LayoutProps {
  children: React.ReactNode;
  countryList?: any;
}

const Layout: FC<LayoutProps> = ({ children, countryList }: LayoutProps) => {
  // const menuList = NavBarData;
  // const [countryList, setCountryList] = useState([]);

  // const fetchCountryList = async () => {
  //   const data = await API.getCountryList();
  //   setCountryList(data);
  // };

  // useEffect(() => {
  //   fetchCountryList();
  // }, []);

  return (
    <div className="w-full flex relative flex-col bg-white dark:bg-zinc-800">
      <div className="xl:px-80 lg:px-40 md:px-10 lg:max-w-full sm:p-4">
        {!!SiteConfig.navigationLinks.length && (
          <Header navigationLinks={SiteConfig.navigationLinks} />
        )}
        <main className="mb-auto mt-10">{children}</main>
      </div>
      <Footer
        navigationLinks={SiteConfig.navigationLinks}
        countryList={countryList}
      ></Footer>
    </div>
  );
};

export default Layout;
