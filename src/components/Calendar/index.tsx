import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle
} from './styles'

interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, index) => {
      const date = currentDate.set('date', index + 1)

      return {
        date,
        disabled: date.endOf('day').isBefore(dayjs())
      }
    })

    const firstWeekDay = currentDate.get('day')
    console.log('💥 ~ firstWeekDay:', firstWeekDay)

    const lastDayInCurrenMonth = currentDate.set(
      'date',
      currentDate.daysInMonth()
    )

    const lastWeekDay = lastDayInCurrenMonth.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay === 0 ? 6 : firstWeekDay - 1
    }).map((_, index) => {
      const subtractQuantity =
        firstWeekDay === 0 ? 6 - index : firstWeekDay - index - 1

      return {
        date: currentDate.subtract(subtractQuantity, 'day'),
        disabled: true
      }
    })

    const nextMonthFillArray = Array.from({
      length: lastWeekDay === 0 ? 0 : 7 - lastWeekDay
    }).map((_, index) => {
      return {
        date: lastDayInCurrenMonth.add(index + 1, 'day'),
        disabled: true
      }
    })

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7)
          })
        }

        return weeks
      },
      []
    )

    return calendarWeeks
  }, [currentDate])

  function handlePreviousMonth() {
    setCurrentDate((prevState) => prevState.subtract(1, 'month'))
  }

  function handleNextMonth() {
    setCurrentDate((prevState) => prevState.add(1, 'month'))
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Ver mês anterior">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Ver próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    disabled={disabled}
                    onClick={() => onDateSelected(date.toDate())}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
