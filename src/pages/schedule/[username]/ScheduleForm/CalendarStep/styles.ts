import {
  Box,
  styled
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const CalendarStepContainer = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  position: 'relative',

  width: 540,
  gridTemplateColumns: '1fr',

  '@bp2': {
    width: '100%'
  }
})
