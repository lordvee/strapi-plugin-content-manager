import styled from 'styled-components';

const StyledBackHeader = styled.div`

  height: 6rem;
  width: 6.5rem;
  margin-right: 2em;
  line-height: 6rem;
  text-align: center;
  background-color: #ffffff;
  color: #81848a;
  border-top: 1px solid #f3f4f4;
  border-right: 1px solid #f3f4f4;
  border-left: 1px solid #f3f4f4;
  cursor: pointer;
  &:before {
    content: '\f053';
    font-family: 'FontAwesome';
    font-size: 1.8rem;
    font-weight: bolder;
  }
  &:hover {
    background-color: #f3f4f4;
  }
`;

export default StyledBackHeader;