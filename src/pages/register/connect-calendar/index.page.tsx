import { prisma } from '@/lib/prisma'
import {
  Button,
  Heading,
  MultiStep,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { getCookies, hasCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Header, RegisterContainer } from '../styles'
import { AuthPermissionErrorMessage, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()

  const router = useRouter()

  useEffect(() => {
    if (router.query.success) {
      toast.success('Seu Google Calendar foi conectado!')
    }
  }, [router.query.success])

  const hasAuthPermissionError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleSignInAndConnectCalendar() {
    try {
      await signIn('google', {
        callbackUrl: '/register/connect-calendar?success=true'
      })
    } catch (error) {
      toast.error('Falha ao conectar com o Google Calendar.')
      console.error('💥 ~ error:', error)
    }
  }

  async function handleNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <RegisterContainer>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>

        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn && !hasAuthPermissionError ? (
            <Button variant="primary" size="sm" disabled>
              Conectado
              <Check weight="bold" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSignInAndConnectCalendar}
            >
              Conectar
              <ArrowRight weight="bold" />
            </Button>
          )}
        </ConnectItem>

        {hasAuthPermissionError && (
          <AuthPermissionErrorMessage size="sm">
            Falha ao conectar com o Google Calendar. Por favor, verifique se
            você habilitou as permissões de acesso ao Google Calendar.
          </AuthPermissionErrorMessage>
        )}

        <Button
          type="submit"
          disabled={!isSignedIn || hasAuthPermissionError}
          onClick={handleNextStep}
        >
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookieUserIdKey = `${process.env.NEXT_PUBLIC_COOKIE_NAME}userId`

    if (!hasCookie(cookieUserIdKey, { req, res })) {
      throw new Error('User ID not found in cookies')
    }

    const userIdOnCookies = getCookies({
      req,
      res
    })[cookieUserIdKey]

    const userInDatabase = await prisma.user.findFirst({
      where: {
        id: userIdOnCookies
      }
    })

    if (!userInDatabase) {
      throw new Error('User not found in database')
    }

    return {
      props: {}
    }
  } catch (error) {
    console.error('💥 ~ error:', error)

    return {
      redirect: {
        destination: '/register',
        permanent: false
      }
    }
  }
}
