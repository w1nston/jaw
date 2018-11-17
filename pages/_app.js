import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { hydrate, injectGlobal } from 'react-emotion';
import Page from '../layouts/page';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

injectGlobal`
body {
  font-family: 'Fira Sans', sans-serif;
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
  font-size: 20px;
}

h1,
h2,
h3,
h4 {
  font-family: 'Montserrat', sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  position: relative;
}
  `;

class JAWApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Jonas Amsen-Wallander</title>
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default JAWApp;
