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
const ProductCard = ({
  image,
  name,
  price,
  currencyUnit,
  description,
  quantity,
}) => {
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
              <Text style={{fontSize: 18}}>{description}</Text>
              <Text style={{fontSize: 18, marginTop: 20, marginBottom: 10}}>
                {`${price} ${currencyUnit}`}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                {/* <Icon active name="chatbubbles" /> */}
                <Text>Đã bán 1.2k</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{`Còn lại: ${quantity}`}</Text>
              </Button>
            </Body>
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
