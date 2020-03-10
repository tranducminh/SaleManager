/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {Root} from 'native-base';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import AppContainer from './AppNavigator';
import {Provider} from 'react-redux';

import store from './store';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // request: async operation => {
  //   const token = await AsyncStorage.getItem('token');
  //   operation.setContext({
  //     headers: {
  //       authorization: '1123423',
  //     },
  //   });
  // },
});

client
  .query({
    query: gql`
      {
        getAllGoods {
          name
          quantity
        }
      }
    `,
  })
  .then(result => console.log(result));

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Root>
        <AppContainer />
      </Root>
    </ApolloProvider>
  </Provider>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
