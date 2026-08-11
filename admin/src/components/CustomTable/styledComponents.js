import styled from 'styled-components';
import { themePropTypes } from 'strapi-helper-plugin';

const Table = styled.table`
  width: 100%;
  border-radius: 12px;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #e4eaf5;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  table-layout: fixed;
  margin-bottom: 0;

  tr,
  th,
  td {
    border: none;
    padding: 0;
    white-space: nowrap;
  }

  th,
  td {
    padding: 0 20px;

    label {
      display: inline;
    }
  }
`;

const TableEmpty = styled.tr`
  width: 100%;
  height: 132px;
  background: #fbfcff;

  td {
    height: 130px;
    line-height: 1.5;
    font-size: 1.3rem;
    font-weight: 500;
    color: #5c667a;
    text-align: center;
    border-collapse: collapse;
    border-top: 1px solid #eef2f7 !important;
  }
`;

const TableRow = styled.tr`
  height: 56px;
  background: #ffffff;
  transition: background 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    cursor: pointer;
    background: #f5f8ff;
    box-shadow: inset 3px 0 0 #007eff;
  }

  td {
    height: 55px;
    font-size: 1.3rem;
    line-height: 1.8rem;
    font-weight: 400;
    color: #2b3445;
    vertical-align: middle;
    border-collapse: collapse;
    border-top: 1px solid #eef2f7 !important;
  }
`;

const LoadingContainer = styled.div`
  display: block;
  margin: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.main.colors.white};
  border: 1px solid #e4eaf5;
  border-top: none;
  border-radius: 0 0 12px 12px;
`;

LoadingWrapper.propTypes = {
  ...themePropTypes,
};

export { LoadingContainer, LoadingWrapper, Table, TableEmpty, TableRow };
