// @flow

import React from 'react';

import type { InputProps } from './types';
import TextfieldInputStyle from './InputStyle';

function TextfieldInput(props: InputProps) {
  return (
    <TextfieldInputStyle {...props} />
  );
}

export default TextfieldInput;
