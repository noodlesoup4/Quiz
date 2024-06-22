import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { midnightTeal } from '../model/Colors';
import { router } from "expo-router";
import RectangleComponent from '../components/Rectangle';



const playScreen = () => {
    return (
        <View style={styles.background}>
            <RectangleComponent onPress = {() => router.push("./category")}>
                <Text style = {styles.text}>Normal</Text>
                
            </RectangleComponent>

            <RectangleComponent>
                
                <Text style = {styles.text}>Survival</Text>
                
            </RectangleComponent>

            <RectangleComponent>
                <Text style = {styles.text}>Versus</Text>
                
            </RectangleComponent>
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
    text: {
        fontWeight: 'bold',
        fontSize: 30,
    }

});
