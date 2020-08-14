import React from "react";
import { Walk } from "../../../types/Walk"
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../types/actions";
import { startRemoveWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from 'antd';

interface WalksListItemProps {
  walk: Walk
}
interface WalksListItemState {}

type Props = WalksListItemProps & LinkStateProps & LinkDispatchProps

export class WalksListItem extends React.Component<Props, WalksListItemState> {
  onRemove = (id: string) => {
    this.props.startRemoveWalk(id)
  }
  render() {
    const { walk } = this.props
    return (
      <List.Item key={walk.id}>
        <List.Item.Meta
          title={walk.date.toDateString()}
          description={walk.date.toDateString()}
        />
        <span>{walk.distance}</span>
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