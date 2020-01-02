import * as React from 'react'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import format from 'date-fns/format'
import { ResponsiveCalendar } from './ResponsiveCalendar'
import { ViewType } from './types'
import '../styles.css'
import './styles.css'

export default {
  title: 'ResponsiveCalendar',
}

export const Default = () => <ResponsiveCalendar />
export const WithWeekDays = () => <ResponsiveCalendar withWeekDays />

export const Customized = () => {
  const [date, setDate] = React.useState(new Date())
  const [incrementFn, setIncrementFn] = React.useState<{ increment: Function}>({
    increment: addMonths,
  })
  const viewChangeHandler = React.useCallback((view) => {
    if (view === ViewType.MOBILE) {
      setIncrementFn({ increment: addWeeks })
    } else {
      setIncrementFn({ increment: addMonths })
    }
  }, [])
  const renderWeekDay = React.useCallback(({ date }) => {
    return (
      <div className="week-day">
        {format(date, 'E')}
      </div>
    )
  }, [])
  const renderCell = React.useCallback(({ date }) => {
    return (
      <div className="calendar-cell">
        {format(date, 'dd')}
      </div>
    )
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <button onClick={() => setDate(incrementFn.increment(date, -1))}>
          Previous
        </button>
        <button onClick={() => setDate(incrementFn.increment(date, 1))}>
          Next
        </button>
      </div>
      <ResponsiveCalendar
        date={date}
        onViewChanged={viewChangeHandler}
        renderWeekDay={renderWeekDay}
        renderCell={renderCell}
        withWeekDays
      />
    </>
  )
}
