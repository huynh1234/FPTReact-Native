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

function reducer(state = {}, action) {
  switch (action.type) {
    case 'message':
      return {...state, message: action.data};
    case "users_online":
      return {...state, usersOnline: action.data};
      
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log('new State', store.getState());
});
store.dispatch({type: 'server/hello', data: 'Hellooooo!'});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="JoinScreen" component={JoinScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="FriendListScreen" component={FriendListScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params.name })}/>


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
