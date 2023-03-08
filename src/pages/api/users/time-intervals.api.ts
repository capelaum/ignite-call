import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const timeIntervalsBodySchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().int().min(0).max(6),
        startTimeInMinutes: z.number().int().min(0).max(1439),
        endTimeInMinutes: z.number().int().min(0).max(1439)
      })
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - interval.startTimeInMinutes >= 60
        ),
      {
        message: 'O intervalo de tempo deve ser de pelo menos 1 hora.'
      }
    )
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  )

  if (!session || !session?.user?.id) return res.status(401).end()

  await prisma.userTimeInterval.deleteMany({
    where: {
      user_id: session.user.id
    }
  })

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => ({
      user_id: session.user.id,
      week_day: interval.weekDay,
      start_time_in_minutes: interval.startTimeInMinutes,
      end_time_in_minutes: interval.endTimeInMinutes
    }))
  })

  return res.status(201).end()
}
