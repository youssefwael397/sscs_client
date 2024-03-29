import { Html, Head, Main, NextScript } from 'next/document';
// import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          //   integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />

        <link
          href={`https://fonts.googleapis.com/css?family=Tajawal&display=optional`}
          rel="stylesheet"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
