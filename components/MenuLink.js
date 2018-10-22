import React from 'react';
import { withRouter } from 'next/router';

const MenuLink = ({ children, className, href, onClick, router }) => {
  function handleClick(event) {
    event.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    }
    router.push(href);
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default withRouter(MenuLink);
