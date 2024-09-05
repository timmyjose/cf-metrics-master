import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { RootStackParamsList } from '../App'
import React from 'react'

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPressIn={() => navigation.navigate('Demo')}>
          <Text>Demo</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
    height: 40,
    width: '40%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home
