import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import firestore from '@react-native-firebase/firestore';

export const RegisterUser = props => {
  let [userName, setUserName] = useState('acancsancslancsa');
  let [userContact, setUserContact] = useState('90371094719047109');
  let [userAddress, setUserAddress] = useState('kaclkasncnanlcankclsa');

  const handleRegistration = async () => {
    if (userName && userContact && userAddress) {
      /*
        "add()" method adds the new document with a random unique ID
        If you'd like to specify your own ID then use "set()" method
        firestore()
          .collection('Users')
          .doc('101')
          .set({
            name: userName,
            contact: userContact,
            address: userAddress,
          })
        .then(() => {
          console.log('User added!');
        });
      */
      let save = await firestore().collection('Users').add({
        name: userName,
        contact: userContact,
        address: userAddress,
      });
      console.log('===================================');
      console.log(save);
      console.log('===================================');
      // firestore().collection('Users').add({
      //   name: userName,
      //   contact: userContact,
      //   address: userAddress,
      // }).then(res => {
      //   console.log('===================================');
      //   console.log(res);
      //   console.log('===================================');
      //   Alert.alert(
      //     'Success',
      //     'You are Registered Successfully',
      //     [
      //       {
      //         text: 'Ok',
      //         onPress: () => props.navigation.navigate('FileStore'),
      //       },
      //     ],
      //     {cancelable: false},
      //   );
      // })
      // .catch(error => {
      //   Alert.alert(
      //     'Exception',
      //     error.toString(),
      //     [
      //       {
      //         text: 'Ok',
      //         onPress: () => props.navigation.navigate('FileStore'),
      //       },
      //     ],
      //     {cancelable: false},
      //   );
      // });

      /*
        You can also add the data using set instead of push
        but in that case you have to provide the user id by
        your own as NoSql DBs have no concept of auto increment
      */
      /*
        firebase.database()
          .ref("users/<You custome key for the User>")
          .set({
            name: userName,
            contact: userContact,
            address: userAddress
          }).then(()=>{
          Alert.alert(
            'Success','You are Registered Successfully',
            [{
              text: 'Ok',
              onPress:
              () => props.navigation.navigate('FileStore')}
            ],{ cancelable: false });
      });*/
    } else {
      Alert.alert('Fill details', 'Please fill all the details');
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35,
      }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'space-between'}}
        >
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={userName => setUserName(userName)}
            value={userName}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Contact No"
            onChangeText={userContact => setUserContact(userContact)}
            value={userContact}
            maxLength={10}
            keyboardType="numeric"
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Address"
            onChangeText={userAddress => setUserAddress(userAddress)}
            value={userAddress}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{
              textAlignVertical: 'top',
              padding: 10,
            }}
          />
          <Mybutton title="Submit" customClick={handleRegistration} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default RegisterUser;
