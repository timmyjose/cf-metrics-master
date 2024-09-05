import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'
import { Reclaim } from '@reclaimprotocol/reactnative-sdk'
import { RECLAIM_APP_ID, RECLAIM_DEEPLINK_URL, RECLAIM_SECRET } from '../config/env'

// GitHub user name provider
const GH_USER_NAME_PROVIDER_ID = '6d3f6753-7ee6-49ee-a545-62f1b1822ae5'

const Demo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  const [proof, setProof] = useState<string | null>('')
  const [error, setError] = useState<string | null>('')

  const reclaimClient = new Reclaim.ProofRequest(RECLAIM_APP_ID)
  const APP_SECRET = RECLAIM_SECRET

  async function startVerificationFlow() {
    const providerIds = [GH_USER_NAME_PROVIDER_ID];
    
    const appDeepLink = RECLAIM_DEEPLINK_URL
    reclaimClient.setAppCallbackUrl(appDeepLink)

    reclaimClient.addContext('0xcafebabe', 'custom message')
 
    try {
      await reclaimClient.buildProofRequest(providerIds[0], true) // redirect!
    } catch (err: any) {
      Alert.alert(`Proof error: ${err}`)
    }
 
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    )

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest()
    console.log(`requestUrl = ${requestUrl}, statusUrl = ${statusUrl}`)

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        Alert.alert('Verification success')
        setProof(JSON.stringify(proof, null, 2))
      },
      onFailureCallback: error => {
        Alert.alert('Verification failure')
        setError(error.toString())
      }
    })
  }

  return (
    <View style={styles.container}>
      { !!proof && (
        <ScrollView>
          <Text>{proof}</Text>
        </ScrollView>
      )}
      { !!error && (
        <Text>{error}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={startVerificationFlow}>
          <Text>Start Verification</Text>
        </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
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

export default Demo
