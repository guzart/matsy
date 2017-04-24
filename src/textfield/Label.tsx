import styled from 'styled-components';

import { materialAnimationDefault } from 'matsy/mixins';
import { input as t } from 'matsy/theme';
import { isLabelDirty, isLabelFocused } from './utils';

const TextfieldLabel = styled.label`
  bottom: 0;
  color: ${t.textLabelColor};
  display: block;
  font-size: ${t.textFontSize};
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-align: left;
  top: calc(${t.textPadding} + ${t.textVerticalSpacing});
  white-space: nowrap;
  width: 100%;

  &:after {
    background-color: ${t.textHighlightColor};
    bottom: ${t.textVerticalSpacing};
    content: '';
    height: 2px;
    left: 45%;
    position: absolute;
    visibility: hidden;
    width: 10px;

    ${materialAnimationDefault()}
  }

  ${isLabelDirty()}
  ${isLabelFocused()}
`;

export default TextfieldLabel;
