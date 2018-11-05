import React from 'react';
import { useWindowSize } from '../../hooks/windowHooks';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import HeaderTablet from './HeaderTablet';

export const MOBILE = 767;
export const TABLET = 990;

const Header = () => {
  const { width } = useWindowSize();
  if (width > TABLET) {
    return <HeaderDesktop />;
  }

  if (width > MOBILE) {
    return <HeaderTablet />;
  }

  return <HeaderMobile />;
};

export default Header;
