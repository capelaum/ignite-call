import {
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',

  '@bp2': {
    padding: '$2'
  }
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200'
  }
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    lineHeight: 0,
    borderRadius: '$sm',
    padding: '$1',

    svg: {
      width: '$5',
      height: '$5'
    },

    '&:hover': {
      color: '$gray100'
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100'
    }
  }
})

export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm'
  },

  'tbody:before': {
    lineHeight: '0.75rem',
    content: '.',
    display: 'block',
    color: '$gray800'
  },

  'tbody td': {
    boxSizing: 'border-box'
  },

  '@bp3': {
    'thead th': {
      fontSize: '$xs'
    },

    'tbody td': {
      fontSize: '$xs'
    }
  }
})

export const CalendarDay = styled('button', {
  width: '100%',
  aspectRatio: '1 / 1',
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

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
