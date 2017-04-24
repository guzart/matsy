import styled from 'styled-components';

import { card as t } from 'matsy/theme';

interface Props {
  border?: boolean,
  expand?: boolean,
}

const CardTitle = styled.div`
  align-items: center;
  border-bottom: ${(props: Props) => (props.border ? `1px solid ${t.borderColor}` : '0')};
  box-sizing: border-box;
  color: ${t.textColor};
  display: block;
  display: flex;
  line-height: normal;
  padding: ${t.verticalPadding} ${t.horizontalPadding};
  perspective-origin: ${t.titlePerspectiveOriginX} ${t.titlePerspectiveOriginY};
  transform-origin: ${t.titleTextTransformOriginX} ${t.titleTextTransformOriginY};
  ${(props: Props) => (props.expand ? 'flex-grow: 1;' : '')}
`;

export default CardTitle;
