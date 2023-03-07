import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { Header, RegisterContainer } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer
} from './styles'

export default function TimeIntervals() {
  const session = useSession()

  const isSignedIn = session.status === 'authenticated'

  return (
    <RegisterContainer>
      <Header>
        <Heading as="strong">Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput sizeValue="sm" type="time" step={60} />
              <TextInput sizeValue="sm" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>

          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput sizeValue="sm" type="time" step={60} />
              <TextInput sizeValue="sm" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </IntervalBox>
    </RegisterContainer>
  )
}
