import { AppPreview, HomeBg } from '@/assets'
import {
  Heading,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import {
  BgImageWrapper,
  HomeContainer,
  HomeLeftContainer,
  HomeRightContainer
} from './styles'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home | Ignite Call"
        description="Agendamento fácil com o Google Calendar 🚀"
      />
      <HomeContainer>
        <BgImageWrapper>
          <Image
            src={HomeBg}
            alt="Imagem de background de grade em cinza meio escuro"
          />
        </BgImageWrapper>

        <HomeLeftContainer>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="lg">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />
        </HomeLeftContainer>

        <HomeRightContainer>
          <Image
            priority
            src={AppPreview}
            alt="Calendário simbolizando a aplicação de agendamento em funcionamento."
            quality={100}
          />
        </HomeRightContainer>
      </HomeContainer>
    </>
  )
}
