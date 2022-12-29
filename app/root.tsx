import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import headerStylesUrl from '~/styles/header.css';
import baselineStylesUrl from '~/styles/baseline.css';
import globalStylesUrl from '~/styles/global.css';
import Spacer from '~/components/spacer';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'JAW',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: baselineStylesUrl },
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: headerStylesUrl },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&display=swap',
  },
  { rel: 'me', href: 'https://hachyderm.io/@w1nston' },
];

// TODO: don't inline svg...
function Logo() {
  return (
    <svg
      viewBox="0 0 2834.65 2834.65"
      enableBackground="new 0 0 2834.65 2834.65"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-labelledby="logo-title"
      role="img"
      width="32"
      height="32"
      fill="currentColor"
    >
      <title id="logo-title">JAW Logo</title>
      <path
        fill="#0042FF"
        d="M1413.178,1014.603c174.841,0,316.566-141.726,316.566-316.567c0-174.831-141.725-316.557-316.566-316.557
	c-174.831,0-316.557,141.726-316.557,316.557C1096.621,872.876,1238.347,1014.603,1413.178,1014.603z"
      />
      <path
        fill="#0042FF"
        d="M1723.283,1167.308l-620.478,0.017c-3.301,0-6.185,3.124-6.185,6.501v496.035
	c0,3.594,2.914,6.504,6.501,6.521c171.79,3.152,310.088,143.389,310.088,315.924c0,172.48-137.371,315.525-309.302,315.525
	c-3.439,0-7.277,3.418-7.281,6.896l-0.006,124.922c0,3.586,2.938,6.49,6.519,6.516c58.275-0.047,149.728-1.346,255.271-36.527
	c270.924-88.27,371.389-353.109,371.389-639.254v-596.559C1729.801,1170.223,1726.885,1167.308,1723.283,1167.308z"
      />
    </svg>
  );
}

function Header() {
  return (
    <header className="header">
      <nav className="linksContainer">
        <Link className="logoLink" to="/" aria-label="Link to home">
          <Logo />
        </Link>
        <Spacer width="0.8rem" height="1px" />
        <Link to="/thoughts">Thoughts</Link>
        <Spacer width="0.8rem" height="1px" />
        <Link to="/notes">Notes</Link>
      </nav>
    </header>
  );
}

// TODO: Types
export function ErrorBoundary({ error }) {
  // TODO: proper logging, and collection of logging...
  console.error(error);

  return (
    <html>
      <head>
        <title>JAW</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main className="mainContainer">
          <div className="innerContainer">
            <p>Something went wrong!</p>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />

        <main className="mainContainer">
          <div className="innerContainer">
            <Outlet />
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
