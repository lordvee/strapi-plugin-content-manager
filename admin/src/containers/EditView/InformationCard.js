import React, { useMemo } from 'react';
import { Padded, Text, Flex } from '@punch-in/buffet-modern-core';
import { get, isEmpty } from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { InjectionZone, useContentManagerEditViewDataManager } from 'strapi-helper-plugin';
import { SubWrapper, StatusWrapper } from './components';
import pluginId from '../../pluginId';
import { getTrad } from '../../utils';

const BaselineAlignment = styled.div`
  padding-top: ${({ size }) => size};
`;

const InformationCard = () => {
  const { initialData, hasDraftAndPublish, layout } = useContentManagerEditViewDataManager();
  const { formatMessage } = useIntl();

  const updatedAtName = useMemo(
    () => get(layout, ['options', 'timestamps'], ['created_at', 'updated_at'])[1],
    [layout]
  );

  const updatedBy = useMemo(() => {
    // get()'s default only kicks in for `undefined`, not `null` - admin accounts with no
    // first/last name set store literal `null` here, which used to render as "null null".
    const firstname = get(initialData, ['updated_by', 'firstname']);
    const lastname = get(initialData, ['updated_by', 'lastname']);
    const fullName = [firstname, lastname].filter(Boolean).join(' ');

    if (fullName) {
      return fullName;
    }

    const email = get(initialData, ['updated_by', 'email']);
    const username = get(initialData, ['updated_by', 'username']);

    return (
      email ||
      username ||
      formatMessage({ id: getTrad('containers.Edit.information.unknownUser') })
    );
  }, [initialData]);

  return (
    <>
      <SubWrapper>
        <BaselineAlignment size="3px" />
        <Padded top left right bottom size="smd">
          <Text fontWeight="bold">
            {formatMessage({
              id: getTrad('containers.Edit.information'),
            })}
          </Text>
          <Padded top size="smd">
            <BaselineAlignment size="2px" />
            <Flex justifyContent="space-between">
              <Text fontSize="xs" color="grey" textTransform="uppercase" fontWeight="semiBold">
                {formatMessage({
                  id: getTrad('containers.Edit.information.lastUpdate'),
                })}
              </Text>
              <Text lineHeight="12px">
                {isEmpty(initialData) ? '-' : moment(initialData[updatedAtName]).fromNow()}
              </Text>
            </Flex>
          </Padded>
          <Padded top size="smd">
            <BaselineAlignment size="3px" />
            <Flex justifyContent="space-between">
              <Text fontSize="xs" color="grey" textTransform="uppercase" fontWeight="semiBold">
                {formatMessage({
                  id: getTrad('containers.Edit.information.by'),
                })}
              </Text>
              <Text lineHeight="12px">{isEmpty(initialData) ? '-' : updatedBy}</Text>
            </Flex>
          </Padded>
        </Padded>
        <InjectionZone area={`${pluginId}.editView.informations`} />
      </SubWrapper>
      <Padded top size="sm" />
      {hasDraftAndPublish && (
        <StatusWrapper isGreen={initialData.published_at}>
          <Text fontSize="sm" lineHeight="18px">
            •
          </Text>
          <Padded left size="xs" />
          <Flex>
            <Text lineHeight="18px">
              {formatMessage({
                id: getTrad('containers.Edit.information.editing'),
              })}
            </Text>
            &nbsp;
            <Text lineHeight="18px" fontWeight="bold">
              {formatMessage({
                id: getTrad(
                  initialData.published_at
                    ? 'containers.Edit.information.publishedVersion'
                    : 'containers.Edit.information.draftVersion'
                ),
              })}
            </Text>
          </Flex>
        </StatusWrapper>
      )}
      <BaselineAlignment size="2px" />
    </>
  );
};

export default InformationCard;
