import {
  Box,
  styled,
  Text,
  TextArea
} from '@capelaum-packages/ignite-react-05-design-system-react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    [`> ${TextArea}`]: {
      resize: 'vertical',
      minHeight: 120,
      maxHeight: 360
    }
  }
})

export const FormAnnotation = styled(Text, {
  color: '$gray200'
})
