/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  Title,
} from 'native-base';
import Profile from './Profile';
import ShoppingCart from './ShoppingCart';
import Products from './ProductList';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const Home = () => {
  const cart = useSelector(state => state.cart);
  const [selectedTab, setSelectedTab] = useState('Home');

  changeTab = tab => {
    setSelectedTab(tab);
  };

  return (
    <Container style={styles.container}>
      <Content>
        {selectedTab === 'Home' ? <Products /> : null}
        {selectedTab === 'ShoppingCart' ? <ShoppingCart /> : null}
        {selectedTab === 'Profile' ? <Profile /> : null}
      </Content>
      <Footer>
        <FooterTab>
          <Button
            active={selectedTab === 'Home'}
            vertical
            onPress={() => this.changeTab('Home')}>
            {/* <Badge>
              <Text>{cart.quantity}</Text>
            </Badge> */}
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button
            active={selectedTab === 'ShoppingCart'}
            badge
            vertical
            onPress={() => this.changeTab('ShoppingCart')}>
            {cart.quantity > 0 ? (
              <Badge>
                <Text>{cart.quantity}</Text>
              </Badge>
            ) : null}
            <Icon name="apps" />
            <Text>Shopping cart</Text>
          </Button>
          <Button
            active={selectedTab === 'Profile'}
            vertical
            onPress={() => this.changeTab('Profile')}>
            <Icon name="person" />
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
});
