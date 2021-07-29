import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../Theme';

export default ({onPress, style}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onButtonPress = async () => {
    setIsLoading(true);
    await onPress();
    setIsLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
      ...style,
    },
  });

  return (
    <TouchableOpacity onPress={onButtonPress} style={styles.container}>
      {!isLoading ? (
        <MaterialIcons name="check" color={colors.black.default} size={25} />
      ) : (
        <ActivityIndicator size="small" color={colors.black.default} />
      )}
    </TouchableOpacity>
  );
};
