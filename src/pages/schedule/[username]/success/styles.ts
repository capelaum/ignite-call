import {
  Heading,
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const SuccessContainer = styled('main', {
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$6',

  padding: '$6',

  [`${Heading}`]: {
    textAlign: 'center',
    maxWidth: '350px'
  },

  [`${Text}`]: {
    textAlign: 'center',
    maxWidth: '400px'
  }
})
