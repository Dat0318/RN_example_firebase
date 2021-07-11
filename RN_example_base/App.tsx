import React, {useEffect, useRef} from 'react';
import 'react-native-gesture-handler';
import {Navigation} from './screens';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

export function sum(a: number, b: number) {
  return a + b;
}

export const App = () => {
  const navigationRef = useRef();

  useEffect(() => {}, []);

  const getActiveRouteName = (state: any) => {
    return 'name';
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={async state => {
        const previousRouteName = navigationRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
      }}>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
