import { getGoogleOauthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
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

  const scheduling = await prisma.scheduling.create({
    data: {
      user_id: user.id,
      name,
      email,
      observations,
      date: schedulingDate.toDate()
    }
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOauthToken(user.id)
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: Agendamento ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format()
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format()
      },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    }
  })

  return res.status(201).end()
}
