import React, { useState, useEffect } from 'react';
import {
  ToastAndroid,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {
  Container,
  ContainerAvatar,
  Input,
  Buttom,
  TextButtom,
  Box,
} from './style';
import RealmBD from '../services/realmdb/schema';

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function ({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarBase64, setAvatarBase64] = useState('');

  useEffect(() => {
    const response = RealmBD.objects('User');
    console.log(response);
  }, []);

  function Take() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const photo = response.data;
        const source = { uri: response.uri };
        setAvatarBase64(photo);
        setAvatar(source);
      }
    });
  }

  async function createUser() {
    try {
      if (name === '' || email === '' || password === '') {
        AlertUser();
        return;
      }
      const verify = RealmBD.objects('User').filtered(`email = "${email}"`);
      let validate = true;
      verify.map((element) => {
        if (element.email === email) {
          validate = false;
          Alert.alert(
            'Atenção',
            'Este e-mail já está cadastrado neste dispositivo'
          );
        }
      });
      const data = {
        id: Math.floor(Math.random() * 5000) + 1,
        name,
        email,
        password,
        avatar: avatarBase64,
      };

      if (validate === true) {
        const realm = RealmBD;
        realm.write(() => {
          realm.create('User', data);
          setAvatar('');
          setEmail('');
          setPassword('');
          setAvatar('');
          setAvatarBase64('');
          Alert.alert(
            'Parabéns!',
            'Sua conta foi criada com sucesso, agora faça seu login !'
          );
          navigation.goBack();
        });
      }
    } catch (error) {}
  }
  function AlertUser() {
    ToastAndroid.showWithGravityAndOffset(
      'PREENCHA TODOS OS CAMPOS!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      200
    );
  }
  return (
    <DismissKeyboard>
      <Container>
        <ContainerAvatar>
          <Avatar
            size="large"
            source={avatar}
            rounded
            icon={{
              name: 'photo',
              type: 'font-awesome',
              size: 24,
              color: 'white',
            }}
            onPress={() => Take()}
            activeOpacity={0.7}
          />
        </ContainerAvatar>
        <Box>
          <Input
            placeholder="Nome"
            placeholderTextColor="#616161"
            keyboardType="default"
            autoCapitalize={false}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="E-mail"
            placeholderTextColor="#616161"
            keyboardType="email-address"
            autoCapitalize={false}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Senha"
            placeholderTextColor="#616161"
            keyboardType="default"
            autoCapitalize={false}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </Box>
        <Buttom onPress={() => createUser()}>
          <TextButtom>Cadastrar</TextButtom>
        </Buttom>
      </Container>
    </DismissKeyboard>
  );
}
