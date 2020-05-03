import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const HeaderContainer = styled.View`
  height: 60px;
  width: 100%;
  background-color: #e77c1f;
`;
export const Posts = styled.View`
  flex: 1;
  background-color: #dfe0df;
  margin: 10px;
  flex-direction: column;
  border-radius: 4px;
`;
export const Name = styled.Text`
  color: #616161;
  font-weight: bold;
`;
export const Occupation = styled.Text`
  color: #7e7e7e;
  font-weight: bold;
  font-size: 10px;
`;
export const View = styled.View`
  flex-direction: row;
  margin: 6px;
`;
export const PostMessage = styled.View`
  width: 100%;
`;
export const PostText = styled.Text`
  text-align: justify;
  margin: 8px;
  font-size: 14px;
  color: #606060;
  padding: 10px;
`;
export const Like = styled.View`
  flex: 1;
  width: 12%;
  height: 22px;
  align-items: center;
  border-radius: 100px;
  flex-direction: row;
  background-color: #00b155;
  margin: 10px 0px 10px 6px;
`;
export const LikeText = styled.Text`
  color: white;
  font-size: 9px;
  margin-left: 2px;
`;
export const PostInput = styled.TextInput`
  height: ${props => `${props.size}px`};
  background-color: #FFD2AC;
  margin: 10px 10px 6px 10px;
  font-size: 12px;
  border-radius: 6px;
`;

export const ContainerButtoms = styled.View`
  width: 100%;
  height: 70px;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`
export const Buttoms = styled.TouchableOpacity`
  width: 20%;
  height: 50%;
  margin: 0px 10px 0px 6px;
  justify-content: center;
  border-radius: 6px;
  background-color: ${(props) =>
    props.color === 'post' ? '#00b155' : '#FF3939'};
`
export const TextButtom = styled.Text`
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`