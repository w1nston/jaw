import React from 'react';
import Responsive, { MOBILE, TABLET } from './Responsive';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import HeaderTablet from './HeaderTablet';

// TODO: When rendering from server it flashes with mobile header...
const Header = () => (
  <Responsive>
    {width => {
      if (width > TABLET) {
        return <HeaderDesktop />;
      }
  
      if (width > MOBILE) {
        return <HeaderTablet />;
      }
  
      return <HeaderMobile />;
    }}
  </Responsive>
)

export default Header;
