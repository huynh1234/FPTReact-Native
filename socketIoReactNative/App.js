import React, {useEffect} from 'react';
import {LogBox, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import JoinScreen from './screens/JoinScreen';
import FriendListScreen from './screens/FriendListScreen';
import ChatScreen from './screens/ChatScreen';

const socket = io('http://192.168.0.104:3001');
const Stack = createStackNavigator();
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

function reducer(state = { conversations: {} }, action) {
  switch (action.type) {
    case "users_online":
      const conversations = { ...state.conversations };
      const usersOnline = action.data;
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          };
        }
      }
      return { ...state, usersOnline, conversations };
    case "private_message":
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages
            ]
          }
        }
      };
    case "self_user":
      return { ...state, selfUser: action.data };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
});
// store.dispatch({type: 'server/hello', data: 'Hellooooo!'});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="JoinScreen" component={JoinScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="FriendListScreen" component={FriendListScreen} />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={({route}) => ({title: route.params.name})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
