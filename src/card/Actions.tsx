import styled from 'styled-components';

import t from './theme';

export interface Props {
  border?: boolean,
}

const CardActions = styled.div`
  background-color: rgba(0, 0, 0, 0);
  border-top: ${(props: Props) => (props.border ? `1px solid ${t.borderColor}` : '0')};
  box-sizing: border-box;
  font-size: ${t.actionsFontSize};
  line-height: normal;
  padding: 8px;
  width: 100%;
`;

export default CardActions;
