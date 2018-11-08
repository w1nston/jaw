import React from "react";
import { css } from "react-emotion";
import Link from "next/link";
import Logo from "./Logo";

const headerStyle = css`
  border-bottom: 0.05rem solid #333;
  margin: 0 auto;
  max-width: 60rem;
`;

const navStyle = css`
  display: flex;
  justify-content: space-around;
`;

const linkStyle = css`
  align-self: center;
  text-decoration: none;

  .line {
    border-left: 0.05rem solid #333;
    bottom: -0.9rem;
    height: 0;
    left: 50%;
    position: absolute;
    transition: height 0.4s;
  }

  &:hover {
    .line {
      height: 1rem;
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
