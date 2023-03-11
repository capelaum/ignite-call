import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not provided' })
  }

  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(dayjs())

  if (isPastDate) {
    return res.json({ availability: [], possibleTimes: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.day()
    }
  })

  if (!userAvailability) {
    return res.json({ availability: [], possibleTimes: [] })
  }

  const { start_time_in_minutes, end_time_in_minutes } = userAvailability

  const startHour = start_time_in_minutes / 60
  const endHour = end_time_in_minutes / 60

  const possibleTimes = Array.from(
    { length: endHour - startHour },
    (_, index) => startHour + index
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate()
      }
    }
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isBlocked = blockedTimes.some(
      (blockedTime) => dayjs(blockedTime.date).hour() === time
    )

    const isTimeinPast = referenceDate.set('hour', time).isBefore(dayjs())

    return !isBlocked && !isTimeinPast
  })

  return res.json({ possibleTimes, availableTimes })
}
