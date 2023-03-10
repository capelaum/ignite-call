import { FormErrorMessage } from '@/pages/register/styles'
import {
  Button,
  Text,
  TextArea,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfirmForm, ConfirmFormActions, ConfirmFormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Nome deve ter no mínimo 3 letras.' })
    .max(180, { message: 'Nome deve ter no máximo 180 letras.' }),
  email: z.string().email({
    message: 'Digite um e-mail válido.'
  }),
  observations: z.string().optional()
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })

  function handleConfirmScheduling(data: ConfirmFormData) {}

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <ConfirmFormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </ConfirmFormHeader>

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

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          sizeValue="md"
          type="email"
          placeholder="Seu e-mail"
          {...register('email')}
        />

        {errors.email && (
          <FormErrorMessage size="sm">{errors.email.message}</FormErrorMessage>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea
          placeholder="Alguma observação?"
          {...register('observations')}
        />
      </label>

      <ConfirmFormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmFormActions>
    </ConfirmForm>
  )
}
