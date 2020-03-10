/* eslint-disable radix */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, {useState} from 'react';
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
  Toast,
} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
const addProduct = () => {
  // eslint-disable-next-line no-undef
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [currencyUnit, setCurrencyUnit] = useState('VND');

  const [uriImage, setUriImage] = useState();
  const [typeImage, setTypeImage] = useState();

  const CREATE_GOODS = gql`
    mutation createGoods(
      $name: String
      $quantity: Int
      $price: Int
      $currencyUnit: String
      $description: String
      $image: String
      $userID: String
    ) {
      createGoods(
        name: $name
        quantity: $quantity
        price: $price
        currencyUnit: $currencyUnit
        description: $description
        image: $image
        userID: $userID
      ) {
        image
      }
    } # Write your query or mutation here
  `;

  const [creatGoods] = useMutation(CREATE_GOODS, {
    async onCompleted({creatGoods}) {
      if (creatGoods.success === true) {
      } else {
        Toast.show({
          text: `${creatGoods.message}`,
          buttonText: 'Okay',
          duration: 2000,
          type: 'danger',
          position: 'top',
          style: {marginTop: 50},
        });
      }
    },
  });

  options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  chooseImage = () => {
    ImagePicker.showImagePicker(this.options, response => {
      setUriImage(response.uri);
      setTypeImage(response.type);
      console.log(response);
    });
  };
  submit = async () => {
    // eslint-disable-next-line no-bitwise
    console.log(123);
    let timestamp = ((Date.now() / 1000) | 0).toString();
    let api_key = '458263512324179';
    let api_secret = 'JK1mgiozg0-sszooH3X7dFF0_hE';
    let hash_string = 'timestamp=' + timestamp + api_secret;
    // let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/ducminh/image/upload';

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.response.url) {
        console.log(xhr.response.url);
        creatGoods({
          variables: {
            name,
            quantity: parseInt(quantity),
            price: parseInt(price),
            currencyUnit,
            description,
            image: xhr.response.url,
            userID: '123456789',
          },
        });
        // console.log(data);
      }
    };
    let formdata = new FormData();
    formdata.append('file', {
      uri: uriImage,
      type: typeImage,
      name: 'upload.png',
    });
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    // formdata.append('signature', signature);
    formdata.append('upload_preset', 'saleManager');
    xhr.send(formdata);
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input
              value={name}
              placeholder="Product name"
              onChangeText={text => setName(text)}
            />
          </Item>
          <Item>
            <Input
              placeholder="Description"
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </Item>
          <Item>
            <Input
              placeholder="Price"
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </Item>
          <Item>
            <Input
              placeholder="Currency Unit"
              value={currencyUnit}
              onChangeText={text => setCurrencyUnit(text)}
            />
          </Item>
          <Item>
            <Input
              placeholder="Quantity"
              value={quantity}
              onChangeText={text => setQuantity(text)}
            />
          </Item>
          <Item>
            <Button transparent onPress={this.chooseImage}>
              <Text>Choose image</Text>
            </Button>
            {uriImage ? <Text style={{color: 'green'}}>Success</Text> : null}
          </Item>
        </Form>
        {/* <Image
          source={{
            uri:
              'http://res.cloudinary.com/ducminh/image/upload/v1583680848/upload_hesttj.jpg',
          }}
          style={{width: 100, height: 100}}
        /> */}
        <Button style={styles.button} onPress={this.submit}>
          <Text>Add new product</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default addProduct;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 40,
  },
});
