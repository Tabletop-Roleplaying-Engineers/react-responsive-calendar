import * as React from 'react'

interface IRenderCellProps {
  date: Date
}
export type RenderCellFn = (props: IRenderCellProps) => React.ReactNode

export const defaultCellRenderer: RenderCellFn = ({ date }) => {
  return date.getDate()
}