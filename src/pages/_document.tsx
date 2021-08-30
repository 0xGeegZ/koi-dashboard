import Document, { Head, Main, NextScript, Html } from 'next/document';


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/hyperplan@latest/dist/hyperplan.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@100;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {/* Step 5: Output the styles in the head  */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
