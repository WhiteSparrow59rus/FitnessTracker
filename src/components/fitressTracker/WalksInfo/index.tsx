import React from 'react';
import 'date-fns';
import { Walk } from "../../../types/Walk";
import { AppState } from "../../../store";
import { AppActions } from "../../../types/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { format } from 'date-fns'
import { StyledRightColumnFooter, StyledMinValue, StyledMaxValue, StyledSummDistance } from './styled'
import { addDays, pluralize } from '../../../utils'

interface WalksInfoProps {
}
interface WalkAddState {}
type Props = WalksInfoProps & LinkStateProps & LinkDispatchProps

const WalksInfo: React.FC<Props> = (props) => {

const maxDistance: number = Math.max.apply(Math, props.walks.map( walk => { return walk.distance }))
const minDistance: number = Math.min.apply(Math, props.walks.map( walk => { return walk.distance }))

const currentDate: Date = new Date();
const weekAgo: Date = addDays(new Date(), -7);
const lastWeekWalking: Walk[] = props.walks.filter(walk => walk.date > weekAgo && walk.date <= currentDate)

const distanceForWeek: number = lastWeekWalking.reduce(function(prev, cur) {
  return prev + cur.distance;
}, 0);
  
  return (
    <StyledRightColumnFooter>
      <StyledMinValue>
        Минимум: {pluralize(minDistance, ['метр', 'метра', 'метров'])}
      </StyledMinValue>
      <StyledMaxValue>
        Максимум: {pluralize(maxDistance, ['метр', 'метра', 'метров'])}
      </StyledMaxValue>
      <StyledSummDistance>
        Суммарно за 7 дней: {pluralize(distanceForWeek, ['метр', 'метра', 'метров'])}
      </StyledSummDistance>
    </StyledRightColumnFooter>
  );
}

interface LinkStateProps {
  walks: Walk[]
}
interface LinkDispatchProps {}

const mapStateToProps = (state: AppState, ownProps: WalksInfoProps): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: WalksInfoProps): LinkDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WalksInfo);
