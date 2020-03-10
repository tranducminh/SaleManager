import React, {useEffect, useState} from 'react';
import {
  Container,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Button,
} from 'native-base';
import {View} from 'react-native';
import PaymentCard from '../../components/PaymentCard';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

const GET_SHOPPING_CART = gql`
  mutation getShoppingCart($arrayID: [String]) {
    getManyGoods(arrayID: $arrayID) {
      id
      goods {
        image
        currencyUnit
        price
        quantity
        description
        name
      }
    }
  }
`;

const ShoppingCart = () => {
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [cart, {loading, error, data}] = useMutation(GET_SHOPPING_CART, {
    async onCompleted({getManyGoods}) {
      // console.log(getManyGoods);
      setProductList(getManyGoods);
    },
  });
  const shoppingCart = useSelector(state => state.cart);
  useEffect(() => {
    if (quantity !== shoppingCart.quantity) {
      console.log(shoppingCart.arrayID);
      setQuantity(shoppingCart.quantity);
      cart({
        variables: {
          arrayID: shoppingCart.arrayID,
        },
      });
    }
  }, [quantity, shoppingCart.quantity, shoppingCart.arrayID, cart]);

  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>ERROR</Text>;
  }
  if (!data) {
    return <Text>Not found</Text>;
  }
  return (
    <View>
      <Card>
        {productList &&
          productList.map(product => (
            <PaymentCard key={product.id} {...product.goods} id={product.id} />
          ))}
        {/* <PaymentCard /> */}
        <CardItem>
          <Left>
            <Text>Tổng tiền: </Text>
          </Left>
          <Right>
            <Text>{`${shoppingCart.total} VND`}</Text>
          </Right>
        </CardItem>
        <CardItem style={{justifyContent: 'center'}}>
          <Button bordered>
            <Text>Thanh toán</Text>
          </Button>
        </CardItem>
      </Card>
    </View>
  );
};

export default ShoppingCart;
