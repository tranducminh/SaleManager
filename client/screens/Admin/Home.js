import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Badge,
  Title,
  Icon,
} from 'native-base';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import {StyleSheet} from 'react-native';

export default class FooterTabsBadgeExample extends Component {
  state = {
    selectedTab: 'AddProduct',
  };
  changeTab = tab => {
    this.setState({selectedTab: tab});
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          {this.state.selectedTab === 'AddProduct' ? <AddProduct /> : null}
          {this.state.selectedTab === 'UpdateProduct' ? <ProductList /> : null}
          {/* {this.state.selectedTab === 'Profile' ? <Profile /> : null} */}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              active={this.state.selectedTab === 'AddProduct'}
              vertical
              onPress={() => this.changeTab('AddProduct')}>
              <Icon name="rocket" />
              <Text>Add product</Text>
            </Button>
            <Button
              active={this.state.selectedTab === 'UpdateProduct'}
              vertical
              onPress={() => this.changeTab('UpdateProduct')}>
              <Icon active name="navigate" />
              <Text>Update product</Text>
            </Button>
            <Button
              active={this.state.selectedTab === 'Profile'}
              vertical
              onPress={() => this.changeTab('Profile')}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
});
