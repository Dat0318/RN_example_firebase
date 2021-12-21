import React from 'react';
import {View} from 'react-native';
import Mybutton from './Components/Mybutton';
import Mytext from './Components/Mytext';

export const FileStore = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 35,
      }}
    >
      <Mytext text="Firebase Cloud Firestore Database Example" />
      <Mybutton
        title="Register (Add a Document)"
        customClick={() => props.navigation.navigate('RegisterUser')}
      />
      <Mybutton
        title="Update (Update any Field of Document)"
        customClick={() => props.navigation.navigate('UpdateUser')}
      />
      <Mybutton
        title="View (View a Single Document Record)"
        customClick={() => props.navigation.navigate('ViewUser')}
      />
      <Mybutton
        title="View All (View All Document Records)"
        customClick={() => props.navigation.navigate('ViewAllUser')}
      />
      <Mybutton
        title="Delete (Remove a Document/Field)"
        customClick={() => props.navigation.navigate('DeleteUser')}
      />
      <Mybutton
        title="Real Time Updates"
        customClick={() => props.navigation.navigate('RealTimeAddUpdateUser')}
      />
      <Mybutton
        title="Add Collection Under Document"
        customClick={() => props.navigation.navigate('AddOrderSummary')}
      />
    </View>
  );
};

export default FileStore;
