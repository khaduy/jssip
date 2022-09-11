// SCREEN CALL PHONE
import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import JsSIP from 'react-native-jssip';
import { useSelector} from 'react-redux';

//import RNImmediatePhoneCall from "react-native-immediate-phone-call";

var socket = new JsSIP.WebSocketInterface('wss://sbc03.tel4vn.com:7444');

var configuration = {
  sockets: [socket],
  uri: '107@2-test1.gcalls.vn:50061',
  password: 'test1107',
  // session_timers: false,
};

var ua = new JsSIP.UA(configuration);
// Register callbacks to desired call events
var eventHandlers = {
  progress: function (e) {
    console.log('call is in progress');
  },
  failed: function (e) {
    console.log('call failed with cause: ' + e.message.data);
    // console.log("call failed with cause: " + JSON.stringify(e));
  },
  ended: function (e) {
    console.log('call ended with cause: ' + e.data.cause);
  },
  confirmed: function (e) {
    console.log('call confirmed');
  },
};

var options = {
  eventHandlers: eventHandlers,
  mediaConstraints: {audio: true, video: true},
  sessionTimersExpires: 1800,
};

function Home({navigation}) {
  const [number, setNumber] = useState('');
  const info = useSelector(state => state.personalInfo);

  let deleteIcon = number.length ? require('./delete_number.png') : null;

  function onPress(n) {
    setNumber(number + n);
  }

  function onPressPhone() {
    console.log(number);
    //RNImmediatePhoneCall.immediatePhoneCall(number);
  }

  function deleteNum() {
    setNumber(number.substring(0, number.length - 1));
  }
  function deleteAllNum() {
    setNumber(number.substring(0, 0));
  }
  useEffect(() => {
    ua.start();
  }, []);

  return (
    <View style={styles.app}>
      <View style={styles.top}>
        <Text style={styles.textTop}>Tên người dùng: {info.user}</Text>
        <TouchableOpacity
          style={styles.textTop}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            Đăng Xuất
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', height: '20%'}}>
        <Text style={styles.phoneNumber}> {number} </Text>
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            deleteNum();
          }}
          onLongPress={() => {
            deleteAllNum();
          }}>
          <Image style={styles.deleteLogo} source={deleteIcon} />
        </Pressable>
      </View>

      <View style={{flexDirection: 'column', height: '100%'}}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onPress('1')}>
            <Text style={styles.centerText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('2')}>
            <Text style={styles.centerText}>2</Text>
            <Text style={styles.text}>ABC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('3')}>
            <Text style={styles.centerText}>3</Text>
            <Text style={styles.text}>DEF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onPress('4')}>
            <Text style={styles.centerText}>4</Text>
            <Text style={styles.text}>GHI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('5')}>
            <Text style={styles.centerText}>5</Text>
            <Text style={styles.text}>JKL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('6')}>
            <Text style={styles.centerText}>6</Text>
            <Text style={styles.text}>MNO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onPress('7')}>
            <Text style={styles.centerText}>7</Text>
            <Text style={styles.text}>PQRS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('8')}>
            <Text style={styles.centerText}>8</Text>
            <Text style={styles.text}>TUV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('9')}>
            <Text style={styles.centerText}>9</Text>
            <Text style={styles.text}>WXYZ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onPress('*')}>
            <Text style={{fontSize: 65, textAlign: 'center', paddingTop: '3%'}}>
              *
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('0')}>
            <Text style={styles.centerText}>0</Text>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress('#')}>
            <Text
              style={{fontSize: 42, textAlign: 'center', paddingTop: '10%'}}>
              #
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={{width: '33%'}}></View>
          <TouchableOpacity
            style={styles.buttonPhone}
            // onPress={() => onPressPhone()}
            onPress={() => {
              console.log('abc');
              console.log(ua.isConnected());
              ua.call('0386580528', options);
              // sip:'+number+'@'+GLOBAL.jssip_server
            }}>
            <Image
              style={styles.phoneLogo}
              source={require('./phone-icon-white.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    height: '100%',
  },
  top: {
    width: '100%',
    height: '20%',
    backgroundColor: '#007bff',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#98989c',
  },
  textTop: {
    fontSize: 28,
    padding: 20,
    color: 'white',
  },
  button: {
    width: '33.333%',
    backgroundColor: 'none',
    borderColor: '#d4d4d4',
    borderWidth: 2,
  },
  buttonPhone: {
    width: '33.333%',
    height: '70%',
    marginVertical: '3%',
    borderRadius: 30,
    backgroundColor: '#007bff',
  },
  phoneLogo: {
    width: '23%',
    height: '74%',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  deleteLogo: {
    width: '80%',
    height: '95%',
    alignSelf: 'center',
  },
  deleteButton: {
    width: '20%',
    height: '25%',
    marginTop: '13%',
  },
  phoneNumber: {
    fontSize: 36,
    paddingTop: '10%',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '80%',
    color: '#000',
  },
  centerText: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: '3%',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    height: '12%',
  },
});

export default Home;
