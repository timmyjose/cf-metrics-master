import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from './screens/Home'
import Demo from './screens/Demo'
import * as Linking from 'expo-linking'

// Set up Deep Links support
const prefix = Linking.createURL('/')

export type RootStackParamsList = {
  Home: undefined
  Demo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamsList>()

const App = () => {
  const linking = {
    prefixes: [prefix, 'cfmm://', 'cfmm:'],
    config: {
      screens: {
        Demo: 'demo'
      }
    }
  }

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Demo' component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
