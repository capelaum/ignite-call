import {
  Box,
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@bp2': {
    gridTemplateColumns: '1fr',
    gap: '$3'
  }
})

export const FormMessage = styled(Text, {
  color: '$gray400',

  variants: {
    hasError: {
      true: {
        color: '#F75A68'
      }
    }
  }
})
