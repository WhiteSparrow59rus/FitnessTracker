import React from "react";
import { Walk } from "../../../types/Walk"
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../types/actions";
import { startRemoveWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from 'antd';
import "./index.css"
import { pluralize } from "../../../utils"

interface WalksListItemProps {
  walk: Walk
  style?: any
}
interface WalksListItemState {}

type Props = WalksListItemProps & LinkStateProps & LinkDispatchProps

export class WalksListItem extends React.Component<Props, WalksListItemState> {
  onRemove = (id: string) => {
    this.props.startRemoveWalk(id)
  }
  render() {
    const { walk } = this.props
    const kilometers = Math.floor(walk.distance/1000)
    const meters = walk.distance - kilometers*1000
    const resultString = kilometers === 0 ? 
    pluralize(walk.distance, ['метр', 'метра', 'метров']) : 
    `${pluralize(kilometers, ['километр', 'километра', 'километров'])} ${pluralize(meters, ['метр', 'метра', 'метров'])}`
    return (
      <List.Item key={walk.id} className="walks-list-item" style={this.props.style}>
        <List.Item.Meta
          title={walk.date.toDateString()}
          description={walk.date.toDateString()}
        />
        <span>{resultString}</span>
      </List.Item>
    );
  }
} 
  
interface LinkStateProps {
  walks: Walk[]
}
interface LinkDispatchProps {
  startRemoveWalk: (id: string) => void
}

const mapStateToProps = (state: AppState, ownProps: WalksListItemProps): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: WalksListItemProps): LinkDispatchProps => ({
  startRemoveWalk: bindActionCreators(startRemoveWalk, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WalksListItem);