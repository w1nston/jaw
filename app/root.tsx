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

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'JAW',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: headerStylesUrl },
];

function Header() {
  return (
    <header>
      <nav className="linksContainer">
        <Link to="/">Where?</Link>
        <Link to="/thoughts">Thoughts</Link>
      </nav>
    </header>
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
