import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function FriendListScreen({navigation}) {
  const usersOnline = useSelector(state => state.usersOnline);
  console.log('userOnline!!!!', usersOnline);

  const {itemContainerStyle, avatarImageStyle, avatarnameViewStyle} = styles;

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={usersOnline}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen",{
                name:item?.username
            })}>
              <View style={itemContainerStyle}>
                <Image style={avatarImageStyle} source={{uri: item.avatar}} />
                <View style={avatarnameViewStyle}>
                  <Text style={{fontSize:20}}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.userId}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainerStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarImageStyle: {width: 100, height: 100, borderRadius: 50},
  avatarnameViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
