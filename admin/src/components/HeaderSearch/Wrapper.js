import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 240px;
  display: flex;
  align-items: center;
  overflow: hidden;
  min-width: 44rem;
  height: 6rem;
  padding-right: 20px;
  background-color: #198bff;
  z-index: 1050;
  color: #1f8eff;
  line-height: 6rem;
  letter-spacing: 0;

  > div:first-child {
    height: 100%;

    margin-right: 10px;
    > svg {
      color: #b3b5b9;
      vertical-align: middle;
    }
  }

  input {
    position: relative;
    width: 100%;
    color: #fff
    outline: 0;
    &:focus {
        outline: none;
        background-color: #007eff !important;
    }
    &::placeholder {
      color: #efefef !important;
      font-size: 13px !important;
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex: 2;
  }
`;

export default Wrapper;