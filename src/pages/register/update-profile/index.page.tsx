import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Check } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormErrorMessage, Header, RegisterContainer } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  bio: z
    .string()
    .min(3, {
      message: 'Biografia deve ter no mínimo 3 letras.'
    })
    .max(100, {
      message: 'Biografia deve ter no máximo 100 letras.'
    })
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema)
  })

  const session = useSession()
  console.log('💥 ~ session:', session)

  async function handleUpdateProfile(data: UpdateProfileFormData) {}

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

      <ProfileBox
        as="form"
        onSubmit={handleSubmit(handleUpdateProfile)}
        autoComplete="off"
      >
        <label>
          <Text size="md">Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>

          {errors.bio && (
            <FormErrorMessage size="sm">{errors.bio.message}</FormErrorMessage>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <Check weight="bold" />
        </Button>
      </ProfileBox>
    </RegisterContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  )

  return {
    props: {
      session
    }
  }
}
