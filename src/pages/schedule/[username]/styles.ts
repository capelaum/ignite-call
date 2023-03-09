import {
  Heading,
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const ScheduleContainer = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4'
})

export const UserHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2'
  },

  [`> ${Text}`]: {
    color: '$gray200'
  }
})
