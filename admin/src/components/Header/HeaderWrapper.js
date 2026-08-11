/**
 *
 * Header
 *
 */

import styled from 'styled-components';

const HeaderWrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  height: 50px;
  .justify-content-end {
    display: flex;
  }
  .header-title p {
    width: 100%;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.3rem;
    line-height: normal;
    color: #787e8f;
  }
  .sticky {
    position: fixed;
    top: 0px;
    left: 67.6rem;
    z-index: 1050;
    width: calc(-67.6rem + 100vw);
    padding-right: 15px;
    height: 60px;
    display: flex;
    background-color: #d0edff;
    color: #002b7d;
    .row {
      width: 100%;
      margin: auto;
      margin-top: 16px;
      .header-title p {
        display: none;
      }
      > div > div {
        padding-top: 0;
        h1 {
          font-size: 2rem;
          svg {
            margin-top: 8px;
          }
        }
        button {
          margin-top: auto;
          margin-bottom: auto;
        }
      }
    }
  }
`;

export default HeaderWrapper;