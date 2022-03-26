/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { memo } from 'react';
import colors from './colors';

const PulseMarker = ({ color = 'orange', size = 50, text }) => {


  const pulseAnimation = keyframes`
 0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 ${colors[color] + '70'};
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 20px rgba(255, 82, 82, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
`;


  return (
    <div
      css={css`
      background: ${colors[color] + '90'};
      border: 4px solid ${colors[color]};
      box-shadow: 0 0 0 0 ${colors[color]};
      border-radius: 50%;
      height: ${size + 'px'};
      width: ${size + 'px'};
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      transform: scale(1);
      cursor: pointer;
      animation: ${pulseAnimation} 2s infinite;
    `}
    >
      {text}
    </div>

  )
}

export default memo(PulseMarker);