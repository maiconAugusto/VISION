import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  height: 100%;
  width: 100%;
  background-color: #e77c1f;
  justify-content: center;
  align-items: center;
`;
export const Box = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  height: 190px;
  width: 90%;
  border-radius: 4px;
`
export const Buttom = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  background-color: #dfe0df;
  border-radius: 100px;
`
export const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  background-color: white;
  border-radius: 100px;
  padding-left: 20px;
`
export const TextButtom = styled.Text`
  text-align: center;
  color: #616161;
  font-weight: bold;
  font-size: 14px;
`