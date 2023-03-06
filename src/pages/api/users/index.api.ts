import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  username: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, username } = req.body

  const usernameExists = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (usernameExists) {
    return res.status(400).json({ message: 'Nome de usuário já existe.' })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username
    }
  })

  return res.status(201).json(user)
}
