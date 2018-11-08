import React from 'react';
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";

export default class JAWDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Sans|Montserrat"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/static/favicon.png"></link>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <title>Jonas Amsen-Wallander</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
