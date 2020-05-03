import React, { useState, useEffect } from 'react';
import { Avatar, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { ContainerAvatar, TextName, ContainerIcon, TextInfo } from './style';
import RealmBD from '../services/realmdb/schema';

export default function ({ navigation }) {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    async function getData() {
      const email = await AsyncStorage.getItem('@email');
      const response = RealmBD.objects('User').filtered(`email = "${email}"`);
      setName(response[0].name);
      setAvatar(response[0].avatar);
    }
    getData();
  }, []);

  async function ExitApp() {
    await AsyncStorage.removeItem('@email').then(() => {
      navigation.replace('Login');
    });
  }
  return (
    <>
      <ContainerAvatar>
        <Avatar
          rounded
          source={{ uri: `data:image/jpeg;base64,${avatar}` }}
          size="large"
          containerStyle={{ marginTop: 50 }}
        />
        <TextName>{name}</TextName>
      </ContainerAvatar>
      <ContainerIcon>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon name="rss-feed" color="white" />
          <TextInfo style={{ marginLeft: 8 }}>Home</TextInfo>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon name="notifications" color="white" />
          <TextInfo style={{ marginLeft: 8 }}>Notificações</TextInfo>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon name="settings" color="white" />
          <TextInfo style={{ marginLeft: 8 }}>Configurações</TextInfo>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => ExitApp()}
        >
          <Icon name="exit-to-app" color="white" />
          <TextInfo style={{ marginLeft: 8 }}>Sair</TextInfo>
        </TouchableOpacity>
      </ContainerIcon>
    </>
  );
}
