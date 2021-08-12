import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//import md5 to use md5()
import md5 from 'md5';
import {sha256, sha1} from 'react-native-sha256';

export const Md5 = () => {
  const [inputText, setInputText] = useState('123456');
  const [text, setText] = useState('');
  const [sha, setSha] = useState('');
  const [shaOne, setShaOne] = useState('');

  const convertMD5 = () => {
    let encodedVal = md5(inputText);
    setText(encodedVal);
  };
  const convertSHA = () => {
    //Encode SHA256
    sha256(inputText).then(hash => {
      setSha(hash);
    });
    sha1(inputText).then(hash => {
      setShaOne(hash);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Example to Convert any Input Value in MD5 in React Native
        </Text>
        <Text style={styles.textStyle}>{text}</Text>
        <Text style={styles.textStyle}>{sha}</Text>
        <Text style={styles.textStyle}>{shaOne}</Text>
        <Text style={styles.textStyle}>
          Please insert any value to convert in md5
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={inputText => setInputText(inputText)}
          placeholder="Enter Any Value"
          value={inputText}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={convertMD5}>
          <Text style={styles.buttonTextStyle}>Conver to MD5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={convertSHA}>
          <Text style={styles.buttonTextStyle}>Conver to SHA256</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Md5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 30,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
