import * as React from 'react'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import { ResponsiveCalendar, ViewType } from './ResponsiveCalendar'
import '../styles.css'

export default {
  title: 'ResponsiveCalendar',
}

export const Default = () => <ResponsiveCalendar />
export const WithWeekDays = () => <ResponsiveCalendar withWeekDays />

export const Styled = () => {
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
      <ResponsiveCalendar date={date} onViewChanged={viewChangeHandler} withWeekDays />
    </>
  )
}
