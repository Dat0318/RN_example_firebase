import {useEffect, useCallback, useRef} from 'react';
import {Linking, AppState} from 'react-native';

const useDeepLink = (callback: (url: string) => void) => {
  const appState = useRef(AppState.currentState);

  const handleDeepLink = useCallback(
    link => {
      if (link) {
        const url = typeof link === 'string' ? link : link.url;
        console.log({deeplink: url});

        callback(url);
      }
    },
    [callback],
  );

  useEffect(() => {
    if (appState === 'background') {
      Linking.getInitialURL().then(handleDeepLink);
    }
  }, [appState, handleDeepLink]);

  useEffect(() => {
    Linking.getInitialURL().then(handleDeepLink);

    Linking.addListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [handleDeepLink]);
};

export default useDeepLink;
