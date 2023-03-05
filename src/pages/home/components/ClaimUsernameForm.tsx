import {
  Button,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { ArrowRight } from 'phosphor-react'
import { Form } from './styles'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput
        sizeValue="sm"
        prefix="test.com.br/"
        placeholder="seu-usuario"
      />

      <Button size="sm" type="submit">
        Reservar
        <ArrowRight weight="bold" />
      </Button>
    </Form>
  )
}
