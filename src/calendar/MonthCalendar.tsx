import * as React from 'react'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import startOfMonth from 'date-fns/startOfMonth'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import startOfWeek from 'date-fns/startOfWeek'
import endOfMonth from 'date-fns/endOfMonth'
import { defaultCellRenderer, RenderCellFn } from './RenderCell'
import { defaultWeekDayRenderer, RenderWeekDayFn } from './RenderWeekDay'
import { ViewType } from './types'

interface IDayViewProps {
  date: Date
  renderCell?: RenderCellFn
  isPreviousPeriod?: boolean
  isNextPeriod?: boolean
}
export const DayView: React.FC<IDayViewProps> = ({ date, renderCell = defaultCellRenderer, isPreviousPeriod = false, isNextPeriod = false }) => {
  return (
    <div style={{ width: 'calc(100% / 7)' }}>
      {renderCell({ date, isPreviousPeriod, isNextPeriod })}
    </div>
  )
}

interface IWeekDayProps {
  date: Date
  view: ViewType
  renderWeekDay?: RenderWeekDayFn
}
export const WeekDay: React.FC<IWeekDayProps> = ({ date, renderWeekDay = defaultWeekDayRenderer, view }) => {
  return (
    <div style={{ width: 'calc(100% / 7)' }}>
      {renderWeekDay({
        date,
        view: view
      })}
    </div>
  )
}

interface IWeekDaysProps {
  date: Date
  view: ViewType
  renderWeekDay?: RenderWeekDayFn
}
export const WeekDays: React.FC<IWeekDaysProps> = ({ date, view, renderWeekDay }) => {
  const startOfCurrentWeek = startOfWeek(date)
  const days = []

  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i)
    days.push(<WeekDay key={day.getTime()} date={day} view={view} renderWeekDay={renderWeekDay} />)
  }

  return (
    <div className="flex wrap row">
     {days}
    </div>
  )
}

export const EmptyDayView = () => {
  return (
    <div style={{ width: 'calc(100% / 7)' }}>
    </div>
  )
}

interface IMonthViewProps {
  date: Date
  view: ViewType
  withWeekDays?: boolean
  renderWeekDay?: RenderWeekDayFn
  renderCell?: RenderCellFn
}
export const MonthView: React.FC<IMonthViewProps> = ({ date, withWeekDays, renderWeekDay, view, renderCell }) => {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const daysInMonth = getDaysInMonth(date)
  const weekDayOfFirstDay = getDay(firstDayOfMonth)
  const weekDayOfLastDay = getDay(lastDayOfMonth)
  let days = []

  // Add previous days
  for (let i = 0; i < weekDayOfFirstDay; i++) {
    const day = subDays(firstDayOfMonth, i + 1)
    days.unshift((
      <DayView key={day.getTime()} date={day} renderCell={renderCell} isPreviousPeriod />
    ))
  }

  for (let i = 0; i < daysInMonth; i++) {
    const day = addDays(firstDayOfMonth, i)
    days.push((
      <DayView key={day.getTime()} date={day} renderCell={renderCell} />
    ))
  }

  // Add next days
  for (let i = 0; i < 6 - weekDayOfLastDay; i++) {
    const day = addDays(lastDayOfMonth, i + 1)
    days.push((
      <DayView key={day.getTime()} date={day} renderCell={renderCell} isNextPeriod />
    ))
  }

  return (
    <>
      {withWeekDays && (
        <WeekDays date={date} view={view} renderWeekDay={renderWeekDay} />
      )}
      <div className="flex wrap row">
        {days}
      </div>
    </>
  )
}
