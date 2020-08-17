import styled from "styled-components"

const StyledTooltipChart = styled.div`
  width: 149px;
  height: 119.88px;
  border-radius: 5px;
`;

const StyledTooltipChartTitle = styled.div`
  width: 139px;
  height: 42px;
  color: rgba(28, 32, 37, 0.4);
  margin: 10px 10px 0 10px;

  .day-name {
    font-size: 10px;
    line-height: 14px;
    opacity: 0.4;
  }
`;

const StyledTooltipChartContent = styled.div`
  width: 69px;
  height: 31px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
  color: #000000;
`;

const StyledTooltipChartButton = styled.button`
  width: 127px;
  height: 25px;
  background: #EC174F;
  border: unset;
  margin: 10px;

  position: absolute;
  right:    0;
  bottom:   0;
  > span {
    display: inline-block;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 13px;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
  }
`;

const StyledCustomPoint = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  background: #EC174F;
`;

export { StyledTooltipChart,StyledTooltipChartButton, StyledTooltipChartTitle, StyledCustomPoint, StyledTooltipChartContent }