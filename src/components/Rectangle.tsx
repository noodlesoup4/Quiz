import { router } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { lightMint } from "../constants/Colors";
import { ReactNode } from "react";


interface RectangleComponentProps {
    children: ReactNode;
}

const RectangleButtonComponent: React.FC<RectangleComponentProps> = ({children}) => {
    return (
        <TouchableOpacity
            onPress={() => router.push("./category")}
            style={styles.button}>
            {children}

        </TouchableOpacity>

    );


}



const styles = StyleSheet.create({

    button: {
        height: 50,
        width: 200,
        backgroundColor: lightMint,
        borderRadius: 10,
        //padding: 12,
        //paddingLeft: 50,
        //paddingRight: 50,
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center'



    },





});


export default RectangleButtonComponent;