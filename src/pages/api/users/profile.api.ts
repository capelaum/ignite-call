import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  bio: z
    .string()
    .min(3, {
      message: 'Biografia deve ter no mínimo 3 letras.'
    })
    .max(100, {
      message: 'Biografia deve ter no máximo 100 letras.'
    })
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  )

  if (!session || !session?.user?.id) return res.status(401).end()

  const { bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      bio
    }
  })

  return res.status(204).end()
}
