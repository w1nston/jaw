import React, { Component } from 'react';
import { css, cx } from 'react-emotion';

const lineOneStyle = css`
  top: 0;
`;

const lineTwoStyle = css`
  top: 50%;
`;

const lineThreeStyle = css`
  top: 100%;
`;

const hamburgerStyle = css`
  appearance: none;
  background: none;
  border: none;
  display: block;
  height: 22px;
  position: relative;
  text-decoration: none;
  width: 32px;

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }

  &:hover {
    .${lineOneStyle} {
      transform: translateY(-4px);
    }

    .${lineThreeStyle} {
      transform: translateY(4px);
    }
  }

  &.isActive {
    .${lineOneStyle} {
      transform: translateY(10px) translateX(0) rotate(45deg);
    }

    .${lineTwoStyle} {
      opacity: 0;
    }

    .${lineThreeStyle} {
      transform: translateY(-10px) translateX(0) rotate(-45deg);
    }
  }
`;

const lineStyle = css`
  background-color: #333;
  border-radius: 0.2rem;
  display: block;
  height: 0.05rem;
  left: 0;
  position: absolute;
  transition: all 0.4s;
  width: 2.3rem;
`;

const toggleActive = state => ({ active: !state.active });

class HamburgerIcon extends Component {
  state = { active: false };

  handleClick = () => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      this.setState(toggleActive, onClick);
    } else {
      this.setState(toggleActive);
    }
  };

  render() {
    const { active } = this.state;
    const { className } = this.props;

    return (
      <button
        className={cx(hamburgerStyle, className, active ? 'isActive' : null)}
        onClick={this.handleClick}
      >
        <i className={`${lineStyle} ${lineOneStyle}`} />
        <i className={`${lineStyle} ${lineTwoStyle}`} />
        <i className={`${lineStyle} ${lineThreeStyle}`} />
      </button>
    );
  }
}

export default HamburgerIcon;
