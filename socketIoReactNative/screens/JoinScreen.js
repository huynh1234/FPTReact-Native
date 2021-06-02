import React, {useState} from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

export default function JoinScreen({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/chat-icon.png')}
        style={styles.image}
      />

      <View>
        <TextInput
          placeholder="Enter username"
          style={{fontSize: 30,textAlign:"center"}}
          onChangeText={text => setUsername(text)}
          value={username}
          
        />
        <Button 
            title="Join chart"
            onPress={() => {
                dispatch({type:"server/join",data:username})
                navigation.navigate("FriendListScreen")
            }}
            
            />
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    //   flex:1,
    width: '80%',
    height: '40%',
  },
});
