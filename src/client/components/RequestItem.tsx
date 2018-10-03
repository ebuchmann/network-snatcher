import * as React from 'react';
import styled from 'react-emotion';

interface Props {
  id: string;
  hostname: string;
  method: string;
  path: string;
  port: number;
  statusCode: number;
  setRequest: (id: string) => void;
}

export class RequestItem extends React.Component<Props, null> {
  render() {
    const { id, hostname, method, path, statusCode } = this.props;

    return (
      <Item onClick={() => this.props.setRequest(id)}>
        <Method>{method}</Method>
        <Path>
          {hostname}
          {path}
        </Path>
        <Code statusCode={statusCode}>{statusCode}</Code>
      </Item>
    );
  }
}

const Item = styled('div')`
  border-bottom: 1px solid #999;
  display: grid;
  grid-template-columns: 15% 75% 10%;
  cursor: pointer;
  padding: 10px 0;

  &:hover {
    background-color: rgba(120, 120, 120, 0.3);
  }
`;

const Method = styled('span')`
  text-transform: uppercase;
`;

const Path = styled('span')`
  word-wrap: break-word;
`;

const getColor = (code: number): string => {
  if (code < 300) return '#B8E986';
  if (code >= 300 && code < 400) return '#F5A623';
  return '#D0021B';
};

const Code = styled('span')<{ statusCode: number }>`
  ${({ statusCode }) => `
    color: ${getColor(statusCode)}
  `};
`;

export default RequestItem;
