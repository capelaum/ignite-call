import {
  Heading,
  styled,
  Text
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const HomeContainer = styled('main', {
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  paddingLeft: '$5',

  // border: '1px solid red',

  marginLeft: 'auto',
  overflow: 'hidden',
  position: 'relative',

  minHeight: '100vh',
  width: '100%',
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',

  '@bp1': {
    flexDirection: 'column',
    maxWidth: '100%',
    padding: '$40 $5'
  }
})

export const HomeLeftContainer = styled('div', {
  maxWidth: 480,

  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  '@bp1': {
    textAlign: 'center'
  },

  '@bp2': {
    alignItems: 'center',
    maxWidth: 320,

    [`> ${Heading}`]: {
      fontSize: '$6xl'
    },

    [`> ${Text}`]: {
      fontSize: '$sm'
    }
  },

  '@bp3': {
    [`${Heading}`]: {
      fontSize: '$5xl'
    }
  }
})

export const HomeRightContainer = styled('div', {
  overflow: 'hidden',
  // border: '1px solid red',

  '@bp1': {
    width: '100%',
    paddingRight: '0 $4',

    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }
})

export const BgImageWrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})
