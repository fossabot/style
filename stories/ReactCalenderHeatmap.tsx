import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { random, date } from 'faker'

import CalendarHeatmap from 'react-calendar-heatmap'

const DATE = new Date()

function createRows (max: number = random.number({ max: 365 })) {
  let rows = []
  for (let i = 0; i < max; i++) {
    const d = date.past()
    rows.push({
      date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      count: random.number({ max: 4 })
    })
  }
  return rows
}

storiesOf('ReactCalenderHeatmap', module).add('default', () => (
  <CalendarHeatmap
    endDate={DATE}
    numDays={365}
    values={createRows()}
    classForValue={(value: any) => {
      let data = value
      if (!data) {
        data = { date: '', count: 0 }
      }
      return `color-github-${data.count}`
    }}
  />
))
