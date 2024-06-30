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
// import { GetStaticProps } from 'next';
// import * as API from '@/lib/api/guide';
interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  menuList: MenuItem[];
  countryList?: any;
}
// export const getStaticProps: GetStaticProps = async () => {
//   const data = await API.getCountryList();

//   console.log('app中执行', data);

//   return {
//     props: {
//       countryList: data,
//     },
//     revalidate: 10,
//   };
// };
const MyApp = ({ Component, pageProps, countryList }: MyAppProps) => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Layout countryList={countryList}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
