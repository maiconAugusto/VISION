import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #E77C1F;
  align-items: center;
  flex-direction: column;
  align-items: center;
`;
export const ContainerAvatar = styled.View`
  height: 150px;
  width: 150px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
`
export const Box = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  height: 250px;
  width: 90%;
  border-radius: 4px;
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
export const Buttom = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  background-color: #DFE0DF;
  border-radius: 100px;
`