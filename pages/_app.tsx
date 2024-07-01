import { ThemeProvider } from 'next-themes';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import 'tailwindcss/tailwind.css';
import '../build.css';
import '../styles/main.css';
import '../styles/globals.css';

import Layout from '@/components/Layout';
import { MenuItem } from '@/lib/type';
import { useEffect, useState } from 'react';

import * as API from '@/lib/api/guide';
interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  menuList: MenuItem[];
  // countryList?: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const [countryList, setCountryList] = useState([]);

  const fetchCountryList = async () => {
    const data = await API.getCountryList();
    setCountryList(data);
  };

  useEffect(() => {
    fetchCountryList();
  }, []);
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Layout countryList={countryList}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};
// MyApp.getInitialProps = async () => {
//   const data = await API.getCountryList();

//   return { countryList: data };
// };

export default MyApp;
