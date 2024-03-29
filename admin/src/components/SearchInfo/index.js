import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const FilterIcon = ({ fill, height, width, ...rest }) => {
    return (
      <svg {...rest} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <g stroke={fill} fill="none" fillRule="evenodd" strokeLinecap="round">
          <path d="M3.5 6.5h2M2.5 4.5h4M1.5 2.5h6M.5.5h8" />
        </g>
      </svg>
    );
  };
  
  FilterIcon.defaultProps = {
    fill: '#007EFF',
    height: '7',
    width: '9',
  };
  
  FilterIcon.propTypes = {
    fill: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

const SearchInfos = ({ label }) => {
  return (
    <Wrapper>
      <FilterIcon />
      {label}
    </Wrapper>
  );
};

SearchInfos.defaultProps = {
  label: null,
};

SearchInfos.propTypes = {
  label: PropTypes.string,
};

export default SearchInfos;