import { api } from '@/lib/axios'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Header, RegisterContainer } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
  TimeIntervalsErrorMessage
} from './styles'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().int().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana.'
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        enabled: interval.enabled,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime)
      }))
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - interval.startTimeInMinutes >= 60
        ),
      {
        message: 'O intervalo de tempo deve ser de pelo menos 1 hora '
      }
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes % 60 === 0 &&
            interval.startTimeInMinutes % 60 === 0
        ),
      {
        message: 'Os horários de início e fim devem ser em horas completas.'
      }
    )
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<TimeIntervalsFormInput | TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' }
      ]
    }
  })

  const router = useRouter()

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals'
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(
    data: TimeIntervalsFormInput | TimeIntervalsFormOutput
  ) {
    const { intervals } = data

    try {
      await api.post('/users/time-intervals', {
        intervals
      })

      toast.success('Sua disponibilidade foi salva!')

      await router.push('/register/update-profile')
    } catch (error) {
      toast.error('Ooops.. Ocorreu um erro ao salvar sua disponibilidade.')
      console.error('💥 ~ error:', error)
    }
  }

  return (
    <RegisterContainer>
      <Header>
        <Heading as="strong">Defina sua disponibilidade</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked === true)
                      }}
                    />
                  )}
                />

                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>

              <IntervalInputs>
                <TextInput
                  sizeValue="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />

                <TextInput
                  sizeValue="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals && (
          <TimeIntervalsErrorMessage size="sm">
            {errors.intervals.message}
          </TimeIntervalsErrorMessage>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </IntervalBox>
    </RegisterContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  )

  if (!session) {
    return {
      redirect: {
        destination: '/register',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
