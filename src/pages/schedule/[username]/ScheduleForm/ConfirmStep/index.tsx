import { api } from '@/lib/axios'
import { FormErrorMessage } from '@/pages/register/styles'
import {
  Button,
  Text,
  TextArea,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
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

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation
}: ConfirmStepProps) {
  console.log('💥 ~ schedulingDate:', schedulingDate)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data

    try {
      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate
      })

      await router.push(
        `/schedule/${username}/success?name=${name}&date=${dayjs(
          schedulingDate
        )}`
      )

      toast.success('Agendamento feito com sucesso!')
    } catch (error) {
      toast.error('Erro ao agendar horário. Por favor, tente novamente.')
      console.error('💥 ~ error:', error)
    }
  }

  const schedulingDateFormatted = dayjs(schedulingDate).format(
    'DD[ de ]MMMM[ de ]YYYY'
  )

  const schedulingTimeFormatted = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <ConfirmFormHeader>
        <Text>
          <CalendarBlank />
          {schedulingDateFormatted}
        </Text>
        <Text>
          <Clock />
          {schedulingTimeFormatted}
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
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmFormActions>
    </ConfirmForm>
  )
}
