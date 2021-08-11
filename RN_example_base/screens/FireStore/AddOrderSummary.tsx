import React, {useState} from 'react';
import {View} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import firestore from '@react-native-firebase/firestore';

export const AddOrderSummary = () => {
  // We will insert these Dummy Order in use collection
  const dummyOrder = [
    {
      itemId: 1,
      itemName: 'T-Shirt',
      itemQuantity: 5,
      amount: 5000,
    },
    {
      itemId: 2,
      itemName: 'Shoe',
      itemQuantity: 2,
      amount: 2000,
    },
  ];

  let [userId, setUserId] = useState('');
  let [userData, setUserData] = useState({});

  const searchUser = () => {
    if (userId) {
      firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          let userDetails = {};
          if (documentSnapshot.exists) {
            userDetails = documentSnapshot.data();
            userDetails['id'] = documentSnapshot.id;
          }
          setUserData(userDetails);
        });
    }
  };

  const updateOrder = () => {
    if (userId) {
      let newOrderCollection = firestore()
        .collection('Users')
        .doc(userId)
        .collection('ordersummary');
      dummyOrder.forEach(item => {
        newOrderCollection
          .add(item)
          .then(() => {
            alert('Added Successfully');
          })
          .catch(error => {
            alert(`Exception: ${error}`);
          });
      });
    }
  };

  return (
    <View style={{paddingHorizontal: 35}}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={userId => setUserId(userId)}
        value={userId}
        style={{padding: 10}}
      />
      <Mybutton title="Search User" customClick={searchUser} />
      {Object.keys(userData).length ? (
        <Mybutton
          title="Add Order in User Document"
          customClick={updateOrder}
        />
      ) : null}
    </View>
  );
};

export default AddOrderSummary;
