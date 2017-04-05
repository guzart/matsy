// @flow

import React from 'react';
import ButtonStyled from './styled';

type Props = {
  type?: 'button' | 'submit',
};

function Button(props: Props) {
  return (
    <ButtonStyled {...props} />
  );
}

Button.defaultProps = {
  type: 'button',
};

export default Button;
