import * as React from 'react'
import { useState } from 'react'
import { MonthView } from './MonthCalendar'
import { WeekCalendar } from './WeekCalendar'
import { ViewType } from './types'
import { RenderWeekDayFn } from './RenderWeekDay'
import { RenderCellFn } from './RenderCell'

interface IResponsiveCalendarProps {
  withWeekDays?: boolean
  date?: Date
  onViewChanged?: (view: ViewType) => void
  renderWeekDay?: RenderWeekDayFn
  renderCell?: RenderCellFn
}
export const ResponsiveCalendar: React.FC<IResponsiveCalendarProps> = ({ withWeekDays, date = new Date(), onViewChanged, renderWeekDay, renderCell }) => {
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
      <MonthView date={date} withWeekDays={withWeekDays} view={view} renderWeekDay={renderWeekDay} renderCell={renderCell} />
    )
  }

  return (
    <WeekCalendar date={date} withWeekDays={withWeekDays} />
  )
}
