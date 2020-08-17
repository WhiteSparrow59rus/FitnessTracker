import styled from "styled-components"
import TableContainer from '@material-ui/core/TableContainer';

const StyledTableContainer = styled(TableContainer)`
  height: calc(100vh - 80px);
  min-height: 520px;
  ::-webkit-scrollbar {
    /* По макету 3px */
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #1C2025; 
  }
  ::-webkit-scrollbar-thumb {
    background: #EC174F; 
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ff0044; 
  }
`;

const StyledFooter = styled.div`
  text-align: center;
  width: 100%;
  min-width: 335px;
  margin: 0px;
  height: 60px;
`;

const StyledDayName = styled.div`
  color: rgba(28, 32, 37, 0.4);
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
`;

const StyledDayFormat = styled.div`
  
`;

export { StyledTableContainer, StyledFooter, StyledDayName, StyledDayFormat }