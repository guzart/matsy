import React from 'react';
import { mount } from 'enzyme';
import Textfield from '../../../src/matty/textfield/Textfield';

describe('Textfield', () => {
  let props;
  let mountedTextfield;
  const textfield = () => {
    if (!mountedTextfield) {
      mountedTextfield = mount(
        <Textfield {...props} />,
      );
    }
    return mountedTextfield;
  };

  beforeEach(() => {
    props = {
      id: 'txtfield',
      label: 'field',
    };
    mountedTextfield = undefined;
  });

  it('always renders a div', () => {
    const divs = textfield().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
