import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, LogBox, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {io} from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';

export default function ChatScreen({ navigation, route }) {
    const {name} = route.params
    console.log(name)
    return (
        <View style={{flex: 1}}>
        <GiftedChat
        renderUsernameOnMessage
        //   messages={recvMessage}
        //   onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
       {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
         }
     </View>
    )
}
