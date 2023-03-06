import {
  Button,
  Heading,
  MultiStep,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Header, RegisterContainer } from '../styles'
import { AuthPermissionErrorMessage, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  console.log('💥 ~ session:', session)

  const router = useRouter()

  const hasAuthPermissionError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleSignInAndConnectCalendar() {
    await signIn('google', {
      callbackUrl: '/register/connect-calendar'
    })
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
          <Button
            variant={isSignedIn ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleSignInAndConnectCalendar}
            disabled={isSignedIn}
          >
            {isSignedIn && !hasAuthPermissionError ? 'Conectado' : 'Conectar'}

            {isSignedIn ? (
              <Check weight="bold" />
            ) : (
              <ArrowRight weight="bold" />
            )}
          </Button>
        </ConnectItem>

        {hasAuthPermissionError && (
          <AuthPermissionErrorMessage size="sm">
            Falha ao conectar com o Google Calendar. Por favor, verifique se
            você habilitou as permissões de acesso ao Google Calendar.
          </AuthPermissionErrorMessage>
        )}

        <Button type="submit" disabled={!isSignedIn || hasAuthPermissionError}>
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
