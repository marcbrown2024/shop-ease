import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

type Props = {}

const InAppLoading = (props: Props) => {
  return (
<LottieView source={require('../../assets/images/')} autoPlay loop />
  )
}

export default InAppLoading