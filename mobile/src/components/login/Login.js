import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../redux/action/updateAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Da vao trang');
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    const info = {
      username,
      password,
    };
    const {data} = await axios.post(`http://192.168.0.114:5000/login`, info);
    if ((data == false)) {
      Alert.alert(
        'Thông báo',
        'Vui lòng kiểm tra lại tên người dùng hoặc mật khẩu',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } else {
      console.log('data: ', data.username);
      dispatch(updateUser(data.username));
      // navigation.navigate('Home');
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  return (
    <ImageBackground
      style={{height: '100%', width: '100%'}}
      source={require('../../images/background.jpg')}
      resizeMode="stretch">
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: '100%', width: '100%'}}>
          <View
            style={{
              height: '100%',
              width: '100%',
              marginTop: 0.35 * windowHeight,
              alignItems: 'center',
            }}>
            {/* Email */}
            <View
              style={{
                height: 40,
                width: '70%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Username
              </Text>
              <TextInput
                style={{
                  height: '100%',
                  width: '70%',
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                  textAlign: 'right',
                  paddingRight: 40,
                  color: 'white',
                }}
                autoCapitalize="none"
                onChangeText={setUsername}
              />
            </View>
            {/* Password */}
            <View style={styles.passwordBox}>
              <Text
                style={{
                  color: 'white',
                }}>
                Password
              </Text>
              <TextInput
                style={{
                  height: '100%',
                  width: '70%',
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                  textAlign: 'right',
                  paddingRight: 40,
                  color: 'white',
                }}
                autoCapitalize="none"
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            {/* Button  */}
            <View style={styles.btnBox}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  login();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}>
                  Đăng Nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
