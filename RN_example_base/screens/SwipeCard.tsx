import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableCard = ({item, removeCard, swipedDirection}) => {
  // let xPosition = new Animated.Value(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  let swipeDirection = '';
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = 'Right';
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = 'Left';
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection('--');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          backgroundColor: item.backgroundColor,
          opacity: cardOpacity,
          transform: [{translateX: xPosition}, {rotate: rotateCard}],
        },
      ]}>
      <Text style={styles.cardTitleStyle}> {item.cardTitle} </Text>
    </Animated.View>
  );
};

export const SwipeCard = () => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
  const [swipeDirection, setSwipeDirection] = useState('--');

  const removeCard = id => {
    // alert(id);
    sampleCardArray.splice(
      sampleCardArray.findIndex(item => item.id == id),
      1,
    );
    setSampleCardArray(sampleCardArray);
    if (sampleCardArray.length == 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = swipeDirection => {
    setSwipeDirection(swipeDirection);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        React Native Swipeable Card View UI like Tinder
      </Text>
      <Text style={styles.swipeText}>
        Last Card Swipe Direction was{'\n'}
        {swipeDirection}
      </Text>
      <View style={styles.container}>
        {sampleCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={() => removeCard(item.id)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
        {noMoreCard ? (
          <Text style={{fontSize: 22, color: '#000'}}>No Cards Found.</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  cardStyle: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  cardTitleStyle: {
    color: '#fff',
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const DEMO_CONTENT = [
  {
    id: '1',
    cardTitle: 'Card 1',
    backgroundColor: '#FFC107',
  },
  {
    id: '2',
    cardTitle: 'Card 2',
    backgroundColor: '#ED2525',
  },
  {
    id: '3',
    cardTitle: 'Card 3',
    backgroundColor: '#E7088E',
  },
  {
    id: '4',
    cardTitle: 'Card 4',
    backgroundColor: '#00BCD4',
  },
  {
    id: '5',
    cardTitle: 'Card 5',
    backgroundColor: '#FFFB14',
  },
].reverse();
