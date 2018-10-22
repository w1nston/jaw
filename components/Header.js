import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Router from 'next/router';
import { css } from 'react-emotion';
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
  background: hsla(360, 100%, 100%, 1);
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  position: absolute;
  right: 0;
  top: 3.75rem;
`;

const linkStyle = css`
  padding: 1rem 1.5rem;
  text-decoration: none;
`;

// TODO: Logic to render different component on desktop.
class Header extends Component {
  state = { menuIsOpen: false };

  handleToggleMenu = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }));
  };

  closeMenu = () => {
    this.setState({ menuIsOpen: false });
  }

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
        {menuIsOpen
          ? createPortal(
              <nav className={navStyle}>
                <MenuLink className={linkStyle} href="/" onClick={this.closeMenu}>
                  Home
                </MenuLink>
                <MenuLink className={linkStyle} href="/blog" onClick={this.closeMenu}>
                  Blog
                </MenuLink>
                <MenuLink className={linkStyle} href="/projects" onClick={this.closeMenu}>
                  Projects
                </MenuLink>
              </nav>,
              document.getElementsByTagName('body')[0]
            )
          : null}
      </section>
    );
  }
}

export default Header;
