import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import PlayButton from '../assets/svgs/Quiz-App-Play-Button.svg';



const PlayButtonComponent = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("./QuestionScreen")}
      style={styles.playContainer}>
      <PlayButton/>
    </TouchableOpacity>
  );

}
const styles = StyleSheet.create({

  playContainer: {
    marginTop: "40%",
    width: 100,
    height: 100,
  }
})

export default PlayButtonComponent;