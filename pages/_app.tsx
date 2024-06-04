import { ThemeProvider } from 'next-themes';
import '../styles/main.css';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import Layout from '@/components/Layout/index';
// import App, { AppContext } from 'next/app';
import getMenuList from '@/lib/notion/getMenuList';
import { MenuItem } from '@/lib/type';
import { useEffect, useState } from 'react';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  menuList: MenuItem[];
}
const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const initMenu = async () => {
    const list: MenuItem[] = await getMenuList();
    setMenuList(list);
  };

  useEffect(() => {
    initMenu();
  }, []);
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Layout menuList={menuList}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const notionAPI = new NotionAPI();

//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps, menuList };
// };

export default MyApp;
