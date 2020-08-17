import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components"

const StyledMenuButton = styled(IconButton)`
  padding: 0px;
  display: inline-block;
`;

const StyledMenu = styled.div`
  display: inline-block;
  float: right;
`;

export { StyledMenuButton, StyledMenu }