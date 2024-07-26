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
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  menuList: MenuItem[];
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      (window as any).gtag('config', 'G-RDJEQXSM3X', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <meta
        name="google-adsense-account"
        content="ca-pub-9533100025276131"
      ></meta>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-RDJEQXSM3X`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RDJEQXSM3X');
        `,
          }}
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9533100025276131"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9533100025276131"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <ThemeProvider
        defaultTheme="system"
        enableSystem={true}
        attribute="class"
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};
// MyApp.getInitialProps = async () => {
//   const data = await API.getCountryList();
//   // const appProps = await App.getInitialProps(appContext);

//   return { countryList: data };
// };

export default MyApp;
