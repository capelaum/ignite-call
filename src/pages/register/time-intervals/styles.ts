import {
  Box,
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const IntervalBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column'
})

export const IntervalsContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
  marginBottom: '$4'
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600'
  }
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3'
})

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(1) brightness(0.5)'
  }
})

export const TimeIntervalsErrorMessage = styled(Text, {
  color: '#F75A68',
  marginBottom: '$4'
})
