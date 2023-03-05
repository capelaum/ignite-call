import {
  Button,
  Text,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormMessage } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Nome de usuário deve ter no mínimo 3 letras.'
    })
    .max(100, {
      message: 'Nome de usuário deve ter no máximo 100 letras.'
    })
    .regex(/^[a-zA-Z][a-zA-Z0-9-_]*$/, {
      message:
        'Nome de usuário deve começar com uma letra e conter apenas letras, números, hífens e underlines.'
    })
    .transform((username) => username.toLowerCase())
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema)
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log('💥 ~ data:', data)
  }

  return (
    <>
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
      <FormMessage hasError={!!errors.username}>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite um nome de usuário'}
        </Text>
      </FormMessage>
    </>
  )
}
