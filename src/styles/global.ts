import { globalCss } from '@capelaum-packages/ignite-react-05-design-system-react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },

  html: {
    scrollBehavior: 'smooth',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    fontFamily: '$default',
    '-webkit-font-smoothing': 'antialiased',
  },

  'a, button': {
    all: 'unset',
    cursor: 'pointer',
    border: 'none',

    transition: '$fast',

    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})
