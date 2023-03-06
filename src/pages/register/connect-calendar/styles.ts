import {
  Box,
  styled,
  Text
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

  marginBottom: '$4',
  borderRadius: '$md',
  border: '1px solid $gray600',
  padding: '$4 $6'
})

export const AuthPermissionErrorMessage = styled(Text, {
  color: '#F75A68',
  marginBottom: '$4'
})
