/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, {useState} from 'react';
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

const LOG_IN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      data
      message
      success
    }
  }
`;

const LOG_IN_ADMIN = gql`
  mutation loginAdmin($email: String, $password: String) {
    loginAdmin(email: $email, password: $password) {
      data
      message
      success
    }
  }
`;

const Login = ({navigation}) => {
  const [login, {loading, error}] = useMutation(LOG_IN, {
    async onCompleted({login}) {
      if (login.success === true) {
        await AsyncStorage.setItem('token', login.data);
        navigation.navigate('Home');
      } else {
        Toast.show({
          text: `${login.message}`,
          buttonText: 'Okay',
          duration: 2000,
          type: 'danger',
          position: 'top',
          style: {marginTop: 50},
        });
      }
    },
  });

  const [loginAdmin] = useMutation(LOG_IN_ADMIN, {
    async onCompleted({loginAdmin}) {
      if (loginAdmin.success === true) {
        await AsyncStorage.setItem('token', loginAdmin.data);
        navigation.navigate('Admin');
      } else {
        Toast.show({
          text: `${loginAdmin.message}`,
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
  const [password, setPassword] = useState();

  loginHandle = () => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  loginAdminHandle = () => {
    loginAdmin({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <Container style={styles.container}>
      <Header />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Content style={styles.content}>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input value={email} onChangeText={text => setEmail(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Item>
        </Form>
        <Button full primary style={styles.button} onPress={this.loginHandle}>
          <Text>Sign In</Text>
        </Button>
        <View style={styles.option}>
          <Button transparent onPress={() => navigation.navigate('Signup')}>
            <Text>Sign up</Text>
          </Button>
          <Button transparent onPress={this.loginAdminHandle}>
            <Text>Sign in as admin</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Login;
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
    marginBottom: 80,
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
