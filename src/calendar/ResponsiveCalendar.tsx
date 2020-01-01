import * as React from 'react'
import { useState } from 'react'
import { MonthCalendar } from './MonthCalendar'
import { WeekCalendar } from './WeekCalendar'

export enum ViewType {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
}

interface IResponsiveCalendarProps {
  withWeekDays?: boolean
  date?: Date
  onViewChanged?: (view: ViewType) => void
}
export const ResponsiveCalendar: React.FC<IResponsiveCalendarProps> = ({ withWeekDays, date = new Date(), onViewChanged }) => {
  const [view, setView] = useState<ViewType>()
  const updateView = React.useCallback((size: number) => {
    if (size > 375) {
      setView(ViewType.DESKTOP)
    } else {
      setView(ViewType.MOBILE)
    }
  }, [])
  const onResize = React.useCallback((e) => {
    updateView(document.body.offsetWidth)
  }, [])
  React.useEffect(() => {
    updateView(document.body.offsetWidth)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  React.useEffect(() => {
    if (onViewChanged && view) {
      onViewChanged(view)
    }
  }, [view])

  if (!view) {
    return null
  }

  if (view === ViewType.DESKTOP) {
    return (
      <MonthCalendar date={date} withWeekDays={withWeekDays} />
    )
  }

  return (
    <WeekCalendar date={date} withWeekDays={withWeekDays} />
  )
}
