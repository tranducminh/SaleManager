/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast,
} from 'native-base';
import {Image, StyleSheet, View, AsyncStorage} from 'react-native';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';

const SIGN_UP = gql`
  mutation signup(
    $email: String
    $username: String
    $password: String
    $address: String
  ) {
    signup(
      email: $email
      username: $username
      password: $password
      address: $address
    ) {
      data
      message
      success
    }
  }
`;

const Signup = ({navigation}) => {
  const [signup, {loading, error}] = useMutation(SIGN_UP, {
    async onCompleted({signup}) {
      if (signup.success === true) {
        await AsyncStorage.setItem('token', signup.data);
        // navigation.navigate('Home');
      } else {
        Toast.show({
          text: `${signup.message}`,
          buttonText: 'Okay',
          duration: 2000,
          type: 'danger',
          position: 'top',
          style: {marginTop: 50},
        });
      }
    },
  });
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();

  submit = async () => {
    await signup({variables: {email, username, password, address}});
  };

  return (
    <Container style={styles.container}>
      <Header />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Content style={styles.content}>
        <Form>
          <Item floatingLabel last>
            <Label>Email</Label>
            <Input value={email} onChangeText={text => setEmail(text)} />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input value={username} onChangeText={text => setUsername(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Address</Label>
            <Input value={address} onChangeText={text => setAddress(text)} />
          </Item>
        </Form>
        <Button full primary style={styles.button} onPress={this.submit}>
          <Text>Sign up</Text>
        </Button>
        <View style={styles.option}>
          <Button transparent onPress={() => navigation.navigate('Login')}>
            <Text>Already have a account</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 60,
  },
  content: {
    width: 350,
  },
  button: {
    marginTop: 50,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});
