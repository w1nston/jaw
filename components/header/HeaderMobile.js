import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Router from 'next/router';
import { css, cx } from 'react-emotion';
import Logo from './Logo';
import HamburgerIcon from './HamburgerIcon';
import MenuLink from './MenuLink';

const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

const headerStyle = css`
  border-bottom: 0.05rem solid #888;
  display: flex;
  justify-content: space-between;
`;

const hamburgerStyle = css`
  align-self: center;
`;

const logoStyle = css`
  align-self: center;
`;

const navStyle = css`
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 3.75rem;

  &.open {
    background: hsla(360, 100%, 100%, 1);
    height: 100vh;
    z-index: 1;
  }
`;

const linkStyle = css`
  padding: 1rem 1.5rem;
  text-decoration: none;
`;

class Header extends Component {
  state = { menuIsOpen: false };

  handleToggleMenu = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }));
  };

  closeMenu = () => {
    this.setState({ menuIsOpen: false });
  };

  render() {
    const { menuIsOpen } = this.state;

    return (
      <section className={headerContainerStyle}>
        <header className={headerStyle}>
          <HamburgerIcon
            active={menuIsOpen}
            className={hamburgerStyle}
            onClick={this.handleToggleMenu}
          />
          <Logo className={logoStyle} />
        </header>
        <nav className={cx(navStyle, menuIsOpen ? 'open' : '')}>
          <MenuLink className={linkStyle} href="/" onClick={this.closeMenu}>
            Home
          </MenuLink>
          <MenuLink className={linkStyle} href="/blog" onClick={this.closeMenu}>
            Blog
          </MenuLink>
          <MenuLink
            className={linkStyle}
            href="/projects"
            onClick={this.closeMenu}
          >
            Projects
          </MenuLink>
        </nav>
      </section>
    );
  }
}

export default Header;
