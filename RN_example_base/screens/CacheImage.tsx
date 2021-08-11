import React, {useState, useEffect} from 'react';
import {useCallback} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import {CachedImage, CacheManager} from '@georstat/react-native-image-cache';
import {Dirs} from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

const ImagePlaceholder = () => {
  const [animated] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bezier(0.3, 0.49, 0.71, 0.5),
        useNativeDriver: false,
      }),
    ).start();
  };

  const backgroundColor = animated.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#EDF1F7', '#c7c9cc', '#EDF1F7'],
  });

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Animated.View style={[styles.skeleton, {backgroundColor}]} />
    </View>
  );
};

export const CacheImage = () => {
  const images = [
    'https://media.wired.com/photos/59822d6c5350085419ca1488/master/w_1920,c_limit/PeacockHP-691483428.jpg',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1627933907906-6075f7c88da5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1627959449026-fab24729be4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  ];
  const [source, setSource] = useState(images[0]);
  const clearCache = useCallback(async () => {
    try {
      await CacheManager.clearCache();
      Alert.alert('Title', 'Cache cleared');
    } catch (e) {
      Alert.alert('Title', e);
    }
  }, []);

  const clearSingleImageFromCache = useCallback(async () => {
    try {
      await CacheManager.removeCacheEntry(images[1]);
      Alert.alert('Title', 'Image cleared from cache');
    } catch (e) {
      Alert.alert('Title', e);
    }
  }, []);

  const changeSource = async () => {
    let size = await CacheManager.getCacheSize();
    console.log('size: ', size);
    setSource(images[1]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Cached Image: (5.4MB)</Text>
        {images.map((item, index) => {
          return (
            <View style={styles.cachedImageContainer} key={index}>
              <CachedImage
                source={source}
                style={styles.image}
                blurRadius={1}
                loadingImageComponent={ImagePlaceholder}
              />
            </View>
          );
        })}

        <View style={styles.clearCacheButtonContainer}>
          <Button
            color="black"
            onPress={clearCache}
            title="Clear Entire Cache"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color="black"
            onPress={clearSingleImageFromCache}
            title="Clear only image"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color="black"
            onPress={changeSource}
            title="Change Image source"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: '#EDF1F7',
  },
  bottomText: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 30,
  },
  cachedImageContainer: {
    alignItems: 'center',
  },
  clearCacheButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: 30,
    width: 200,
  },
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    height: 250,
    marginTop: 12,
    width: 250,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 12,
  },
});
