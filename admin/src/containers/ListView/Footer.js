import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { GlobalPagination, InputSelect, useGlobalContext } from 'strapi-helper-plugin';
import ExcelExport from 'export-xlsx';
import { FooterWrapper, SelectWrapper, Label } from './components';

function Footer({ count, onChange, params, data, displayedHeaders, allAllowedHeaders, name }) {
  const { emitEvent } = useGlobalContext();
  const _limit = parseInt(params.pageSize, 10);
  const _page = parseInt(params.page, 10);

  const handleChangePage = ({ target: { value } }) => {
    onChange({ page: value });
  };

  const handleChangeLimit = ({ target: { value } }) => {
    emitEvent('willChangeNumberOfEntriesPerPage');

    onChange({ pageSize: value });
  };

  const exportexcel = (flag) => {
    let excelData = [], headersData = [], start = 0, end = 10
    if (data && data.length) {
      if (flag) {
        headersData = allAllowedHeaders
        start = 0
        end = data.length
      } else {
        headersData = displayedHeaders
        start = _limit * (_page - 1)
        end = (start + _limit) > data.length ? data.length : (start + _limit)
      }

      for (let i = start; i < end; i++) {
        let obj = {}

        for (let j = 0; j < headersData.length; j++) {
          if (typeof data[i][headersData[j].name] === 'object') {
            obj[headersData[j].name] = data[i][headersData[j].name][headersData[j].metadatas.mainField.name]
          } else {
            obj[headersData[j].name] = data[i][headersData[j].name]
          }
        }
        excelData.push(obj)
      }

      const exportData = [{
          data: excelData
      }]

      let headerDefinition = []

      for(let i in excelData[0]) {
        let obj = {}
        obj.name = i
        obj.key = i
        headerDefinition.push(obj)
      }
      
      const SETTINGS_FOR_EXPORT = {
        fileName: name,
        workSheets: [
          {
            sheetName: name,
            startingRowNumber: 1,
            tableSettings: {
              data: {
                headerDefinition: headerDefinition
              }
            }
          }
        ]
      }
      const excelExport = new ExcelExport();
      excelExport.downloadExcel(SETTINGS_FOR_EXPORT, exportData);
    } else {
      return
    }
  }

  return (
    <FooterWrapper className="row">
      <div className="col-4">
        <SelectWrapper>
          <InputSelect
            style={{ width: '75px', height: '32px', marginTop: '-1px' }}
            name="_limit"
            onChange={handleChangeLimit}
            selectOptions={['10', '20', '50', '100']}
            value={_limit}
          />
          <Label htmlFor="_limit">
            <FormattedMessage id="components.PageFooter.select" />
          </Label>
        </SelectWrapper>
      </div>
      <div className="col-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button color="primary" className="sc-dkPtRN kjJQAt" style={{ marginRight: '3rem' }} onClick={() => exportexcel(false)}>Export</button>
        <button color="primary" className="sc-dkPtRN kjJQAt" onClick={() => exportexcel(true)}>Export All</button>
      </div>
      <div className="col-4">
        <GlobalPagination
          count={count}
          onChangeParams={handleChangePage}
          params={{
            currentPage: _page,
            _limit,
            _page,
          }}
        />
      </div>
    </FooterWrapper>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

export default memo(Footer);
