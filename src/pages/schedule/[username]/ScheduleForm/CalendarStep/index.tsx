import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()
  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const selectedWeekDay = selectedDate
    ? dayjs(selectedDate).format('dddd')
    : null

  const selectedDateFormatted = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability, isLoading: isAvailabilityLoading } =
    useQuery<Availability>(
      ['availability', selectedDateWithoutTime],
      async () => {
        const response = await api.get(`/users/${username}/availability`, {
          params: {
            date: selectedDateWithoutTime
          }
        })

        return response.data
      },
      {
        enabled: !!selectedDate
      }
    )

  function handleSelectTime(hour: number) {
    const dateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateTime)
  }

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader size="md">
            {selectedWeekDay} <span>{selectedDateFormatted}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
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
