import React, {useLayoutEffect, useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import InputField from '../commonComponents/InputField';
import ValidationMesssage from '../commonComponents/ValidationMesssage';
import CheckButton from '../commonComponents/CheckButton';
import {strings} from '../localization';
import {validateName, isBackgroundSelected} from './validationHelpers';
import {create} from './lib/createBoard';
import {backgroundData} from './components/BackgroundSelector/backgroundData';
import BackgroundSelector from './components/BackgroundSelector';
import {useDispatch} from 'react-redux';
import {addBoard} from '../Boards/state/reducer';
import {colors} from '../Theme';

const CreateBoard = ({navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const [boardName, setBoardName] = useState(null);
  const [backgroundsArray, setBackgroundsArray] = useState(backgroundData);

  const createNewBoard = useCallback(async () => {
    if (!validateName(boardName)) {
      setErrors({...errors, nameError: strings.invalid_board_name});
      return;
    }

    if (!isBackgroundSelected(backgroundsArray)) {
      setErrors({...errors, backgroundError: strings.please_select_background});
      return;
    }

    const selectedBackground = backgroundsArray.find(item => item.isPressed);

    const {data} = await create({
      name: boardName,
      backgroundColor: selectedBackground.id,
    });

    dispatch(addBoard(data));
    navigation.goBack();
  }, [backgroundsArray, boardName, dispatch, errors, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background.default,
    },
    header: {
      backgroundColor: colors.background.light,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: strings.create_board,
      headerTintColor: colors.white.default,
      headerStyle: styles.header,
      headerRight: () => <CheckButton onPress={createNewBoard} />,
    });
  }, [createNewBoard, navigation, styles.button, styles.header]);

  return (
    <SafeAreaView style={styles.container}>
      <InputField
        placeholder={strings.board_name}
        value={boardName}
        onChange={setBoardName}
      />
      <ValidationMesssage message={errors?.nameError} />
      <BackgroundSelector
        backgroundsArray={backgroundsArray}
        setBackgroundsArray={setBackgroundsArray}
      />
      <ValidationMesssage message={errors?.backgroundError} />
    </SafeAreaView>
  );
};

export default CreateBoard;
