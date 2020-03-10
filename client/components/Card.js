/* eslint-disable no-undef */
import React, {Component} from 'react';
import {Image, StyleSheet, View, AsyncStorage} from 'react-native';
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  Right,
  Toast,
  Icon,
} from 'native-base';
import {useDispatch} from 'react-redux';
import * as actions from '../store/actions';

const ProductCard = ({image, name, price, currencyUnit, id}) => {
  const dispatch = useDispatch();

  buyProduct = () => {
    dispatch(actions.addToCart(id, price));
    Toast.show({
      text: 'This product is added to your cart',
      buttonText: 'Okay',
      duration: 2000,
      type: 'success',
      position: 'top',
      style: {marginTop: 50},
    });
  };
  return (
    <View>
      {/* <Header /> */}
      <Content style={styles.content}>
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
              <Button onPress={this.buyProduct}>
                <Text>Mua ngay</Text>
              </Button>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button transparent>
                <Text>Đã bán 1.2k</Text>
              </Button>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="apps" />
                <Text>Còn hàng</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </View>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  content: {},
  image: {
    width: 120,
    height: 120,
  },
});
