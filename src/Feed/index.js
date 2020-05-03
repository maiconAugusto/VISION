import React from 'react';
import { FlatList, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import { Avatar, Icon, Header } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import RealmBD from '../services/realmdb/schema';
import {
  Container,
  Posts,
  Name,
  Occupation,
  View,
  PostMessage,
  PostText,
  Like,
  LikeText,
  PostInput,
  Buttoms,
  ContainerButtoms,
  TextButtom,
} from './style';
import Woman from '../assets/woman_1.jpg';
import Woman_2 from '../assets/woman_2.jpg';
import Woman_3 from '../assets/woman_3.jpg';

datas = [
  {
    id: 0,
    idPost: 0,
    photo: Woman,
    name: 'Ana Bratriz',
    like: 125,
    date: '02/05/2020',
    message: `Se você contar sua ideia para 10 pessoas e 9 delas disser que você está maluco, provavelmente você está fazendo algo inovador!`,
  },
  {
    id: 1,
    idPost: 1,
    photo: Woman_2,
    name: 'Claudia Marreco',
    like: 1556,
    date: '01/05/2020',
    message: 'A vida é sobre criar impacto, não uma renda!',
  },
  {
    id: 2,
    idPost: 2,
    photo: Woman_3,
    name: 'Catia Souza',
    like: 15,
    date: '02/04/2020',
    message:
      'Para inovar é preciso estar disposto a errar. Quem não está disposto a falhar, dificilmente conseguirá solucionar ou criar algo novo',
  },
  {
    id: 6,
    idPost: 789,
    photo: Woman,
    name: 'Ana Bratriz',
    like: 13,
    date: '04/04/2020',
    message: `Arte + Design + Estilo + Inovação + Sustentabilidade = Produto final`,
  },
  {
    id: 5,
    idPost: 78,
    photo: Woman_2,
    name: 'Claudia Marreco',
    like: 12,
    date: '04/04/2020',
    message:
      'Se, a princípio, a ideia não é absurda, então não há esperança para ela',
  },
  {
    id: 4,
    idPost: 45,
    photo: Woman_3,
    name: 'Catia Souza',
    like: 1,
    date: '04/02/2020',
    message:
      'Um produto precisa ser inovador o suficiente para se diferenciar do resto, mas não tão inovador que o usuário não entenda',
  },
];

export default class Feed extends React.Component {
  static navigationOptions = {
    drawerIcon: () => {
      return <Icon name="home" size={20} color="white" />;
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      heightInput: 50,
      viewButtom: false,
      posts: [],
      message: '',
      name: '',
      avatar: '',
      id: '',
      date: '',
      modal: false,
      messageEdit: '',
      idEdit: '',
    };
  }

  componentWillMount() {
    const date = moment().format('L');
    this.setState({ date });
  }

  componentDidMount() {
    this.setState({ posts: datas });
    this.getDataUser();
  }

  async getDataUser() {
    const email = await AsyncStorage.getItem('@email');
    const response = RealmBD.objects('User').filtered(`email = "${email}"`);
    const { name, avatar, id } = response[0];
    this.setState({ name, avatar, id });
  }

  sendPost() {
    if (this.state.message === '') {
      this.AlertUser();
      return;
    }
    const { posts, id, name, avatar, message, date } = this.state;
    const postAux = [];
    const data = {
      id,
      idPost: Math.floor(Math.random() * 5000) + 1,
      photo: { uri: `data:image/jpeg;base64,${avatar}` },
      name,
      occupation: 'UX/UI',
      like: 0,
      message,
      date,
      item: '',
    };

    postAux.push(data);
    posts.map((element) => postAux.push(element));
    this.setState({
      posts: postAux,
      heightInput: 50,
      message: '',
      viewButtom: false,
    });
  }

  handleHeaderDrawer() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
        <Icon
          name="menu"
          color="white"
          containerStyle={{ marginBottom: 30, marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  AlertUser() {
    ToastAndroid.showWithGravityAndOffset(
      'Vamos lá! escreva algo!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      240
    );
  }

  RemovePost(id) {
    const { posts } = this.state;
    const response = posts.filter((element) => {
      return element.idPost !== id;
    });
    this.setState({ posts: response, modal: false });
  }

  EditPost() {
    const { posts, idEdit, messageEdit } = this.state;
    const response = posts.map((element) => {
      if (element.idPost === idEdit) {
        element.message = messageEdit;
        return element;
      }
      return element;
    });
    this.setState({ posts: response, modal: false });
  }

  PostLike(id) {
    const { posts } = this.state;
    const response = posts.map((element) => {
      if (element.id === id) {
        element.like += 1;
        return element;
      }
      return element;
    });
    this.setState({ posts: response });
  }

  modal() {
    const { messageEdit, idEdit } = this.state;
    return (
      <Modal animationType="slide" visible={this.state.modal} transparent>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'column',
              height: 250,
              backgroundColor: '#e77c1f',
              borderRadius: 2,
            }}
          >
            <Name style={{ textAlign: 'center', margin: 8, color: 'white' }}>
              Edição
            </Name>
            <PostInput
              size={120}
              value={messageEdit}
              onChangeText={(text) => this.setState({ messageEdit: text })}
              placeholderTextColor="#616161"
              scrollEnabled
              multiline
              blurOnSubmit
              returnKeyType="done"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              maxLength={280}
              style={{ textAlignVertical: 'top', backgroundColor: 'white' }}
            />
            <ContainerButtoms>
              <Buttoms color="cancel" onPress={() => this.RemovePost(idEdit)}>
                <TextButtom>Excluir</TextButtom>
              </Buttoms>
              <Buttoms color="post" onPress={() => this.EditPost(idEdit)}>
                <TextButtom>Salvar</TextButtom>
              </Buttoms>
            </ContainerButtoms>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <Container>
        <Header
          containerStyle={{ height: 60 }}
          backgroundColor="#e77c1f"
          leftComponent={() => this.handleHeaderDrawer()}
          centerComponent={{
            text: 'VISION',
            style: { color: 'white', marginBottom: 30 },
          }}
        />
        <PostInput
          size={this.state.heightInput}
          value={this.state.message}
          onChangeText={(text) => this.setState({ message: text })}
          onTouchStart={() =>
            this.setState({ heightInput: 120, viewButtom: true })
          }
          placeholder=" Voçê tem alguma idéia boa? compartilhe aqui!"
          placeholderTextColor="#616161"
          scrollEnabled
          multiline
          blurOnSubmit
          returnKeyType="done"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          maxLength={280}
          style={{ textAlignVertical: 'top' }}
        />
        {this.state.viewButtom === true ? (
          <ContainerButtoms>
            <Buttoms
              color="cancel"
              onPress={() =>
                this.setState({ viewButtom: false, heightInput: 50 })
              }
            >
              <TextButtom>Cancelar</TextButtom>
            </Buttoms>
            <Buttoms color="post" onPress={() => this.sendPost()}>
              <TextButtom>Salvar</TextButtom>
            </Buttoms>
          </ContainerButtoms>
        ) : null}
        <FlatList
          onTouchStart={() =>
            this.setState({ viewButtom: false, heightInput: 50 })
          }
          data={this.state.posts}
          extraData={this.state.posts}
          renderItem={({ item }) => {
            return (
              <Posts key={item.id}>
                <View>
                  <Avatar source={item.photo} size={50} rounded />
                  <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Name>{item.name}</Name>
                      <Occupation>{item.date}</Occupation>
                    </View>
                    {this.state.id === item.id ? (
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              modal: true,
                              messageEdit: item.message,
                              idEdit: item.idPost,
                            })
                          }
                        >
                          <Icon name="more-horiz" size={20} color="#616161" />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
                <PostMessage>
                  <PostText>{item.message}</PostText>
                </PostMessage>
                <TouchableOpacity
                  onPress={() => this.PostLike(item.id)}
                  style={{ width: 60, flexDirection: 'row' }}
                >
                  <Like>
                    <Icon
                      containerStyle={{ marginLeft: 4 }}
                      name="thumb-up"
                      color="white"
                      size={12}
                    />
                    <LikeText>{item.like}</LikeText>
                  </Like>
                </TouchableOpacity>
              </Posts>
            );
          }}
        />
        {this.modal()}
      </Container>
    );
  }
}
