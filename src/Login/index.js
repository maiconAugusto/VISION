import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Box, Buttom, Input, TextButtom } from './style';
import Logo from '../assets/logo.png';
import RealmBD from '../services/realmdb/schema';

export default function ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 16,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
    }).start();
  }, []);

  function Login() {
    if (email === '' || password === '') {
      AlertUser();
      setLoading(false);
      setDisable(false);
      return;
    }
    setLoading(true);
    setDisable(true);
    setTimeout(async () => {
      const response = RealmBD.objects('User').filtered(`email = "${email}"`);
      let validate = false;
      if (response.length === 0) {
        Alert.alert('Atenção', 'E-mail não encontrado');
        setLoading(false);
        setDisable(false);
        return;
      }
      response.map((element) => {
        if (element.email === email) {
          if (element.password === password) {
            validate = true;
          } else {
            setLoading(false);
            setDisable(false);
            Alert.alert('Atenção', 'Senha invalida!');
          }
        } else {
          setLoading(false);
          setDisable(false);
          Alert.alert('Atenção', 'E-mail não encontrado');
        }
      });
      if (validate) {
        await AsyncStorage.setItem('@email', email);
        setPassword('');
        setLoading(false);
        setDisable(false);
        navigation.navigate('Feed');
      }
    }, 3000);
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
    <Container>
      <Animated.View
        style={[
          styles.view,
          {
            opacity,
            transform: [
              {
                translateY: offset.y,
              },
            ],
          },
        ]}
      >
        <Image style={{ width: '30%', height: '10%' }} source={Logo} />
        <Box>
          <Input
            value={email}
            placeholder="E-mail"
            placeholderTextColor="#616161"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            value={password}
            placeholder="Senha"
            placeholderTextColor="#616161"
            keyboardType="default"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </Box>
        <Buttom disabled={disable} onPress={() => Login()}>
          {loading === true ? (
            <ActivityIndicator size="small" color="#e77c1f" />
          ) : (
            <TextButtom>Login</TextButtom>
          )}
        </Buttom>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 20 }}
        >
          <TextButtom style={{ color: 'white' }}>Cadastre-se</TextButtom>
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
  },
});
