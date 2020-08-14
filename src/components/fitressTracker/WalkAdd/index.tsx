import React from "react";
import { Modal, Button, Form, InputNumber, DatePicker } from 'antd';
import { Walk } from "../../../types/Walk";
import { AppState } from "../../../store";
import { AppActions } from "../../../types/actions";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { startAddWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";
import { FormInstance } from 'antd/lib/form';

interface WalkAddProps {}
interface WalkAddState {}
type Props = WalkAddProps & LinkStateProps & LinkDispatchProps

export class WalkAdd extends React.Component<Props, WalkAddState> {
  state = { visible: false };
  formRef = React.createRef<FormInstance>();
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onCancel = (e: any)  => {
    this.setState(state => ({
      visible: false
    }));
  };

  onOk = () => {
    this.formRef.current?.validateFields()
      .then(values => {
        this.formRef.current?.resetFields();
        const newWalk: Walk = {
          id: Date.now().toString(),
          date: values.date._d as Date,
          distance: values.distance as number
        }
        this.props.startAddWalk(newWalk);
        this.setState(state => ({
          visible: false
        }));
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  selectDate(date: any, dateString: string): void {
    console.log(date, dateString);
  }

  render() {
    return (
      <>
        <Button type="default" onClick={this.showModal}>
          Добавить запись
        </Button>
        <Modal
          title="Добавить прогулку"
          visible={this.state.visible}
          okText="Создать"
          cancelText="Отмена"
          onCancel={this.onCancel}
          onOk={this.onOk}
        >
          <Form
            ref={this.formRef}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ distance: '0' }}
          >
            <Form.Item 
              name="date" 
              label="Дата" 
              rules={[{ required: true, message: 'Пожалуйста, выберите дату прогулки' }]}>
              <DatePicker 
                onChange={this.selectDate} 
                style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item 
              name="distance" 
              label="Дистанция" 
              rules={[{ required: true, message: 'Укажите пройденную дистанцию' }]}>
              <InputNumber 
                min={0} 
                max={100000}
                formatter={value => `${value} м`}
                parser={(value: any) => value.replace(' м', '')}
                style={{ width: '100%' }}/>
            </Form.Item>
          </Form>
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