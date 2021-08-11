import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import firestore from '@react-native-firebase/firestore';

export const UpdateUser = props => {
  let [userId, setUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  const searchUser = () => {
    if (userId) {
      firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          /*
            A DocumentSnapshot belongs to a specific document,
            With snapshot you can view a documents data,
            metadata and whether a document actually exists.
          */
          if (documentSnapshot.exists) {
            setUserName(documentSnapshot.data().name);
            setUserContact(documentSnapshot.data().contact);
            setUserAddress(documentSnapshot.data().address);
          } else {
            setUserName('');
            setUserContact('');
            setUserAddress('');
          }
        });
    }
  };

  const updateUser = () => {
    if (userId && userName && userContact && userAddress) {
      /*
        Please note update is not just for the update in firebase,
        while updating if record not found in firebase then
        it will create one, update Method also provides support for
        updating deeply nested values via dot-notation
        .update({ 'details.address.zipcode': 452012 })
      */

      firestore()
        .collection('Users')
        .doc(userId)
        .update({
          name: userName,
          contact: userContact,
          address: userAddress,
        })
        .then(() => {
          Alert.alert(
            'Success',
            'Updated Successfully',
            [
              {
                text: 'Ok',
                onPress: () => props.navigation.navigate('FileStore'),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(error => {
          Alert.alert(
            'Exception',
            error,
            [
              {
                text: 'Ok',
                onPress: () => props.navigation.navigate('FileStore'),
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35,
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'space-between'}}>
          <Mytextinput
            placeholder="Enter User Id"
            style={{padding: 10}}
            value={userId}
            onChangeText={userId => setUserId(userId)}
          />
          <Mybutton title="Search User" customClick={searchUser} />
          <Mytextinput
            placeholder="Enter Name"
            value={userName}
            style={{padding: 10}}
            onChangeText={userName => setUserName(userName)}
          />
          <Mytextinput
            placeholder="Enter Contact No"
            value={'' + userContact}
            onChangeText={userContact => setUserContact(userContact)}
            maxLength={10}
            style={{padding: 10}}
            keyboardType="numeric"
          />
          <Mytextinput
            value={userAddress}
            placeholder="Enter Address"
            onChangeText={userAddress => setUserAddress(userAddress)}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mybutton title="Update User" customClick={updateUser} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default UpdateUser;
