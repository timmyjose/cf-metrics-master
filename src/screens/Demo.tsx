import { View, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'
import { Reclaim } from '@reclaimprotocol/reactnative-sdk'
import { RECLAIM_APP_ID, RECLAIM_SECRET } from '../config/env'

const Demo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  const reclaimClient = new Reclaim.ProofRequest(RECLAIM_APP_ID)
  const APP_SECRET = RECLAIM_SECRET

  async function startVerificationFlow() {
    const providerIds = [
        'fa461d99-0ccb-4db4-9c4e-792ce4d89fa3', // CF Stats
      ];
    
 
    const appDeepLink = 'YOUR_APP_DEEP_LINK_HERE' //TODO: replace with your app deep link
    reclaimClient.setAppCallbackUrl(appDeepLink)
 
    await reclaimClient.addContext(
      ("users address"),
      ("add a message")
    )
 
    const requestProofs = await reclaimClient.buildProofRequest(providerIds[0])
    console.log(`requestProofs = ${JSON.stringify(requestProofs, null, 2)}`)
 
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    )

    console.log('HERE?')
 
    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest()
    console.log(`requestUrl = ${requestUrl}, statusUrl = ${statusUrl}`)

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof)
        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error)
        // Your business logic here to handle the error
      }
    })
  }
  return (
    <View style={styles.container}>
      <Button title='Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Start Verification' onPress={startVerificationFlow} />
    </View>
  )
}

// import { SafeAreaView, Text, View, Pressable, StyleSheet, Button } from 'react-native'
// import { Reclaim } from '@reclaimprotocol/reactnative-sdk'
// import { useNavigation } from '@react-navigation/native'
// import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { RootStackParamsList } from '../App'
// import { RECLAIM_APP_ID, RECLAIM_SECRET } from '../config/env'
// import React from 'react'
 
// const Demo = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

//   const reclaimClient = new Reclaim.ProofRequest(RECLAIM_APP_ID)
//   const APP_SECRET = RECLAIM_SECRET
 
//   async function startVerificationFlow() {
//     const providerIds = [
//         'fa461d99-0ccb-4db4-9c4e-792ce4d89fa3', // CF Stats
//       ];
    
 
//     const appDeepLink = 'YOUR_APP_DEEP_LINK_HERE' //TODO: replace with your app deep link
//     reclaimClient.setAppCallbackUrl(appDeepLink)
 
//     await reclaimClient.addContext(
//       ("users address"),
//       ("add a message")
//     )
 
//     await reclaimClient.buildProofRequest(providerIds[0])
 
//     reclaimClient.setSignature(
//       await Reclaim.generateSignature(requestProofs, APP_SECRET)
//     )
 
    
//     const { requestUrl, statusUrl } =
//       await reclaimClient.createVerificationRequest()


//     await reclaimClient.startSession({
//       onSuccessCallback: proof => {
//         console.log('Verification success', proof)
//         // Your business logic here
//       },
//       onFailureCallback: error => {
//         console.error('Verification failed', error)
//         // Your business logic here to handle the error
//       }
//     })
//   }
 
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <Button title='Home' onPress={() => navigation.navigate('Home')} />
//         <Pressable onPress={startVerificationFlow}>
//           <Text>Start Verification Flow</Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Demo
