import React from "react";
import { Walk } from "../../../types/Walk"
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../types/actions";
import { bindActionCreators } from "redux";
import { startRemoveWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";
import WalksListItem from "../WalksListItem"
import { List } from 'antd';
import './index.css';

interface WalksListProps {
  walks?: Walk[]
}
interface WalksListState {}

type Props = WalksListProps & LinkStateProps & LinkDispatchProps

export class WalksList extends React.Component<Props, WalksListState> {
  onRemove = (id: string) => {
    this.props.startRemoveWalk(id)
  }
  onAdd = (id: string) => {
    this.props.startRemoveWalk(id)
  }  
  render() {
    const { walks } = this.props
    return (
      <div className="walks-list">
        <div className="walks-list-header">
          <div className="walks-list-header-left-column">
            Дата
          </div>
          <div className="walks-list-header-right-column">
            Дистанция
          </div>
        </div>
        <List className="walks-list-content">
          {
            walks.map(walk => {
              return <WalksListItem walk={walk} key={walk.id}/>
            })
          }
        </List>
      </div>        
    )
  }
} 
  
interface LinkStateProps {
  walks: Walk[]
}
interface LinkDispatchProps {
  startRemoveWalk: (id: string) => void
}

const mapStateToProps = (state: AppState, ownProps: WalksListProps): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: WalksListProps): LinkDispatchProps => ({
  startRemoveWalk: bindActionCreators(startRemoveWalk, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WalksList);