import React from 'react';
import {View, TextInput} from 'react-native';

export const Mytextinput = props => {
  return (
    <View
      style={{
        marginTop: 10,
        borderColor: '#03A89E',
        borderWidth: 1,
      }}
    >
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#03A89E"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinput;
