import React from 'react';
import {View, Alert} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import Realm from 'realm';

let realm: any;

export class RealmDeleteUser extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({path: 'UserDatabase.realm'});
    this.state = {
      input_user_id: '',
    };
  }
  deleteUser = () => {
    var that = this;
    const {input_user_id} = this.state;
    realm.write(() => {
      var ID = this.state.input_user_id;
      if (
        realm.objects('user_details').filtered('user_id =' + input_user_id)
          .length > 0
      ) {
        realm.delete(
          realm.objects('user_details').filtered('user_id =' + input_user_id),
        );
        var user_details = realm.objects('user_details');
        console.log(user_details);
        Alert.alert(
          'Success',
          'User deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => that.props.navigation.navigate('RnRealm'),
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert('Warning', 'Please insert a valid User Id');
      }
    });
  };
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Mytextinput
          placeholder="Enter User Id"
          onChangeText={input_user_id => this.setState({input_user_id})}
        />
        <Mybutton
          title="Delete User"
          customClick={this.deleteUser.bind(this)}
        />
      </View>
    );
  }
}
