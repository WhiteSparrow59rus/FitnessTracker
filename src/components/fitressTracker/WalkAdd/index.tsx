import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import { Walk } from "../../../types/Walk";
import { AppState } from "../../../store";
import { AppActions } from "../../../types/actions";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { startAddWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";
import { StyledWalkAddButton } from './styled'
import ruLocale from "date-fns/locale/ru";
import { format } from 'date-fns'

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface WalkAddProps {}
interface WalkAddState {}
type Props = WalkAddProps & LinkStateProps & LinkDispatchProps

const WalkAdd: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );
  const [distance, setDistance] = React.useState<number>(0);
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseInt(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFields = () => {
    setSelectedDate(new Date());
    setDistance(0);
  }

  const handleSave = () => {
    const newWalk: Walk = {
      id: new Date().getTime().toString(),
      date: selectedDate as Date,
      distance: distance
    }
    props.startAddWalk(newWalk)
    resetFields()
    setOpen(false);
  };

  const disableExistDates = (date: Date | null): boolean => {
    if (date == null) {
      return false
    }
    return props.walks.some(walk => format(walk.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
  }

  return (
    <div style={{ 'height': '100%'}}>
      <StyledWalkAddButton onClick={handleClickOpen}>
        Добавить запись
      </StyledWalkAddButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить запись прогулки</DialogTitle>
        <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            required
            id="date-picker-dialog"
            label="Выберите дату"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ padding: '5px' }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            shouldDisableDate={disableExistDates}
          />
          <TextField
            required
            id="standard-number"
            label="Дистанция"
            type="number"
            defaultValue={distance}
            onChange={handleChange}
            style={{ padding: '5px' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface LinkStateProps {
  walks: Walk[]
}
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
