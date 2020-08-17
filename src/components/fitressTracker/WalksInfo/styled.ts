import styled from "styled-components"

const StyledRightColumnFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #1C2025;

  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  align-items: center;

  color: #FFFFFF;
`;

const StyledMinValue = styled.div`
  padding: 0 0 0 20px;
  width: 215px;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  line-height: 60px
`;

const StyledMaxValue = styled.div`
  padding: 0 0 0 22px;
  width: 215px;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  line-height: 60px
`;

const StyledSummDistance = styled.div`
  position: absolute;
  right: 0px;
  padding: 0 20px 0 0;
  width: 215px;
  text-align: right;
  vertical-align: middle;
  line-height: 20px;
`;

export { StyledRightColumnFooter, StyledMinValue, StyledMaxValue, StyledSummDistance }