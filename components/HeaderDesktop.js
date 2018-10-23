import React from 'react';
import { css } from 'react-emotion';
import Link from 'next/link';
import Logo from './Logo';

const headerStyle = css`
  border-bottom: 1px solid #333;
  margin: 0 auto;
  width: 33rem;
`;

const navStyle = css`
  display: flex;
  justify-content: space-between;
`;

const linkStyle = css`
  align-self: center;
  text-decoration: none;

  .line {
    border-left: 1px solid #333;
    bottom: -18px;
    height: 0;
    left: 50%;
    position: absolute;
    transition: height 0.4s;
  }

  &:hover {
    .line {
      height: 20px;
      transition: height 0.4s;
    }
  }
`;

const logoStyle = css`
  align-self: center;
`;

const HeaderDesktop = () => (
  <header className={headerStyle}>
    <nav className={navStyle}>
      <Link href="/">
        <a className={linkStyle}>
          Home
          <i className="line" />
        </a>
      </Link>
      <Link href="/blog">
        <a className={linkStyle}>
          Blog
          <i className="line" />
        </a>
      </Link>
      <Link href="/projects">
        <a className={linkStyle}>
          Projects
          <i className="line" />
        </a>
      </Link>
      <Logo className={logoStyle} />
    </nav>
  </header>
);

export default HeaderDesktop;
