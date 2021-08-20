import React, {useEffect, useRef, useCallback, useState} from 'react';
import {Linking, AppState} from 'react-native';
import 'react-native-gesture-handler';
import {Navigation} from './screens';
import {NavigationContainer} from '@react-navigation/native';

const config = {
  screens: {
    Analytics: 'analytics',
    Auth: {
      path: 'auth/:id',
      parse: {
        id: id => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['demo://app'],
  config,
};

export const App = () => {
  const navigationRef = useRef();
  const [state, setState] = useState('');

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    Linking.getInitialURL()
      .then(async url => {
        if (url) {
          console.log('Initial url is: ' + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: string) => {
    if (state.match(/inactive|background/) && nextAppState === 'active') {
      _checkInitialUrl();
    }
    setState(nextAppState);
  };

  const _checkInitialUrl = async () => {
    const url = await _getInitialUrl();
    _handleUrl(url);
  };

  const _getInitialUrl = async () => {
    const url = await Linking.getInitialURL();
    return url;
  };

  const _handleUrl = (url: string | null) => {
    console.log('===================================');
    console.log(url);
    console.log('===================================');
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
