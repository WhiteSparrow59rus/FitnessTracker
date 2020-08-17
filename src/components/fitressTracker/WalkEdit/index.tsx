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
import { startEditWalk } from "../../../store/walks/actions";
import { connect } from "react-redux";
import ruLocale from "date-fns/locale/ru";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns'

interface WalkEditProps {
  editWalk: Walk,
  clickHandler: () => void;
}
interface WalkAddState {}
type Props = WalkEditProps & LinkStateProps & LinkDispatchProps

const WalkEdit: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    props.editWalk.date,
  );
  const [distance, setDistance] = React.useState<number>(props.editWalk.distance);
  
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
    props.clickHandler()
  };

  const resetFields = () => {
    setSelectedDate(new Date());
    setDistance(0);
  }

  const handleSave = () => {
    const editWalk: Walk = {
      id: props.editWalk.id,
      date: selectedDate as Date,
      distance: distance
    }
    props.startEditWalk(editWalk)
    resetFields()
    props.clickHandler()
    setOpen(false);
  };

  const disableExistDates = (date: Date | null): boolean => {
    if (date == null || format(props.editWalk.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
      return false
    }
    return props.walks.some(walk => format(walk.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
  }

  return (
    <div style={{ 'height': '100%'}}>
      <MenuItem
        key={'edit'}
        onClick={handleClickOpen}
      >
        Редактировать
      </MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Редактировать запись прогулки</DialogTitle>
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
            Сохранить
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
  startEditWalk: (walk: Walk) => void
}

const mapStateToProps = (state: AppState, ownProps: WalkEditProps): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: WalkEditProps): LinkDispatchProps => ({
  startEditWalk: bindActionCreators(startEditWalk, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WalkEdit);
