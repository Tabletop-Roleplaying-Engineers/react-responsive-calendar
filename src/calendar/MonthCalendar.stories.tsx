import * as React from 'react'
import { MonthView } from './MonthCalendar'
import { ViewType } from './types'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

export default {
  title: 'MonthView',
  component: MonthView,
  parameters: {
    info: { inline: true },
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  },
}

export const Month = () => (
  <MonthView date={new Date()} view={ViewType.DESKTOP} />
)
export const MonthNovember19 = () => (
  <MonthView date={new Date('2019-11-15')} view={ViewType.DESKTOP} />
)
export const MonthNovember_2020 = () => (
  <MonthView date={new Date('2020-11-15')} view={ViewType.DESKTOP} />
)
