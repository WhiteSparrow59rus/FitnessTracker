import React from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../store';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../../types/actions';
import { startRemoveWalk } from '../../../store/walks/actions';
import { Walk } from '../../../types/Walk';
import { connect } from 'react-redux';
import { StyledMenuButton, StyledMenu } from './styled';
import WalkEdit from '../WalkEdit'

interface ItemMenuPrors {
  walk: Walk
}

type Props = ItemMenuPrors & LinkStateProps & LinkDispatchProps

const ItemMenu: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id: string) => {
    props.startRemoveWalk(id)    
    setAnchorEl(null);
  };

  return (
    <StyledMenu>
      <StyledMenuButton
        onClick={handleClick}
      >
        <MoreVertIcon fontSize={'small'}/>
      </StyledMenuButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          <MenuItem
            key='remove'
            onClick={() => handleSelect(props.walk.id)}
          >
            Удалить
          </MenuItem>
          <WalkEdit editWalk={props.walk} clickHandler={() => handleClose()}/>
      </Menu>
    </StyledMenu>
  );
}

interface LinkStateProps {
  walks: Walk[]
}
interface LinkDispatchProps {
  startRemoveWalk: (id: string) => void
}

const mapStateToProps = (state: AppState, ownProps: ItemMenuPrors): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: ItemMenuPrors): LinkDispatchProps => ({
  startRemoveWalk: bindActionCreators(startRemoveWalk, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemMenu);