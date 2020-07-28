import * as React from 'react'
import addDays from 'date-fns/addDays'
import startOfWeek from 'date-fns/startOfWeek'
import { RenderCellFn, defaultCellRenderer } from './RenderCell'
import { ViewType } from './types'

interface IDayViewProps {
  date: Date
  renderCell?: RenderCellFn
  isPreviousPeriod?: boolean
  isNextPeriod?: boolean
  isMobile?: boolean
}
export const DayView: React.FC<IDayViewProps> = ({
  date,
  renderCell = defaultCellRenderer,
  isPreviousPeriod = false,
  isNextPeriod = false,
  isMobile = true,
}) => {
  return (
    <div style={{ width: '100%' }}>
      {renderCell({ date, isPreviousPeriod, isNextPeriod, isMobile })}
    </div>
  )
}

interface IWeekViewProps {
  date: Date
  renderCell?: RenderCellFn
}
export const WeekView: React.FC<IWeekViewProps> = ({ date, renderCell }) => {
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 })
  let days = []

  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i)
    days.push(
      <DayView key={day.getTime()} date={day} renderCell={renderCell} />,
    )
  }

  return <div className="flex wrap row">{days}</div>
}

interface IWeekCalendarProps {
  date: Date
  view: ViewType
  renderCell?: RenderCellFn
}
export const WeekCalendar: React.FC<IWeekCalendarProps> = ({
  date = new Date(),
  renderCell,
}) => {
  return <WeekView date={date} renderCell={renderCell} />
}
