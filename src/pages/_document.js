import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  let description = "SecureLink helps you protect your links online with custom settings and features.";
  let ogimage = "https://securelink.vercel.app/website.png";
  let sitename = "SecureLink";
  let title = "SecureLink - Link Shortener with Security Features";
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

        <meta name="description" content={description} />

        <meta property="og:site_name" content={sitename} />
        <meta property="og:image" content={ogimage} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogimage} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
