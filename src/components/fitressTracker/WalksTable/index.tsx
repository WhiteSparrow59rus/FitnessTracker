import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AppState } from '../../../store';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../../types/actions';
import { startRemoveWalk } from '../../../store/walks/actions';
import { Walk } from '../../../types/Walk';
import { connect } from 'react-redux';
import { pluralize, jsUcfirst } from '../../../utils';
import ItemMenu from '../ItemMenu';
import WalkAdd from '../WalkAdd'
import { StyledFooter, StyledTableContainer, StyledDayName, StyledDayFormat } from './styled'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
  
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }  
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string | Date }, b: { [key in Key]: number | string | Date }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Walk;
  label: string;
}

const headCells: HeadCell[] = [
  { id: 'date', label: 'Дата' },
  { id: 'distance', label: 'Дистанция' }
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Walk) => void;
  order: Order;
  orderBy: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      fontFamily: 'PT Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '16px',
      alignItems: 'center',
      height: '40px',
      padding: '0px 0px 0px 16px',
      border: 'unset',
      textAlign: 'justify' 
    },
    head: {
      width: '50%',
      padding: '0px 0px 0px 16px',
      backgroundColor: '#1C2025',
      color: '#FFFFFF',
      fontFamily: 'PT Sans Caption',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      alignItems: 'center',
      height: '40px',
    }
  }),
)(TableCell);

// Костыль, пока что не понял как правильно переопределять стили в Material-UI
const StyledTableSortLabel = withStyles({
  root: {
    color: 'white !important' ,
  },
  active: {
    color: 'white !important',
  },
  icon: {
    color: 'white !important',
  },
})(TableSortLabel);

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes,  order, orderBy,  onRequestSort } = props;
  const createSortHandler = (property: keyof Walk) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
    },
    table: {
      minWidth: '330px',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    }
  }),
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 'unset',
      '&:nth-of-type(odd)': {
        backgroundColor: '#EFEFF0',
      }
    },
  }),
)(TableRow);

interface WalksListProps {
  walks?: Walk[]
}
interface WalksListState {}

type Props = WalksListProps & LinkStateProps & LinkDispatchProps

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

const EnhancedTable: React.FC<Props> = ({
  walks
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Walk>('date');
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Walk) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <StyledTableContainer>
          <Table
            stickyHeader 
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(walks, getComparator(order, orderBy))
                .map((row, index) => {
                  const kilometers = Math.floor(row.distance/1000)
                  const meters = row.distance - kilometers*1000
                  const resultString = kilometers === 0 ? 
                  pluralize(row.distance, ['метр', 'метра', 'метров']) : 
                  `${pluralize(kilometers, ['километр', 'километра', 'километров'])} ${pluralize(meters, ['метр', 'метра', 'метров'])}`
                  const dayName = jsUcfirst(format(new Date(row.date), 'EEEE', { locale: ru }))
                  const dateFormat = format(new Date(row.date), 'dd.MM.yyyy')
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.id.toString())}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <StyledTableCell>
                        <StyledDayName>
                          {dayName}
                        </StyledDayName>
                        <StyledDayFormat>
                          {dateFormat}
                        </StyledDayFormat>
                      </StyledTableCell>
                      <StyledTableCell>
                        <span>{resultString}</span>
                        <ItemMenu walk={row}/>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
      <StyledFooter>
        <WalkAdd/>
      </StyledFooter>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
