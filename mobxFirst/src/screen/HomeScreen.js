import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';

@inject('cartStore')
@observer
export default class HomeScreen extends React.Component {
  onAddfood = idx => {
    const testFood = {
      item_id: idx,
      buyNum: 0,
    };
    this.props.cartStore.addFood(testFood);
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>HomeScredddden</Text>
        <TouchableOpacity onPress={() => this.onAddfood('idx-1')}>
          <Text>idx Add Food 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onAddfood('idx-2')}>
          <Text>idx Add Food 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onAddfood('idx-3')}>
          <Text>idx Add Food 3</Text>
        </TouchableOpacity>
        <View>
          <Text>
            {this.props.cartStore.list.length === 0
              ? '[]'
              : JSON.stringify(this.props.cartStore.list)}
          </Text>
        </View>
      </View>
    );
  }
}
// const HomeScreen = ({navigation}, props) => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>HomeScreen</Text>
//     </View>
//   );
// };

// export default HomeScreen;
