import {
  Box,
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const CalendarStepContainer = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@bp1': {
          gridTemplateColumns: '1fr'
        }
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr'
      }
    }
  },

  '@bp2': {
    width: '100%'
  }
})

export const TimePickerContainer = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',

  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,

  // set scrollbar styles
  '&::-webkit-scrollbar': {
    width: 8,
    height: 8,
    borderRadius: '$sm'
  },

  '&::-webkit-scrollbar-track': {
    background: '$gray600',
    borderRadius: '$sm',
    border: '1px solid $gray600'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$gray500',
    borderRadius: '$sm',
    border: '1px solid $gray500',

    transition: '$fast',

    '&:hover': {
      background: '$gray400'
    },

    '&:active': {
      background: '$gray400'
    }
  }
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200'
  }
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@bp1': {
    gridTemplateColumns: '2fr'
  }
})

export const TimePickerItem = styled('button', {
  backgroundColor: '$gray600',
  padding: '$2 0',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:last-child': {
    marginBottom: '$6'
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4
  },

  '&:not(:disabled):hover': {
    background: '$gray500'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100'
  }
})
