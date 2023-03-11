import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  CalendarStepContainer,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [avalability, setAvalability] = useState<Availability | null>(null)

  const router = useRouter()
  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const selectedWeekDay = selectedDate
    ? dayjs(selectedDate).format('dddd')
    : null

  const selectedDateFormatted = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (selectedDate) {
      api
        .get(`/users/${username}/availability`, {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD')
          }
        })
        .then((res) => setAvalability(res.data))
    }
  }, [selectedDate, username])

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader size="md">
            {selectedWeekDay} <span>{selectedDateFormatted}</span>
          </TimePickerHeader>

          <TimePickerList>
            {avalability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!avalability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePickerContainer>
      )}
    </CalendarStepContainer>
  )
}
