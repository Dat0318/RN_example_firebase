// ImageMapper
import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import SwipeButton from 'rn-swipe-button';
import CircleButton from 'react-native-circle-button';

const getRandomColor = () => {
  //Function to return random color
  //To highlight the mapping area
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

export const ImageMap = () => {
  //State for the selected area
  const [selectedAreaId, setSelectedAreaId] = useState([]);

  const mapperAreaClickHandler = async (item, idx, event) => {
    const currentSelectedAreaId = selectedAreaId;
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } else {
        Alert.alert('Clicked', `Clicked Item Id: ${item.id}`);
        console.log('Setting Id', item.id);
        setSelectedAreaId([...currentSelectedAreaId, item.id]);
      }
    } else {
      if (item.id === currentSelectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 30}}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 40,
        }}>
        Image Mapper Example in React Native
      </Text>
      <ImageMapper
        imgHeight={551}
        imgWidth={244}
        imgSource={{
          uri: 'https://raw.githubusercontent.com/msalo3/react-native-image-mapper/master/Examples/human.png',
        }}
        imgMap={RECTANGLE_MAP}
        onPress={(item, idx, event) => mapperAreaClickHandler(item, idx, event)}
        containerStyle={{top: 10}}
        selectedAreaId={selectedAreaId}
        multiselect
      />
      <SwipeButton
        disabled={false}
        //disable the button by doing true (Optional)
        swipeSuccessThreshold={70}
        height={45}
        //height of the button (Optional)
        width={330}
        //width of the button (Optional)
        title="Swipe to Submit"
        //Text inside the button (Optional)
        //thumbIconImageSource={thumbIcon}
        //You can also set your own icon (Optional)
        onSwipeSuccess={() => {
          Alert.alert('Submitted', 'Submitted Successfully!');
        }}
        //After the completion of swipe (Optional)
        railFillBackgroundColor="#e688a1" //(Optional)
        railFillBorderColor="#e688ff" //(Optional)
        thumbIconBackgroundColor="#ed9a73" //(Optional)
        thumbIconBorderColor="#ed9aff" //(Optional)
        railBackgroundColor="#bbeaa6" //(Optional)
        railBorderColor="#bbeaff" //(Optional)
      />
      <CircleButton
        size={45}
        primaryColor="#41727E"
        secondaryColor="#459186"
        onPressButtonTop={() => Alert.alert('Submitted', 'Top Button Clicked')}
        onPressButtonRight={() =>
          Alert.alert('Submitted', 'Right Button Clicked')
        }
        onPressButtonBottom={() =>
          Alert.alert('Submitted', 'Bottom Button Clicked')
        }
        onPressButtonLeft={() =>
          Alert.alert('Submitted', 'Left Button Clicked')
        }
      />
    </View>
  );
};

// Maps to Create Clickable Areas
const RECTANGLE_MAP = [
  {
    id: '0',
    name: 'Left Foot',
    shape: 'rectangle',
    x2: 110,
    y2: 540,
    x1: 80,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '1',
    name: 'Right Foot',
    shape: 'rectangle',
    x2: 155,
    y2: 540,
    x1: 125,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '2',
    name: 'Left Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 80,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '3',
    name: 'Right Knee',
    shape: 'rectangle',
    x2: 155,
    y2: 400,
    x1: 125,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '4',
    name: 'Stomach',
    shape: 'rectangle',
    x2: 155,
    y2: 240,
    x1: 80,
    y1: 165,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '5',
    name: 'Left Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 315,
    x1: 5,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '6',
    name: 'Right Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 315,
    x1: 200,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '7',
    name: 'Face',
    shape: 'rectangle',
    x2: 145,
    y2: 70,
    x1: 90,
    y1: 30,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 145,
    y2: 30,
    x1: 90,
    y1: 0,
    prefill: getRandomColor(),
    fill: 'blue',
  },
];
