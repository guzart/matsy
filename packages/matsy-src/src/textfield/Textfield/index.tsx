import * as React from 'react';

import TextfieldInput from '../InputStyle';
import TextfieldLabel from '../Label';
import TextfieldStyled from './styled';

const noop = () => {};

interface TextfieldProps {
  align?: 'left' | 'right',
  id: string,
  label: any,
  onBlur?: Function,
  onFocus?: Function,
  width?: 'expandable' | 'full',
}

interface State {
  isFocused: boolean,
}

class Textfield extends React.Component<TextfieldProps, State> {
  static defaultProps = {
    align: 'left',
    onBlur: noop,
    onFocus: noop,
    width: undefined,
  };

  state: State = {
    isFocused: false,
  };

  props: TextfieldProps;

  blurHandler(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ isFocused: false });
    if (this.props.onBlur) { return this.props.onBlur(event); }
    return null;
  }

  focusHandler(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ isFocused: true });
    if (this.props.onFocus) { return this.props.onFocus(event); }
    return null;
  }

  render() {
    const { align, id, label, ...other } = this.props;
    const { isFocused } = this.state;

    return (
      <TextfieldStyled align={align}>
        <TextfieldInput
          {...other}
          id={id}
          isFocused={isFocused}
          onBlur={e => this.blurHandler(e)}
          onFocus={e => this.focusHandler(e)}
        />
        <TextfieldLabel
          htmlFor={id}
          isFocused={isFocused}
        >{label}</TextfieldLabel>
      </TextfieldStyled>
    );
  }
}

export default Textfield;
