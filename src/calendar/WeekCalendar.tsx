import * as React from 'react'
import addDays from 'date-fns/addDays'
import startOfWeek from 'date-fns/startOfWeek'
import { RenderCellFn, defaultCellRenderer } from './RenderCell'

interface IDayViewProps {
  date: Date
  renderCell?: RenderCellFn
}
export const DayView: React.FC<IDayViewProps> = ({ date, renderCell = defaultCellRenderer }) => {
  return (
    <div style={{ height: 100, width: '100%' }}>
      {renderCell({ date })}
    </div>
  )
}

interface IWeekViewProps {
  date: Date
  withWeekDays?: boolean
}
export const WeekView: React.FC<IWeekViewProps> = ({ date, withWeekDays }) => {
  const startOfCurrentWeek = startOfWeek(date)
  let days = []


  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i)
    days.push(<DayView key={day.getTime()} date={day} />)
  }

  return (
    <div className="flex wrap row">
      {days}
    </div>
  )
}

interface IWeekCalendarProps {
  date: Date
  renderCell?: RenderCellFn
  withWeekDays?: boolean
}
export const WeekCalendar: React.FC<IWeekCalendarProps> = ({ date = new Date(), withWeekDays }) => {
  return (
    <WeekView date={date} withWeekDays={withWeekDays} />
  )
}
