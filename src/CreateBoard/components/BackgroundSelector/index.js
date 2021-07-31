import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {strings} from '../../../localization';
import {colors, typography} from '../../../Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default ({backgroundsArray, setBackgroundsArray}) => {
  const setItemPressed = item => {
    const newData = backgroundsArray.map(i =>
      i.id === item.id ? {...i, isPressed: true} : {...i, isPressed: false},
    );
    setBackgroundsArray(newData);
  };

  const renderBackground = () =>
    backgroundsArray.map(item => (
      <View key={item.id} style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setItemPressed(item)}
          style={{
            ...styles.button,
            backgroundColor: item.color,
          }}
        />
        {item.isPressed && (
          <MaterialIcons
            style={styles.selectedButton}
            name="check"
            color={colors.white.default}
            size={20}
          />
        )}
      </View>
    ));

  const styles = StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: 50,
      width: 50,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    title: {
      ...typography.heading4,
      color: colors.gray.default,
      marginTop: 10,
    },
    selectedButton: {
      position: 'absolute',
      bottom: 15,
      right: 15,
    },
  });

  return (
    <>
      <Text style={styles.title}>{strings.select_background}</Text>
      <View style={styles.container}>{renderBackground()}</View>
    </>
  );
};
