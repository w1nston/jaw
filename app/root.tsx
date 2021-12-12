import { useEffect, useState, useRef } from 'react';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import throttle from 'lodash.throttle';
import type { LinksFunction } from 'remix';

import globalStylesUrl from '~/styles/global.css';
import darkStylesUrl from '~/styles/dark.css';

export let links: LinksFunction = () => {
  return [
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
    { rel: 'stylesheet', href: globalStylesUrl },
    {
      rel: 'stylesheet',
      href: darkStylesUrl,
      media: '(prefers-color-scheme: dark)',
    },
    { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico?v1' },
  ];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  let headerRef = useRef<HTMLElement | null>(null);
  let layoutContentRef = useRef<HTMLDivElement | null>(null);
  let [showHeaderShadow, setShowHeaderShadow] = useState<boolean>(false);

  useEffect(() => {
    function handleScrollEvent() {
      if (headerRef.current && layoutContentRef.current) {
        let header = headerRef.current.getBoundingClientRect();
        let layoutContent = layoutContentRef.current.getBoundingClientRect();

        console.log({
          offsetTop: layoutContentRef.current.offsetTop,
          top: layoutContent.top,
        });

        if (header.bottom >= layoutContent.top && !showHeaderShadow) {
          setShowHeaderShadow(true);
        } else if (header.bottom < layoutContent.top && showHeaderShadow) {
          setShowHeaderShadow(false);
        }
      }
    }

    let throttledScrollEventHandler = throttle(handleScrollEvent, 90);

    window.addEventListener('scroll', throttledScrollEventHandler);

    return () => {
      window.removeEventListener('scroll', throttledScrollEventHandler);
    };
  }, [showHeaderShadow]);

  return (
    <div>
      <header
        ref={headerRef}
        className={`navigation__header ${
          showHeaderShadow ? 'navigation__headerShadow' : ''
        }`}
      >
        <nav aria-label="Main navigation">
          <ul className="navigation__list">
            <li>
              <Link className="navigation__link" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="navigation__link" to="/now">
                Now
              </Link>
            </li>
            <li>
              <Link className="navigation__link" to="/posts">
                Blog
              </Link>
            </li>
            <li>
              <Link className="navigation__logoLink" to="/" title="JAW">
                <Logo />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div ref={layoutContentRef}>
        <div>{children}</div>
      </div>
    </div>
  );
}

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
