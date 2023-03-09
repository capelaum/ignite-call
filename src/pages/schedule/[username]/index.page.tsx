import { prisma } from '@/lib/prisma'
import {
  Avatar,
  Heading,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { GetStaticProps } from 'next'
import { ScheduleForm } from './ScheduleForm'
import { ScheduleContainer, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    id: string
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <ScheduleContainer>
      <UserHeader>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Heading size="md">{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </ScheduleContainer>
  )
}

export const getStaticPaths = async () => {
  const users = await prisma.user.findMany()

  const paths = users.map((user) => ({
    params: {
      username: user.username
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
