import { Calendar } from '@/components/Calendar'
import { useState } from 'react'
import {
  CalendarStepContainer,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList
} from './styles'

export function CalendarStep() {
  const [isDaySelected, setIsDaySelected] = useState(true)

  return (
    <CalendarStepContainer isTimePickerOpen={isDaySelected}>
      <Calendar />

      {isDaySelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            Terça-feira <span>20 de Setembro</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>10:00</TimePickerItem>
            <TimePickerItem>11:00</TimePickerItem>
            <TimePickerItem>12:00</TimePickerItem>
            <TimePickerItem>13:00</TimePickerItem>
            <TimePickerItem>14:00</TimePickerItem>
            <TimePickerItem>15:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>17:00</TimePickerItem>
            <TimePickerItem>18:00</TimePickerItem>
          </TimePickerList>
        </TimePickerContainer>
      )}
    </CalendarStepContainer>
  )
}
