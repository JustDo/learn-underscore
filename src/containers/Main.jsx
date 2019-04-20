import React, { Component } from 'react';

import learn from '../demo/learn-underscore.js';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',

    }
  }


componentDidMount(){


    console.log(learn.last([3,7,4,5,6]), '我的索引');
}
  render() {
    return (
        <h1>学习 underscore</h1>

    )
  }

}

export default Main;
