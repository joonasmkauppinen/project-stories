import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="application-name" content="Project Stories Demo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Project Stories Demo"
        />
        <meta
          name="description"
          content="Visual editor for Google Web Stories"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#292D2B" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
