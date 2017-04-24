import styled from 'styled-components';

import t from './theme';

interface Props {
  border?: boolean,
}

const CardSupportingText = styled.div`
  border-bottom: ${(props: Props) => (props.border ? `1px solid ${t.borderColor}` : '0')};
  color: ${t.supportingTextTextColor};
  font-size: ${t.supportingTextFontSize};
  line-height: ${t.supportingTextLineHeight};
  overflow: hidden;
  padding: ${t.verticalPadding} ${t.horizontalPadding};
  width: 90%;
`;

export default CardSupportingText;
