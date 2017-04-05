// @flow

import React from 'react';

import TextfieldInput from '../Input';
import TextfieldLabel from '../Label';
import TextfieldStyle from './Styled';

const noop = () => {};

type TextfieldProps = {
  align?: 'left' | 'right',
  id: string,
  label: any,
  onBlur?: Function,
  onFocus?: Function,
  width?: 'expandable' | 'full' | void,
};

type State = {
  isFocused: boolean,
};

class Textfield extends React.Component {
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

  blurHandler(event: Event) {
    this.setState({ isFocused: false });
    if (this.props.onBlur) { return this.props.onBlur(event); }
    return null;
  }

  focusHandler(event: Event) {
    this.setState({ isFocused: true });
    if (this.props.onFocus) { return this.props.onFocus(event); }
    return null;
  }

  render() {
    const { id, label, ...other } = this.props;
    const { isFocused } = this.state;

    return (
      <TextfieldStyle>
        <TextfieldInput
          {...other}
          id={id}
          isFocused={isFocused}
          onBlur={(e: Event) => this.blurHandler(e)}
          onFocus={(e: Event) => this.focusHandler(e)}
        />
        <TextfieldLabel
          htmlFor={id}
          isFocused={isFocused}
        >{label}</TextfieldLabel>
      </TextfieldStyle>
    );
  }
}

export default Textfield;
