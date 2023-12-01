import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { GlobalPagination, InputSelect, useGlobalContext } from 'strapi-helper-plugin';
import ExcelExport from 'export-xlsx';
import { FooterWrapper, SelectWrapper, Label } from './components';
import { Button } from '@buffetjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';


function Footer({ count, onChange, params, pageData, allData, displayedHeaders, allAllowedHeaders, name, contentType }) {
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

  const exportexcel = async (flag) => {
    let excelData = [], headersData = [], data = []
    if (flag) {
      data = allData
      for(let i in allAllowedHeaders) {
        let name = allAllowedHeaders[i]
        const { metadatas, attributes } = contentType;
        const metas = metadatas[name].list;
        const header = {
          name,
          fieldSchema: attributes[name],
          metadatas: metas,
          key: `__${name}_key__`,
        };
        headersData = [...headersData, header];
      }
    } else {
      data = pageData
      headersData = [...displayedHeaders]
    }
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        let obj = {}
        for (let j = 0; j < headersData.length; j++) {
          let key = ""
          if(headersData[j] && headersData[j].name) key = headersData[j].name

          if (typeof data[i][key] === 'object' && data[i][key]) {
            let subKey = ""
            if(headersData[j].metadatas && headersData[j].metadatas.mainField && headersData[j].metadatas.mainField.name) subKey = headersData[j].metadatas.mainField && headersData[j].metadatas.mainField.name

            if(subKey) {
              obj = {
                ...obj,
                [key] : (
                  (
                    data[i][key][subKey] && data[i][key][subKey] !== null && data[i][key][subKey] !== undefined && data[i][key][subKey] !== "undefined"
                  ) ?
                  data[i][key][subKey]:
                  (
                    data[i][key].count || data[i][key].count === 0 ? data[i][key].count : ""
                  )
                )
              }
            } else {
              obj[key] = ""
            }
          } else {
            //console.log( data[i][key], '---------------')
            obj[key] = data[i][key] !== null ? data[i][key]: ""
          }
        }
        excelData = [...excelData, obj]
      }

      if(excelData[0] && excelData[0].id) {
        excelData = excelData.sort((a, b) => a.id - b.id)
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
      <div className="col-2" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="primary" icon={<FontAwesomeIcon icon={faFileExcel} />} label="Export" onClick={() => exportexcel(false)} />
      </div>
      <div className="col-2" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="primary" icon={<FontAwesomeIcon icon={faFileExcel} />} label="Export All" onClick={() => exportexcel(true)} />
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
  displayedHeaders: PropTypes.array.isRequired,
};

export default memo(Footer);
