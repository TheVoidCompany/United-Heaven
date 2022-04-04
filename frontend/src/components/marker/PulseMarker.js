/** @jsxImportSource @emotion/react */
import { Box } from '@chakra-ui/react';
import { css, keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import colors from './colors.constant';

const PulseMarker = ({ color = 'green', size = 50, text, markerValue, setHoveredMarker, selectedMarker, setSelectedMarker }) => {


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
    <Box
      css={css`
      border: 4px solid ${colors[color]};
      box-shadow: 0 0 0 0 ${colors[color]};
      border-radius: 50%;
      font-weight: bold;
      transform: scale(1);
      animation: ${selectedMarker !== null ? selectedMarker === markerValue ? pulseAnimation : 'none' : pulseAnimation} 2s infinite;
    `}
      w={(selectedMarker === markerValue ? size + 20 : size) + "px"}
      h={(selectedMarker === markerValue ? size + 20 : size) + "px"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={colors[color] + '90'}
      fontSize={(selectedMarker === markerValue) && 18 + "px"}
      cursor="pointer"
      _hover={{
        width: size + 20 + 'px',
        height: size + 20 + 'px',
        fontSize: 18 + 'px',
      }}
      onMouseEnter={() => setHoveredMarker(markerValue)}
      onMouseLeave={() => setHoveredMarker(null)}
      onClick={() => setSelectedMarker(markerValue)}
    >
      {text}
    </Box>

  )
}

PulseMarker.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  markerValue: PropTypes.any,
  setHoveredMarker: PropTypes.func
}

export default memo(PulseMarker);