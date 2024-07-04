import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const GamemodeSelectionScreen = () => {
  return (
   <LinearGradient
      colors={['#135D66', '#EFF0F3']}
      style={styles.container}
      locations={[0.2, 0.2]}
    >
      


    </LinearGradient>

  )
}

export default GamemodeSelectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})