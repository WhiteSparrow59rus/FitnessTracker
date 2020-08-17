import React from "react";
import { ResponsiveLine } from '@nivo/line'
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../store';
import { AppActions } from '../../../types/actions';
import { Walk } from '../../../types/Walk';
import { connect } from 'react-redux';
import { format } from 'date-fns'
import { Popover } from "@material-ui/core";
import { jsUcfirst } from '../../../utils';
import { StyledTooltipChart, StyledTooltipChartButton, StyledTooltipChartTitle, StyledTooltipChartContent } from "./stuled"
import { ru } from 'date-fns/locale'

interface ChartPrors {}

interface Data {
  id:   string | number,
  data: Array<Points>
}

interface Points {
  id?: string,
  walk?: Walk,
  x: number | string | Date,
  y: number | string | Date
  yFormatted?: string
  extra?: any
}

type Props = ChartPrors & LinkStateProps & LinkDispatchProps

const Chart: React.FC<Props> = (props) => {
  const chartRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const sortedWalks = props.walks.sort((a, b) => a.date.getTime() - b.date.getTime())
  const data: Data ={
    id: 'walks',
    data: sortedWalks.map(walk => {
      const points: Points = {
        walk: walk,
        x: format(walk.date, 'yyyy-MM-dd hh:mm'),
        y: walk.distance
      }
      return points
    })
  }
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({
    top: 0, 
    left: 0,
  });
  const [selectedWalk, setSelectedWalk] = React.useState<Walk>({
      date: new Date(),
      distance: 0,
      id: ''
  });
  const dayName = jsUcfirst(format(new Date(selectedWalk.date), 'EEEE', { locale: ru }))
  const dateFormat = format(new Date(selectedWalk.date), 'dd.MM.yyyy')

  const handleClick = (event: any) => {
    const chartPosition = chartRef.current.getBoundingClientRect()
    setPosition({
      top: event.y + chartPosition.y - 90,
      left: event.x + chartPosition.x - 15
    })
    setSelectedWalk(event.data.walk as Walk)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickChart = (e: any) => {
    handleClick(e)
    console.log(e)
  };

  const handleClickPopover = (e: any) => {
    console.log(`Открыть карту по прогулке ${selectedWalk.id}`)
  };

  
  const id = open ? 'spring-popper' : undefined;

  return (
    <div ref={chartRef} style={{ height: '490px'}}>
      <ResponsiveLine
        data={[data]}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d %H:%M",
          precision: "day"
          
        }}
        tooltip={() => {
          return (<div/>)}}
        xFormat="time:%Y-%m-%d"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: "%Y-%m-%d",
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={['#EC174F']}
        pointSize={10}
        pointColor={'#EC174F'}
        pointBorderWidth={2}
        enablePointLabel
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel={(d) => `${d.y}м.` }
        onClick={handleClickChart}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={{
          dots: {
            text: {
              fill: '#EC174F',
              fontSize: 14
            },
          },
          axis: {
            domain: {
              line: {
                stroke: '#fff',
                strokeWidth: 1
              }
            },
            ticks: {
              line: {
                stroke: '#fff',
                strokeWidth: 1
              },
              text: {
                fill: "#cccccc",
              },
            },
          },
          grid: {
            line: {
              stroke: '#e8e9e9',
              strokeWidth: 1
            }
          },
        }}
        
    />
    <Popover
        id={id}
        open={open}
        anchorReference={"anchorPosition"}
        anchorPosition={{ top: position.top, left: position.left }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <StyledTooltipChart>
          <StyledTooltipChartTitle>
            <div className={"day-name"}>{dayName}</div>
            <div>{dateFormat}</div>
          </StyledTooltipChartTitle>
          <StyledTooltipChartContent>
            {`${selectedWalk.distance}м.`}
          </StyledTooltipChartContent>
          <StyledTooltipChartButton onClick={handleClickPopover}>
            <span>Показать на карте</span>
          </StyledTooltipChartButton>
        </StyledTooltipChart>
        
      </Popover>
    </div>
  )
}

  

interface LinkStateProps {
  walks: Walk[]
}
interface LinkDispatchProps {}

const mapStateToProps = (state: AppState, ownProps: ChartPrors): LinkStateProps => ({
  walks: state.walks
})

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AppActions>, ownProps: ChartPrors): LinkDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Chart);