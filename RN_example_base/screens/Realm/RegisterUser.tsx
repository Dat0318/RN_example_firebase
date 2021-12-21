import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import Realm from 'realm';
let realm: any;

export class RealmRegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: 'Trần Duy Đạt',
      user_contact: '0986419381',
      user_address: 'Ta Thanh Oai, Thanh Trì, Ha Noi',
    };
    realm = new Realm({path: 'UserDatabase.realm'});
  }

  register_user = () => {
    var that = this;
    const {user_name} = this.state;
    const {user_contact} = this.state;
    const {user_address} = this.state;
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          realm.write(() => {
            var ID =
              realm.objects('user_details').sorted('user_id', true).length > 0
                ? realm.objects('user_details').sorted('user_id', true)[0]
                    .user_id + 1
                : 1;
            realm.create('user_details', {
              user_id: ID,
              user_name: that.state.user_name,
              user_contact: that.state.user_contact,
              user_address: that.state.user_address,
            });
            Alert.alert(
              'Success',
              'You are registered successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('RnRealm'),
                },
              ],
              {cancelable: false},
            );
          });
        } else {
          Alert.alert('Warning', 'Please fill Address');
        }
      } else {
        Alert.alert('Warning', 'Please fill Contact Number');
      }
    } else {
      Alert.alert('Warning', 'Please fill Name');
    }
  };

  render() {
    let {user_name, user_contact, user_address} = this.state;
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}
          >
            <Mytextinput
              placeholder="Enter Name"
              value={user_name}
              onChangeText={value => this.setState({value})}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={user_contact}
              onChangeText={value => this.setState({value})}
              maxLength={10}
              keyboardType="numeric"
            />
            <Mytextinput
              placeholder="Enter Address"
              value={user_address}
              onChangeText={value => this.setState({value})}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top'}}
            />
            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
