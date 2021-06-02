/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, LogBox, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {io} from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
import JoinScreen from './JoinScreen';

LogBox.ignoreLogs(['Warning: ...']);
const HomeScreen = ({navigation}) => {
  const [recvMessage, setRecvMessage] = useState([]);
  const [hasJoined, setHasJoined] = useState("")
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io('http://192.168.0.104:3001');
    socket.current.on('message', message => {
      setRecvMessage(prevState => GiftedChat.append(prevState,message));
    });
    
  }, []);

  const onSend = messages => {
    console.log(messages);
    socket.current.emit("message", messages[0].text);
    setRecvMessage(prevState => GiftedChat.append(prevState, messages));
  };

  const joinChat = username =>{
    socket.current.emit("join",username)
    setHasJoined(true)
  }
  return (
    <View style={{flex: 1}}>
      {/* {hasJoined ? ( */}
      <GiftedChat
      renderUsernameOnMessage
        messages={recvMessage}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {/* ):
        <JoinScreen joinChat={joinChat} />
      }
       */}
      {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
