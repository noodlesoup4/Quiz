import { Text, Image, StyleSheet, View, Button } from 'react-native';

import { Link, router } from 'expo-router';

import { midnightTeal } from '../constants/Colors';



export default function HomeScreen() {
  return (
    <View style={styles.background}>
      <Text>Test</Text>
      <Image></Image>
      <Link href="/playScreen">Hier Klicken</Link>
      <Button onPress={() => router.push("/playScreen")}
        title='play2'>
      </Button>
    </View>
  );
}

  

const styles = StyleSheet.create({
  
 background:{
  flex: 1,
  backgroundColor: midnightTeal
 }
});
