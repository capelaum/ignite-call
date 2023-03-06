import {
  Box,
  styled
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column'
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: '$2',
  borderRadius: '$md',
  border: '1px solid $gray600',
  padding: '$4 $6'
})
