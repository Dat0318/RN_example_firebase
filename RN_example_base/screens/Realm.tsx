import React from 'react';
import {View} from 'react-native';
import Mybutton from './Components/Mybutton';
import Mytext from './Components/Mytext';
import Realm from 'realm';

let realm: any;

export class RnRealm extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: {type: 'int', default: 0},
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Mytext text="RealM Example" />
        <Mybutton
          title="Register"
          customClick={() =>
            this.props.navigation.navigate('RealmRegisterUser')
          }
        />
        <Mybutton
          title="Update"
          customClick={() => this.props.navigation.navigate('RealmUpdateUser')}
        />
        <Mybutton
          title="View"
          customClick={() => this.props.navigation.navigate('RealmViewUser')}
        />
        <Mybutton
          title="View All"
          customClick={() => this.props.navigation.navigate('RealmViewAllUser')}
        />
        <Mybutton
          title="Delete"
          customClick={() => this.props.navigation.navigate('RealmDeleteUser')}
        />
      </View>
    );
  }
}
