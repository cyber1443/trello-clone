import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {colors, typography} from '../../Theme';
import {strings} from '../../localization';

export default ({
  isListCreationActive,
  activateListCreation,
  listName,
  setListName,
}) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 50,
      backgroundColor: colors.black.transparent30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      borderRadius: 10,
      marginRight: 20,
    },
    buttonText: {
      ...typography.heading5,
      color: colors.green.dark,
      fontWeight: 'bold',
    },
    cardContainer: {
      width: 320,
      height: 50,
      padding: 10,
      backgroundColor: colors.black.transparent30,
      borderRadius: 10,
      marginTop: 20,
      justifyContent: 'center',
      marginRight: 20,
    },
    input: {
      ...typography.heading5,
      height: 40,
      padding: 10,
      color: colors.white.default,
    },
  });

  return (
    <>
      {!isListCreationActive ? (
        <TouchableOpacity
          onPress={activateListCreation}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{strings.add_list_title} </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.cardContainer}>
          <TextInput
            value={listName}
            onChangeText={setListName}
            autoFocus
            style={styles.input}
            placeholder={strings.list_name}
            autoCorrect={false}
            placeholderTextColor={colors.white.default}
          />
        </View>
      )}
    </>
  );
};
