import { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';
// import Image from "next/image";

// import RSSIcon from '@assets/svg/rss.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
        <footer className="text-lg font-light">
          © {new Date().getFullYear()}, Built with Jessie
          <a href="https://nextjs.org/">Next.js</a>
          &#128293;
        </footer>
      </div>
    </div>
  );
};
export default Layout;

const Header = (): JSX.Element => {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = (checked: boolean): void => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme('dark');
    else setTheme('light');
  };

  const isRoot: boolean = pathname === '/';
  const isDarkMode: boolean = resolvedTheme === 'dark';

  return (
    <header
      className={clsx('flex items-center justify-between ', {
        'mb-8': isRoot,
        'mb-2': !isRoot,
      })}
    >
      <div className='header-wrap'>
        <Link href="/">
        <div className="w-[57px] h-[43px] text-right text-black text-xl font-medium font-['Heebo']">Works</div>
          {/* <div className='header-wrap-text'>Work</div> */}
        </Link>
        <Link href="/">
          Blog
        </Link>
        <Link href="/">
          Contact
        </Link>
      </div>
      <div className={'max-w-md'}>
        {isRoot ? <LargeTitle /> : <SmallTitle />}
      </div>
      {mounted && (
        <div className="flex space-x-4">
          <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} />
          <Link href="/rss.xml" passHref>
              {/* <RSSIcon className={isDarkMode ? 'text-white' : 'text-black'} /> */}
          
          </Link>
        </div>
      )}
    </header>
  );
};

const LargeTitle = (): JSX.Element => (
  <h1>
    <Link href="/">
      <div
        className={clsx(
          'text-3xl font-black leading-none text-black no-underline font-display',
          'sm:text-5xl',
          'dark:text-white'
        )}
      >
       
      </div>
    </Link>
  </h1>
);

const SmallTitle = (): JSX.Element => (
  <h1>
    <Link href="/">
      <div
        className={clsx(
          'text-2xl font-black text-black no-underline font-display',
          'dark:text-white'
        )}
      >
        Next.Js Starter Blog
      </div>
    </Link>
  </h1>
);
