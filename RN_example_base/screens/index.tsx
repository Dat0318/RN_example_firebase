import {Ama} from './Ama';
import {Analytics} from './Analytics';
import {Auth} from './Auth';
import {CacheImage} from './CacheImage';
import {Drive} from './Drive';
import {Lang} from './Lang';
import {List} from './List';
import {Map} from './Map';
import {PDF} from './PDF';
import {Print} from './Print';
import {DynamicLinks} from './DynamicLinks';
import {RealTime} from './RealTime';
import {You} from './You';

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
      <Stack.Screen name="Ama" component={Ama} />
      <Stack.Screen name="Drive" component={Drive} />
      <Stack.Screen name="Lang" component={Lang} />
      <Stack.Screen name="PDF" component={PDF} />
      <Stack.Screen name="Print" component={Print} />
      <Stack.Screen name="You" component={You} />
      <Stack.Screen name="CacheImage" component={CacheImage} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="DynamicLinks" component={DynamicLinks} />
      <Stack.Screen name="RealTime" component={RealTime} />
    </Stack.Navigator>
  );
}

export default Navigation;
