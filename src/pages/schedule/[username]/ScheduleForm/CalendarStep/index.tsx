import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LineWave } from 'react-loader-spinner'
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
  // const [avalability, setAvalability] = useState<Availability | null>(null)

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

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader size="md">
            {selectedWeekDay} <span>{selectedDateFormatted}</span>
          </TimePickerHeader>

          {isAvailabilityLoading && (
            <LineWave
              height="120"
              width="120"
              color="#A9A9B2"
              ariaLabel="line-wave"
              wrapperStyle={{
                width: '100%',
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              wrapperClass=""
              visible={true}
              firstLineColor=""
              middleLineColor="#00875F"
              lastLineColor=""
            />
          )}

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
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
