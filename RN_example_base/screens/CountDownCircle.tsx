import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const size = 150;

export const CountDownCircle = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let secTimer = setInterval(() => {
      let hour = new Date().getHours(),
        min = new Date().getMinutes(),
        sec = new Date().getSeconds();
      const computedHour = String(hour).length === 1 ? `0${hour}` : hour,
        computedMinute = String(min).length === 1 ? `0${min}` : min,
        computedSecond = String(sec).length === 1 ? `0${sec}` : sec;
      setCurrentDate(
        computedHour + ':' + computedMinute + ':' + computedSecond,
      );
    }, 1000);
    return () => clearInterval(secTimer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.item, styles.itemOdd]}>
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={100}
          rotation={0}
          tintColor="red"
          backgroundColor="white"
          style={styles.clockFront}
        />
        <View style={styles.timeTop}>
          <Text style={styles.timeTxt}>0</Text>
        </View>
        <View style={styles.timeRight}>
          <Text style={styles.timeTxt}>6</Text>
        </View>
        <View style={styles.timeBottom}>
          <Text style={styles.timeTxt}>12</Text>
        </View>
        <View style={styles.timeLeft}>
          <Text style={styles.timeTxt}>18</Text>
        </View>
      </View>

      <View style={styles.item}>
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={32}
          rotation={0}
          tintColor="red"
          backgroundColor="white"
          dashedTint={{width: 2, gap: 3}}
          style={styles.clockFront}
        />
        <View style={styles.timeTop}>
          <Text style={styles.timeTxt}>0</Text>
        </View>
        <View style={styles.timeRight}>
          <Text style={styles.timeTxt}>6</Text>
        </View>
        <View style={styles.timeBottom}>
          <Text style={styles.timeTxt}>12</Text>
        </View>
        <View style={styles.timeLeft}>
          <Text style={styles.timeTxt}>18</Text>
        </View>
      </View>

      <View style={[styles.item, styles.itemOdd]}>
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={15}
          rotation={195}
          tintColor="red"
          backgroundColor="white"
          style={styles.clockFront}
        />
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={25}
          rotation={0}
          tintColor="red"
          backgroundColor="transparent"
          style={styles.clockBack}
        />
        <View style={styles.timeTop}>
          <Text style={styles.timeTxt}>0</Text>
        </View>
        <View style={styles.timeRight}>
          <Text style={styles.timeTxt}>6</Text>
        </View>
        <View style={styles.timeBottom}>
          <Text style={styles.timeTxt}>12</Text>
        </View>
        <View style={styles.timeLeft}>
          <Text style={styles.timeTxt}>18</Text>
        </View>
      </View>

      <View style={styles.item}>
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={65}
          rotation={30}
          tintColor="red"
          backgroundColor="white"
          style={styles.clockFront}
        />
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={1}
          rotation={35}
          tintColor="black"
          backgroundColor="transparent"
          style={styles.clockBack}
        />
        <AnimatedCircularProgress
          size={size}
          width={15}
          fill={1}
          rotation={330}
          tintColor="black"
          backgroundColor="transparent"
          style={styles.clockBack}
        />
        <View style={styles.timeTop}>
          <Text style={styles.timeTxt}>0</Text>
        </View>
        <View style={styles.timeRight}>
          <Text style={styles.timeTxt}>6</Text>
        </View>
        <View style={styles.timeBottom}>
          <Text style={styles.timeTxt}>12</Text>
        </View>
        <View style={styles.timeLeft}>
          <Text style={styles.timeTxt}>18</Text>
        </View>
      </View>
    </View>
  );
};
export default CountDownCircle;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: size,
    height: size,
    position: 'relative',
    marginBottom: 20,
  },
  itemOdd: {
    marginRight: 20,
  },
  clockBack: {
    position: 'absolute',
    opacity: 1,
  },
  clockFront: {
    opacity: 0.8,
  },
  timeTop: {
    position: 'absolute',
    top: 15,
    left: size / 2 - 4,
  },
  timeRight: {
    position: 'absolute',
    top: size / 2 - 12,
    right: 17,
  },
  timeBottom: {
    position: 'absolute',
    bottom: 15,
    left: size / 2 - 10,
  },
  timeLeft: {
    position: 'absolute',
    top: size / 2 - 12,
    left: 17,
  },
  timeTxt: {
    fontSize: 16,
    textAlign: 'center',
  },
});
