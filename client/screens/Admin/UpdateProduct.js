import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Title,
  Text,
  Button,
} from 'native-base';
import {StyleSheet} from 'react-native';
export default class FormExample extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Product name" />
            </Item>
            <Item>
              <Input placeholder="Description" />
            </Item>
            <Item>
              <Input placeholder="Price" />
            </Item>
            <Item>
              <Input placeholder="Quantity" />
            </Item>
          </Form>
          <Button style={styles.button}>
            <Text>Update product</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 40,
  },
});
