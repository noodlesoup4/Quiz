
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { lightMint, white } from "../model/Colors";
import { ReactNode } from "react";


interface CustomButtonProps {
    children: ReactNode;
    onPress?: () => void;
    style? : ViewStyle;
    backgroundColor? : string;
}

const CustomButtonComponent: React.FC<CustomButtonProps> = ({children,onPress,style,backgroundColor}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button,style,backgroundColor ? {backgroundColor} : {} ]}>
            {children}

        </TouchableOpacity>

    );


}



const styles = StyleSheet.create({

    button: {
        top: 40,
        height: 90,
        width: 200,
        borderRadius: 15,
        backgroundColor: white,
        margin: 35,
        alignItems: 'center',
        justifyContent: 'center'



    },





});


export default CustomButtonComponent;