import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {strings} from '../../../localization';
import {colors, typography} from '../../../Theme';
import Menu, {MenuItem} from '../../../commonComponents/PopupMenu';
import moment from 'moment';
import {useSelector} from 'react-redux';

export default ({item, updateCommentData, deleteCommentData}) => {
  const {profile} = useSelector(state => state.profile);
  const [editCommentText, setEditCommentText] = useState(item?.data?.text);

  const isOwner = profile.id === item?.idMemberCreator;

  const updateComment = () => {
    if (!editCommentText) {
      setEditCommentText(item?.data?.text);
      return;
    }
    updateCommentData({text: editCommentText, actionId: item?.id});
  };

  const onDeleteCommentPress = () => {
    deleteCommentData(item?.id);
  };

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      flexDirection: 'row',
    },
    avatarContainer: {
      flex: 0.2,
      alignItems: 'flex-start',
    },
    avatar: {
      width: 50,
      height: 50,
      backgroundColor: colors.primary,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    initials: {
      ...typography.heading4,
      color: colors.background.default,
      fontWeight: 'bold',
    },
    detailsContainer: {
      flex: 0.8,
    },
    name: {
      ...typography.heading5,
      color: colors.white.default,
      fontWeight: 'bold',
      marginBottom: 10,
      lineHeight: 30,
      maxWidth: 250,
    },
    commentText: {
      ...typography.heading5,
      color: colors.gray.default,
      padding: 5,
      borderRadius: 3,
      backgroundColor: colors.background.light,
    },
    menu: {
      right: 0,
      top: 0,
    },
    time: {
      ...typography.heading6,
      color: colors.gray.default,
      marginTop: 10,
    },
  });

  return (
    <View key={item?.id.toString()} style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{item?.memberCreator?.initials}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.memberCreator?.fullName}
        </Text>
        {isOwner ? (
          <Menu style={styles.menu}>
            <MenuItem
              title={strings.delete_comment}
              titleColor={colors.red.default}
              onPress={onDeleteCommentPress}
            />
          </Menu>
        ) : null}
        {!isOwner ? (
          <Text style={styles.commentText}>{item?.data?.text}</Text>
        ) : (
          <TextInput
            value={editCommentText}
            onChangeText={setEditCommentText}
            style={styles.commentText}
            multiline
            autoCorrect={false}
            placeholder={strings.comment}
            placeholderTextColor={colors.gray.default}
            onBlur={updateComment}
          />
        )}
        <Text style={styles.time}>{moment(item?.date).fromNow()}</Text>
      </View>
    </View>
  );
};
