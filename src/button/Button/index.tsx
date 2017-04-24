import * as React from 'react';

import ButtonStyled, { Props as ButtonStyledProps} from './styled';

type Props = ButtonStyledProps | {
  type?: 'button' | 'submit',
};

function Button(props: Props) {
  return (
    <ButtonStyled {...props} />
  );
}

export default Button;
