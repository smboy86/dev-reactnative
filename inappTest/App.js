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
  View,
  Text,
  StatusBar,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import InAppPurchase, {
  Product,
  Purchase,
} from '@mu29/react-native-in-app-purchase';

const PRODUCT_IDS = ['test_product_1', 'test_product_2', 'testsub_t1'];
class App extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    // Set event handlers
    InAppPurchase.onFetchProducts(this.onFetchProducts);
    InAppPurchase.onPurchase(this.onPurchase);
    InAppPurchase.onError(this.onError);

    // Configure and fetch products
    InAppPurchase.configure().then(() => {
      InAppPurchase.fetchProducts(PRODUCT_IDS);
    });

    this.flush();
  }

  onPurchase = purchase => {
    // Validate payment on your backend server with purchase object.
    console.log('onPurchase  ::: ', purchase);
    setTimeout(() => {
      // Complete the purchase flow by calling finalize function.
      InAppPurchase.finalize(purchase, true)
        .then(() => {
          Alert.alert('In App Purchase', 'Purchase Succeed!');
        })
        .catch(error => {
          console.log('결제 서버 확인 오류!');
        });
    }, 5000);
  };

  onFetchProducts = products => {
    console.log('onFetchProducts   :: ', products);
    this.setState({products});
  };

  onError = e => {
    console.log('errrrrr   :: ', e);
  };

  flush = () => {
    // If the validation - finalization process is not performed properly, (ex: Internet connection)
    // call this function to fetch pending purchases, and restart the validation process.
    InAppPurchase.flush().then(purchases => {
      console.log('flush  :: ', purchases);
      purchases.forEach(this.onPurchase);
    });
  };

  onTouch = () => {
    Alert.alert('하이', '앱 로드 완료');
  };

  renderItem = item => (
    <TouchableOpacity
      key={item.title}
      activeOpacity={0.8}
      onPress={() => InAppPurchase.purchase(item.productId)}
      style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>
          {item.currency} {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.onTouch}>
              <Text>인앱결제 시도</Text>
            </TouchableOpacity>
          </View>
          {this.state.products.map(this.renderItem)}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#F2F4F9',
  },
  title: {
    fontSize: 16,
    color: '#191919',
  },
  priceTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    backgroundColor: '#2D2D2D',
  },
  priceText: {
    fontSize: 12,
    color: '#FAFAFA',
  },
  button: {
    marginTop: 16,
    marginBottom: 0,
    justifyContent: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 32,
  },
  text: {
    fontSize: 16,
    color: '#FAFAFA',
  },
});

export default App;
