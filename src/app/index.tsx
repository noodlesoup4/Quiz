import { StyleSheet, View, TouchableOpacity } from 'react-native';



import { midnightTeal } from '../constants/Colors';

import Logo from '../assets/svgs/Quiz-App-Logo.svg';

import  PlayButtonComponent  from '../components/PlayButton';


const MainMenu = () => {

  return (
    <View style={styles.background}>
      <Logo style={styles.logoContainer}/>
     <PlayButtonComponent></PlayButtonComponent>
    </View>
  );
}

export default MainMenu;

const styles = StyleSheet.create({
  
  background: {
    height: "100%",
    backgroundColor: midnightTeal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: "-10%",
    width: 100,
    height: 100,
    
  },
  
});
