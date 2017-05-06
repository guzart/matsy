import { ComponentClass, StatelessComponent } from 'react';
import styled from 'styled-components';

type Component<P> = ComponentClass<P> | StatelessComponent<P>;

export const card = <P>(Component: Component<P>) => styled(Component)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  box-sizing: border-box;
`;

export const cardPrimary = <P>(Component: Component<P>) => styled(Component)`
  padding: 16px;
`;

export const cardSupportingText = <P>(Component: Component<P>) => styled(Component)`
  padding: 8px 16px;
  box-sizing: border-box;
`;

export const cardActions = <P>(Component: Component<P>) => styled(Component)`
  display: flex;
  padding: 8px;
  box-sizing: border-box;
`;

export const cardMedia = <P>(Component: Component<P>) => styled(Component)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  box-sizing: border-box;
`;

export const cardMediaItem = <P>(Component: Component<P>) => styled(Component)`
  display: inline-block;
  width: auto;
  height: 80px;
  margin: 16px 0 0;
  padding: 0;
`;

export const cardTitle = <P>(Component: Component<P>) => styled(Component)`
  margin: -.063rem 0;
`;

export const cardSubtitle = <P>(Component: Component<P>) => styled(Component)`
  margin: -.063rem 0;
`;

export const cardHorizontalBlock = <P>(Component: Component<P>) => styled(Component)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 16px 0 0;
  box-sizing: border-box;
`;
