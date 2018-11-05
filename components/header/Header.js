import React from 'react';
import { useWindowSize } from '../../hooks/windowHooks';
import { MOBILE, TABLET } from '../../utils/constants';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import HeaderTablet from './HeaderTablet';

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
