import { api } from '@/lib/axios'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormErrorMessage, Header, RegisterContainer } from './styles'

const registerFormSchema = z.object({
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
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .trim()
    .min(3, { message: 'Nome deve ter no mínimo 3 letras.' })
    .max(150, { message: 'Nome deve ter no máximo 150 letras.' })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      const { name, username } = data

      await api.post('/users', {
        username,
        name
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message)
        return
      }

      console.error('💥 ~ error:', error)
    }
  }

  return (
    <RegisterContainer>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form
        as="form"
        onSubmit={handleSubmit(handleRegister)}
        autoComplete="off"
      >
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            sizeValue="md"
            prefix="ignitecall.com.br/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {errors.username && (
            <FormErrorMessage size="sm">
              {errors.username.message}
            </FormErrorMessage>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            sizeValue="md"
            placeholder="Seu nome"
            {...register('name')}
          />
          {errors.name && (
            <FormErrorMessage size="sm">{errors.name.message}</FormErrorMessage>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </Form>
    </RegisterContainer>
  )
}
