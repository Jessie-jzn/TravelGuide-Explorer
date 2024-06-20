import { ThemeProvider } from 'next-themes';
import '../styles/main.css';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import 'tailwindcss/tailwind.css';
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

export default MyApp;
