import React, { useState } from "react";
import { css, cx } from "react-emotion";
import Logo from "./Logo";
import HamburgerIcon from "./HamburgerIcon";
import MenuLink from "./MenuLink";

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

  &.close {
    background: hsla(360, 100%, 100%, 1);
    height: 0;
    transition-property: height;
    transition-duration: 0.5s;
    z-index: 1;
  }

  &.open {
    background: hsla(360, 100%, 100%, 1);
    height: 100vh;
    transition-property: height;
    transition-duration: 0.8s;
    z-index: 1;
  }
`;

const linkStyle = css`
  padding: 1rem 1.5rem;
  text-decoration: none;
`;

const HeaderMobile = props => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuHasBeenOpened, setMenuHasBeenOpened] = useState(false);

  const handleToggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
    if (!menuHasBeenOpened) {
      setMenuHasBeenOpened(true);
    }
  };

  const closeMenu = () => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    }
  };

  return (
    <section className={headerContainerStyle}>
      <header className={headerStyle}>
        <HamburgerIcon
          active={menuIsOpen}
          className={hamburgerStyle}
          onClick={handleToggleMenu}
        />
        <Logo className={logoStyle} />
      </header>
      <nav
        className={cx(
          navStyle,
          menuIsOpen ? "open" : menuHasBeenOpened ? "close" : ""
        )}
      >
        <MenuLink className={linkStyle} href="/" onClick={closeMenu}>
          Home
        </MenuLink>
        <MenuLink className={linkStyle} href="/projects" onClick={closeMenu}>
          Projects
        </MenuLink>
      </nav>
    </section>
  );
};

export default HeaderMobile;
