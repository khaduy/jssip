import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  passwordBox: {
    height: 40,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0.025 * windowHeight,
  },
  btnBox: {
    height: '20%',
    width: '100%',
    marginTop: 0.15 * windowHeight,
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
});

export default styles;
