import * as React from 'react'

interface IRenderCellProps {
  date: Date
  isPreviousPeriod: boolean
  isNextPeriod: boolean
  isMobile: boolean
}
export type RenderCellFn = (props: IRenderCellProps) => React.ReactNode

export const defaultCellRenderer: RenderCellFn = ({ date, isPreviousPeriod, isNextPeriod }) => {
  const isNotCurr = isPreviousPeriod || isNextPeriod
  return (
    <div style={{ height: 100, opacity: isNotCurr ? 0.5 : 1 }}>
      {date.getDate()}
    </div>
  )
}
