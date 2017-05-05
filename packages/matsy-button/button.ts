import { ComponentClass, StatelessComponent } from 'react';
import styled from 'styled-components';

type Component<P> = ComponentClass<P> | StatelessComponent<P>;

export const button = <P>(Component: Component<P>) => styled(Component)`
  display: inline-block;
  position: relative;
  min-width: 64px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 2px;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;
`;