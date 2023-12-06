import { ThemeProvider } from "next-themes";
// import "@assets/css/main.css";
// import "typeface-open-sans";
// import "typeface-merriweather";

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

export default function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
