import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function Splash() {
  const navigation = useNavigation()

  //Return onde pegamos a animação em .json e tranformamos na splash screen através do LottieView.
  //Parte onde também é controlada as propriedades da animação.
  return (
    <View style={styles.container}>


      <LottieView

        source={require('../../assets/splash.json')}
        autoPlay={true}
        loop={false}
        speed={0.7}
        onAnimationFinish={() => navigation.navigate('Login')}
      />

    </View>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
