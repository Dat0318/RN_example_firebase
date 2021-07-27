import {Analytics} from './Analytics';
import {Auth} from './Auth';
import {Demo} from './Demo';
import {DynamicLinks} from './DynamicLinks';
import {RealTime} from './RealTime';
import {List} from './List';

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export function Navigation() {
  return (
    <Stack.Navigator
      headerMode="none"
      //  initialRouteName= "Home"
    >
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Demo" component={Demo} />
      <Stack.Screen name="DynamicLinks" component={DynamicLinks} />
      <Stack.Screen name="RealTime" component={RealTime} />
    </Stack.Navigator>
  );
}

export default Navigation;
