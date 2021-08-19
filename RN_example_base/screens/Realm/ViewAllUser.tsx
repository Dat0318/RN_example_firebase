import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Realm from 'realm';
let realm: any;

export class RealmViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    realm = new Realm({path: 'UserDatabase.realm'});
    var user_details = realm.objects('user_details');
    this.state = {
      FlatListItems: user_details,
    };
    for (let i = 0; i < user_details.length; i++) {
      const ele = user_details[i];
      console.log('==ele=================================');
      console.log(ele);
      console.log('===================================');
    }
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#000'}} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={{backgroundColor: 'white', padding: 20}}>
                <Text>Id: {item.user_id}</Text>
                <Text>Name: {item.user_name}</Text>
                <Text>Contact: {item.user_contact}</Text>
                <Text>Address: {item.user_address}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
