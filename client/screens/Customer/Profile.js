/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  Thumbnail,
  Body,
  Button,
} from 'native-base';
import {AsyncStorage} from 'react-native';

const Home = ({navigation}) => {
  signOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={require('../../assets/girl.jpg')} />
              <Right>
                <Text style={{fontSize: 18}}>Trần Đức Minh</Text>
              </Right>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Text>Email</Text>
            </Left>
            <Body>
              <Text>minhscdhpvn@gmail.com</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text>Username</Text>
            </Left>
            <Right>
              <Text>Username</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text>Address</Text>
            </Left>
            <Right>
              <Text>Address</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Button transparent onPress={this.signOut}>
              <Text>Đăng xuất</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Home;
