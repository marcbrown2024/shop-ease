import { View, Text } from 'react-native'
import React from 'react'

type Props = {}

const SavedLists = (props: Props) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-black text-xl">Saved Lists</Text>
    </View>
  )
}

export default SavedLists