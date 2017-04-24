import styled from 'styled-components';

import typo from 'matsy/typography/theme';

import t from './theme';

import { isInputDisabled, isInputFocused, isInputInvalid } from './utils';

const TextfieldInputStyle = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${t.textBottomBorderColor};
  color: inherit;
  display: block;
  font-family: ${typo.performanceFont};
  font-size: ${t.textFontSize};
  margin: 0;
  padding: ${t.textPadding} 0;
  text-align: left;
  width: ${t.textWidth};

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${isInputDisabled()}
  ${isInputFocused()}
  ${isInputInvalid()}
`;

// textarea.mdl-textfield__input { display: block; }

export default TextfieldInputStyle;
