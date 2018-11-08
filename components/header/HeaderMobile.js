import React, { useState } from "react";
import { css, cx, keyframes } from "react-emotion";
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

const openMenuKeyframes = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100vh;
  }
`;

const closeMenuKeyframes = keyframes`
  0% {
    height: 100vh;
  }
  100% {
    heigth: 0;
  }
`;

const navStyle = css`
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 3.75rem;

  &.close {
    animation-duration: 1s;
    animation-name: ${closeMenuKeyframes};
    animation-timing-function: ease-out;
    z-index: 1;
  }

  &.open {
    animation-duration: 1s;
    animation-name: ${openMenuKeyframes};
    animation-timing-function: ease-in;
    background: hsla(360, 100%, 100%, 1);
    height: 100vh;
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
