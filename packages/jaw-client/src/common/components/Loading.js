import React from 'react';
import { css, keyframes } from 'emotion';

const doubleBounceStyle = css`
  height: 3rem;
  margin: 3rem auto;
  position: relative;
  width: 3rem;
`;

const doubleBounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const doubleBounceChildStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${doubleBounce} 2s infinite ease-in-out;
`;

const doubleBounceTwoStyle = css`
  ${doubleBounceChildStyle}
  animation-delay: -1s;
`;

const Loading = () => (
  <div className={doubleBounceStyle}>
    <div className={doubleBounceChildStyle} />
    <div className={doubleBounceTwoStyle} />
  </div>
);

export default Loading;
