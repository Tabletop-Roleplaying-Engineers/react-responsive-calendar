import React from 'react'
// import { action } from '@storybook/addon-actions'
// import { Button } from '@storybook/react/demo'
import { MonthCalendar } from './MonthCalendar'

export default {
  title: 'Calendar',
}

export const Month = () => <MonthCalendar />
export const MonthNovember19 = () => <MonthCalendar date={new Date('2019-11-15')} />
