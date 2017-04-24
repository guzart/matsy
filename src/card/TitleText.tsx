import styled from 'styled-components';

import Heading from 'matsy/typography/Heading';
import { card as t } from 'matsy/theme';

const CardTitleText = styled(Heading)`
  align-self: flex-end;
  color: inherit;
  display: block;
  display: flex;
  font-size: ${t.titleFontSize};
  font-weight: ${t.titleTextFontWeight};
  line-height: normal;
  margin: 0;
  overflow: hidden;
  transform-origin: ${t.titleTextTransformOriginX} ${t.titleTextTransformOriginY};
`;

export default CardTitleText;
