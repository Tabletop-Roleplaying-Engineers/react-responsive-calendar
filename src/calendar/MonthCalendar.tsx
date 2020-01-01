import * as React from 'react'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import startOfMonth from 'date-fns/startOfMonth'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import startOfWeek from 'date-fns/startOfWeek'
import format from 'date-fns/format'
import { defaultCellRenderer, RenderCellFn } from './RenderCell'

import './styles.css'

interface IDayViewProps {
  date: Date
  renderCell?: RenderCellFn
}
export const DayView: React.FC<IDayViewProps> = ({ date, renderCell = defaultCellRenderer }) => {
  return (
    <div style={{ height: 100, width: 'calc(100% / 7)' }}>
      {renderCell({ date })}
    </div>
  )
}

interface IWeekDayProps {
  date: Date
}
export const WeekDay: React.FC<IWeekDayProps> = ({ date }) => {
  const day = getDay(date)
  return (
    <div style={{ width: 'calc(100% / 7)' }}>
      {format(date, 'E')}
    </div>
  )
}

export const WeekDays = () => {
  const now = new Date()
  const startOfCurrentWeek = startOfWeek(now)
  const days = []

  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i)
    days.push(<WeekDay key={day.getTime()} date={day} />)
  }

  return (
    <div className="flex wrap row">
     {days}
    </div>
  )
}

export const EmptyDayView = () => {
  return (
    <div style={{ height: 100, width: 'calc(100% / 7)' }}>
    </div>
  )
}

interface IMonthViewProps {
  date: Date
  withWeekDays?: boolean
}
export const MonthView: React.FC<IMonthViewProps> = ({ date, withWeekDays }) => {
  // const currentDate = new Date(date);
  const firstDayOfMonth = startOfMonth(date);
  const daysInMonth = getDaysInMonth(date)
  const weekDayOfFirstDay = getDay(firstDayOfMonth)
  let days = []

  // Add empty days
  for (let i = 0; i < weekDayOfFirstDay; i++) {
    const day = subDays(firstDayOfMonth, i + 1)
    days.push((
      <EmptyDayView key={day.getTime()} />
    ))
  }

  for (let i = 0; i < daysInMonth; i++) {
    const day = addDays(firstDayOfMonth, i)
    days.push((
      <DayView key={day.getTime()} date={day} />
    ))
  }

  return (
    <>
      {withWeekDays && (
        <WeekDays />
      )}
      <div className="flex wrap row">
        {days}
      </div>
    </>
  )
}

interface IMonthCalendarProps {
  date: Date
  renderCell?: RenderCellFn
  withWeekDays?: boolean
}
export const MonthCalendar: React.FC<IMonthCalendarProps> = ({ date = new Date(), withWeekDays }) => {
  return (
    <MonthView date={date} withWeekDays={withWeekDays} />
  )
}
