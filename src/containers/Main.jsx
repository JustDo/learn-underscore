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
        // var sortedIndexArray = [{
        //     name: 'moe',
        //     age: 40
        // }, {
        //     name: 'curly',
        //     age: 60
        // }];
        // var result = learn.sortedIndex(sortedIndexArray, {
        //     name: 'larry',
        //     age: 50
        // }, 'age');// "age" 即为iteratee， 排序依据 40 < 50 < 60


        //indexOf
        // let index = learn.indexOf([1, 2, 3], NaN);

        let array = [1, 4, 6, 3, 2];
        function select(array){

            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    let a_j = array[j];
                    let a_j1 = array[j+1];
                    if (a_j > a_j1) {
                        [array[j], array[j+1]] = [array[j+1], array[j]]
                    }
                }
            }
            return array;
        }
        console.log(select(array),'我的结果')
        // console.log(index, '我的索引');
    }
    render() {
        return ( < h1 > 学习 underscore < /h1>)
    }

}

export default Main;
