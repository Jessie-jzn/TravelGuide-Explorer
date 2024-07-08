import { ThemeProvider } from 'next-themes';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import 'tailwindcss/tailwind.css';
import '../build.css';
import '../styles/main.css';
import '../styles/globals.css';
import '../styles/notion.css';

// import * as API from '@/lib/api/guide';
import Layout from '@/components/Layout';
import { MenuItem } from '@/lib/type';
interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  menuList: MenuItem[];
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};
// MyApp.getInitialProps = async () => {
//   const data = await API.getCountryList();
//   // const appProps = await App.getInitialProps(appContext);

//   return { countryList: data };
// };

export default MyApp;
