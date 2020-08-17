import styled from "styled-components"

const StyledRightColumn = styled.div`
  min-width: 810px;
  width: 70%;
  margin: 10px;
  background: #FFFFFF;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.35));

  position: relative;
`;

const StyledRightColumnHeader = styled.div`
  min-width: 747px;
  height: 50px;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
  color: #000000;
  padding: 20px 20px  20px 40px;
`;

const StyledRightColumnContent = styled.div`
  
`;


export { StyledRightColumn, StyledRightColumnHeader, StyledRightColumnContent }