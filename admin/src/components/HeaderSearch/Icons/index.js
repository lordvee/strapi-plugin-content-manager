import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = ({ fill, height, width, ...rest }) => {
  return (
    <svg {...rest} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.875 13.446l-3.533-3.58a6.531 6.531 0 00.875-3.245C13.217 2.97 10.25 0 6.608 0 2.967 0 0 2.97 0 6.62s2.967 6.622 6.608 6.622c1.163 0 2.313-.321 3.338-.934l3.517 3.567a.422.422 0 00.608 0l1.804-1.825a.428.428 0 000-.604zM6.608 2.579a4.041 4.041 0 014.034 4.042 4.041 4.041 0 01-4.034 4.042A4.041 4.041 0 012.575 6.62a4.041 4.041 0 014.033-4.042z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};

SearchIcon.defaultProps = {
  fill: '#efefef',
  height: '16',
  width: '16',
};

SearchIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const ClearIcon = ({ fill, height, width, ...rest }) => {
    return (
      <svg {...rest} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.78 6.72L5.06 4l2.72-2.72a.748.748 0 0 0 0-1.06.748.748 0 0 0-1.06 0L4 2.94 1.28.22a.748.748 0 0 0-1.06 0 .748.748 0 0 0 0 1.06L2.94 4 .22 6.72a.748.748 0 0 0 0 1.06.748.748 0 0 0 1.06 0L4 5.06l2.72 2.72a.748.748 0 0 0 1.06 0 .752.752 0 0 0 0-1.06z"
          fill={fill}
          fillRule="evenodd"
        />
      </svg>
    );
  };
  
  ClearIcon.defaultProps = {
    fill: '#efefef',
    height: '8',
    width: '8',
  };
  
  ClearIcon.propTypes = {
    fill: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  export { SearchIcon, ClearIcon }