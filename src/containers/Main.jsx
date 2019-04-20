import React, {
    Component
} from 'react';

import learn from '../demo/learn-underscore.js';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',

        }
    }


    componentDidMount() {

        // sortedIndex
        var sortedIndexArray = [{
            name: 'moe',
            age: 40
        }, {
            name: 'curly',
            age: 60
        }];
        var result = learn.sortedIndex(sortedIndexArray, {
            name: 'larry',
            age: 50
        }, 'age');// "age" 即为iteratee， 排序依据 40 < 50 < 60
        console.log(result, '我的索引');
    }
    render() {
        return (
            <h1> 学习 underscore < /h1>

        )
    }

}

export default Main;
