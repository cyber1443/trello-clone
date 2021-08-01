import React, {useState} from 'react';
import {
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors, typography} from '../../Theme';
import {strings} from '../../localization';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default ({newCommentText, setNewCommentText, createNewComment}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onButtonPress = async () => {
    setIsLoading(true);
    await createNewComment();
    setIsLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.default,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      ...typography.heading5,
      color: colors.gray.default,
      margin: 5,
      backgroundColor: colors.background.light,
      flex: 0.85,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      maxHeight: 80,
    },
    button: {
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={newCommentText}
        onChangeText={setNewCommentText}
        style={styles.input}
        multiline
        autoCorrect={false}
        placeholder={strings.comment}
        placeholderTextColor={colors.gray.default}
      />
      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        {!isLoading ? (
          <MaterialIcons name="send" color={colors.primary} size={25} />
        ) : (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};
