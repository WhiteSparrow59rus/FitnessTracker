import Button from '@material-ui/core/Button';
import styled from "styled-components"

const StyledWalkAddButton = styled(Button)`
  height: 100%;
  width: 100%;
  background: #EC174F;
  align-items: center;
  text-align: center;
  border: 0px;
  border-radius: unset;

  span {
    font-family: PT Sans Caption;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;
    color: #FFFFFF;
  }

  :hover {
    background: rgb(235, 77, 116);
    color: #FFFFFF;
  }
`;

export { StyledWalkAddButton }