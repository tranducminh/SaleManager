/* eslint-disable no-undef */
import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import {useDispatch} from 'react-redux';
import * as actions from '../store/actions';

const PaymentCard = ({image, name, price, currencyUnit, id}) => {
  const dispatch = useDispatch();
  removeFromCart = () => {
    dispatch(actions.removeFromCart(id, price));
  };
  return (
    <Card>
      <CardItem cardBody>
        <Left style={{padding: 10}}>
          <Image source={{uri: image}} style={styles.image} />
        </Left>
        <Body style={{padding: 10}}>
          <Text style={{fontSize: 18}}>{name}</Text>
          <Text style={{fontSize: 18, marginTop: 10, marginBottom: 10}}>
            {`${price} ${currencyUnit}`}
          </Text>
          <Text style={{fontSize: 18, marginTop: 10, marginBottom: 10}}>
            Số lượng: 1
          </Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Button transparent>
            {/* <Icon active name="chatbubbles" /> */}
            <Text>Đã bán 1.2k</Text>
          </Button>
        </Body>
        <Right>
          <Button transparent onPress={this.removeFromCart}>
            <Icon name="apps" />
            <Text>Xoá khỏi giỏ hàng</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

export default PaymentCard;
const styles = StyleSheet.create({
  content: {},
  image: {
    width: 120,
    height: 120,
  },
});
