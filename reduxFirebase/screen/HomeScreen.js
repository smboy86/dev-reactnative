import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

class HomeScreen extends Component {
  state = {
    counter: 0,
  };

  increase = () => {
    this.setState({counter: this.state.counter + 1});
  };

  decrease = () => {
    this.setState({counter: this.state.counter - 1});
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={this.props.increase}>
          <Text>증가</Text>
        </TouchableOpacity>
        <Text>{this.props.counter}</Text>
        <TouchableOpacity onPress={this.props.decrease}>
          <Text>감소</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increase: () => dispatch({type: 'INCREASE'}),
    decrease: () => dispatch({type: 'DECREASE'}),
  };
};

// function mapStateToProps(state) {
//   return {
//     counter: state.counter,
//   };
// }

// function mapDispatchToProps(dispatch) {}

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
// export default HomeScreen;
