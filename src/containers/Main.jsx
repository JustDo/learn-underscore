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
        /**    var sortedIndexArray = [{
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
**/

        //indexOf
        // let index = learn.indexOf([1, 2, 3], NaN);


        /**
                    let source = {name:'zhangpeng',age:28,sex:'man'}
                    let source2 = {address:'开封'}
                    let source3 = {birthday:'1991-03-08'}
                    let target = learn.extendOwn({},source,source2,source3);
        **/
    let obj = {name:'zp',age:'17',sex:'man'};
    Object.prototype.address = 'zie'
        console.log(learn.keys(obj), '我的索引');
    }
    render() {
        return ( < h1 > 学习 underscore < /h1>)
        }

    }

    export default Main;
