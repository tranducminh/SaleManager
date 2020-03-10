import React, {useEffect} from 'react';
import {Container, Content, Text} from 'native-base';
import Card from '../../components/Admin/Card';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const GET_ALL_GOODS = gql`
  query getAllGoods {
    getAllGoods {
      name
      image
      currencyUnit
      price
      quantity
      description
    }
  }
`;

const ProductList = () => {
  const {data, loading, error} = useQuery(GET_ALL_GOODS);
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>ERROR</Text>;
  }
  if (!data) {
    return <Text>Not found</Text>;
  }
  console.log(data);
  return (
    <Container>
      <Content>
        {data.getAllGoods &&
          data.getAllGoods.map(goods => <Card key={goods.id} {...goods} />)}
      </Content>
    </Container>
  );
};

export default ProductList;
