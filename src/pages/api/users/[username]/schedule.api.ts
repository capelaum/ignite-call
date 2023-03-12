import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const createSchedulingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().optional(),
  date: z
    .string()
    .datetime()
    .transform((date) => dayjs(date))
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const { name, email, observations, date } = createSchedulingSchema.parse(
    req.body
  )

  const schedulingDate = date.startOf('hour')

  if (schedulingDate.isBefore(dayjs())) {
    return res.status(400).json({ message: 'Date is in the past' })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate()
    }
  })

  if (conflictingScheduling) {
    return res
      .status(400)
      .json({ message: 'There is another scheduling at this time.' })
  }

  await prisma.scheduling.create({
    data: {
      user_id: user.id,
      name,
      email,
      observations,
      date: schedulingDate.toDate()
    }
  })

  return res.status(201).end()
}
