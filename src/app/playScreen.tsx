import { StyleSheet, Text, View } from "react-native";

import { midnightTeal } from '../constants/Colors';

const playScreen = () => {
    return (
        <View style={styles.background}>
            <Text>Test2</Text>
        </View>
    );
}



export default playScreen;

const styles = StyleSheet.create({
  
    background: {
      height: "100%",
      backgroundColor: midnightTeal,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  