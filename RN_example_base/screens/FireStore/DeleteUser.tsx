import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import firestore from '@react-native-firebase/firestore';

export const DeleteUser = props => {
  let [userId, setUserId] = useState('');

  const deleteUser = () => {
    if (userId) {
      /* "delete()" method will delete the whole document
        If you want to delete any field from the document
        then you can use "FieldValue"
        Ref: https://rnfirebase.io/reference/firestore/fieldvalue
        firestore().collection('Users').doc('101')
        .update({
          age: firestore.FieldValue.delete(),
        });
      */
      firestore()
        .collection('Users')
        .doc(userId)
        .delete()
        .then(() => {
          Alert.alert(
            'Success',
            'Deleted Successfully',
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
      alert('Please Enter ID');
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35,
      }}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={userId => setUserId(userId)}
        style={{padding: 10}}
      />
      <Mybutton title="Delete User" customClick={deleteUser} />
    </View>
  );
};

export default DeleteUser;
