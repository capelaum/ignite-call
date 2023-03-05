import {
  Button,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './styles'

const claimUsernameFormSchema = z.object({
  username: z.string().min(3).max(20)
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log('💥 ~ data:', data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        sizeValue="sm"
        prefix="ignitecall.com.br/"
        placeholder="seu-usuario"
        {...register('username')}
      />

      <Button size="sm" type="submit">
        Reservar
        <ArrowRight weight="bold" />
      </Button>
    </Form>
  )
}
