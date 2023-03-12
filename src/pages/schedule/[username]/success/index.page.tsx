import { Success } from '@/assets'
import {
  Button,
  Heading,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SuccessContainer } from './styles'

export default function ScheduleSuccess() {
  const router = useRouter()
  const username = String(router.query.username)
  const name = String(router.query.name)
  const date = String(router.query.day)

  const dateFormatted = dayjs(date).format('DD[ de ]MMMM')
  const hour = dayjs(date).format('HH[h]')

  async function handleBackToSchedule() {
    await router.push(`/schedule/${username}`)
  }

  return (
    <SuccessContainer>
      <Heading size="xl">Agendamento feito com sucesso!</Heading>
      <Image src={Success} alt="Sucesso!" width={150} />
      <Text size="xl">
        {name}, foi realizado o seu agendamento com {username}, no dia{' '}
        {dateFormatted} às {hour}.
      </Text>
      <Button size="sm" onClick={handleBackToSchedule}>
        Voltar
      </Button>
    </SuccessContainer>
  )
}
