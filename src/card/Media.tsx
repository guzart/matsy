import styled from 'styled-components';

import { card as t } from '../theme';

const CardMedia = styled.div`
  background-attachment: scroll;
  background-color: ${t.imagePlaceholderColor};
  background-origin: padding-box;
  background-position: 50% 50%;
  background-repeat: repeat;
  background-size: cover;
  box-sizing: border-box;
`;

export default CardMedia;
