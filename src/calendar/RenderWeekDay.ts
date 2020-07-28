import * as React from 'react'
import format from 'date-fns/format'
import { ViewType } from './types'

interface IRenderWeekDayProps {
  view: ViewType
  date: Date
}
export type RenderWeekDayFn = (props: IRenderWeekDayProps) => React.ReactNode

export const defaultWeekDayRenderer: RenderWeekDayFn = ({ date }) => {
  return format(date, 'E')
}
