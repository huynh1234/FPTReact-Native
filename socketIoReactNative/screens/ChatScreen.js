import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {io} from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';

// ChatScreen.navigationOptions = screenProps => ({
//   title: screenProps.navigation.getParam('name'),
// });
export default function ChatScreen({navigation, route}) {
  const {name, userId} = route.params;
  console.log('name', name, userId);
  // const dispatch = useDispatch();
  // const selfUser = useSelector(state => state.selfUser);
  // const conversations = useSelector(state => state.conversations);
  // const messages = conversations[userId].messages;

  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);
  const conversations = useSelector(state => state.conversations);
  // const userId = navigation.getParam("userId");
  const messages = conversations[userId].messages;
  console.log("222222222222222222",messages)
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        renderUsernameOnMessage
          messages={messages}
          onSend={messages => {
          console.log('messages', messages)
          dispatch({
            type: 'private_message',
            data: {message: messages[0], conversationId: userId},
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }}
        user={{
          _id: selfUser.userId,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
