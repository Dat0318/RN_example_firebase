import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {
  CachedImage,
  ImageCacheProvider,
  ImageCacheManager,
  ImageCacheManagerOptions,
} from 'react-native-cached-image';

const images = [
  'https://media.wired.com/photos/59822d6c5350085419ca1488/master/w_1920,c_limit/PeacockHP-691483428.jpg',
  'https://media.wired.com/photos/59822d6c5350085419ca1488/master/w_1920,c_limit/PeacockHP-691483428.jpg',
  'https://media.wired.com/photos/59822d6c5350085419ca1488/master/w_1920,c_limit/PeacockHP-691483428.jpg',
  'https://media.wired.com/photos/59822d6c5350085419ca1488/master/w_1920,c_limit/PeacockHP-691483428.jpg',
];

export const CacheImage = () => {
  // const options = {
  //   headers: {},                          // the number of seconds each url will stay in the cache. default 2 weeks
  //   useQueryParamsInCacheKey: ,           // default false
  //   cacheLocation: PropTypes.string,      // the path to the root of the cache folder. default the device cache dir
  //   allowSelfSignedSSL: PropTypes.bool,
  // };
  useEffect(() => {
    let info = ImageCacheManager.getCacheInfo();
    console.log(info);
  }, []);

  return (
    <ImageCacheProvider
      urlsToPreload={images}
      onPreloadComplete={() => console.log('hey there')}>
      <CachedImage source={{uri: images[0]}} />

      <CachedImage source={{uri: images[1]}} />

      <CachedImage source={{uri: images[2]}} />
    </ImageCacheProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});
