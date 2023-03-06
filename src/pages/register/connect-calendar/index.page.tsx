import {
  Button,
  Heading,
  MultiStep,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { ArrowRight } from 'phosphor-react'
import { Header, RegisterContainer } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  async function handleRegister() {}

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
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight weight="bold" />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
