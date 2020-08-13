import React from "react";
import { Modal, Button } from 'antd';
import { Walk } from "../../../types/Walk";
import { AppState } from "../../../store";
import { AppActions } from "../../../types/actions";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { startAddWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";

interface WalkAddProps {}
interface WalkAddState {}

export class WalkAdd extends React.Component<WalkAddProps, WalkAddState> {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }
}

interface LinkStateProps {}
interface LinkDispatchProps {
  startAddWalk: (walk: Walk) => void
}

const mapStateToProps = (state: AppState, ownProps: WalkAddProps): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: WalkAddProps): LinkDispatchProps => ({
  startAddWalk: bindActionCreators(startAddWalk, dispatch)
})

  
export default connect(mapStateToProps, mapDispatchToProps)(WalkAdd);