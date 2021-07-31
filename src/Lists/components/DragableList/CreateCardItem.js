import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {strings} from '../../../localization';
import {colors, typography} from '../../../Theme';

export default ({cardCreationActiveId, setCardCreationActiveId, listId}) => {
  const activateCardCreation = () => {
    setCardCreationActiveId(listId);
  };

  const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    },
    buttonText: {
      ...typography.heading5,
      color: colors.green.dark,
      fontWeight: 'bold',
    },
    cardContainer: {
      width: 300,
      backgroundColor: colors.black.transparent30,
      marginBottom: 10,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    input: {
      ...typography.heading5,
      paddingHorizontal: 10,
      color: colors.white.default,
      maxHeight: 200,
    },
  });

  return (
    <>
      {cardCreationActiveId !== listId ? (
        <TouchableOpacity
          onPress={activateCardCreation}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{strings.add_card} </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.cardContainer}>
          <TextInput
            multiline
            autoFocus
            style={styles.input}
            placeholder={strings.card_name}
            placeholderTextColor={colors.gray.default}
          />
        </View>
      )}
    </>
  );
};
