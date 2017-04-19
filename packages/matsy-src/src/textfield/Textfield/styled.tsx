import styled from 'styled-components';

import { input as t } from '../../theme';
import { alignment, width } from '../utils';

const TextfieldStyled = styled.div`
  box-sizing: border-box;
  display: inline-block;
  font-size: ${t.textFontSize};
  margin: 0;
  max-width: 100%;
  padding: ${t.textVerticalSpacing} 0;
  position: relative;
  width: 300px;

  ${alignment()}
  ${width()}
`;

// Align icon button
// .mdl-textfield--expandable .mdl-button--icon {
//   top: $input-text-expandable-icon-top;
// }

export default TextfieldStyled;
