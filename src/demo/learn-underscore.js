/**
# Author:        张鹏
# Create Date:   2019-04-18 18:10:42
# Last modified: 2019-04-18 18:11:06
# Description:   今天学习 underscore
**/

(function() {

    // var root = this;
    // var previousUnderscore = root._;

    // 缓存变量, 便于压缩代码 到 min.js
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FunProto = Function.prototype;

    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    // ES5 原生方法 , 如果浏览器支持，则优先用原生
    var
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FunProto.bind,
        nativeCreate = Object.create;

    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    //内部函数
    //返回一个高效版本的传入回调， 应用到其它 underscore 函数中
    var optimizeCb = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount === null ? 3 : argCount) {
            case 1:
                return function(value) {
                    return func.call(context, value);
                }
            case 2:
                return function(value, other) {
                    return func.call(context, value, other);
                }
            case 3:
                return function(value, index, collection) {
                    return func.call(context, value, index, collection);
                }
            case 4:
                return function(accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                }
        }
        return function() {
            return func.apply(context, arguments)
        }

    }

    var cb = function(value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    }

    _.iteratee = function(value, context) {
        return cb(value, context, Infinity)
    }

    //内部函数
    //分配函数, 返回一个函数，这个函数将参数arguments 中的键值赋给新的obj
    var createAssigner = function(keysFunc, undefinedOnly) {
        //参数的形式 ({}, source1,source2 ....)
        //将第二到最后一个source 键值对都添加到 {} 中, 即使 第一个参数不是 {}, 就添加到 source1
        return function(obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) return obj;//参数小于2个，则无需继承属性
            //第一层for: 遍历 [source1,source2,source3]
            //第二层for: 遍历 source1/2/3 中的键值, 如果obj[key]==undefined,则添加进去
            for (let index = 1; index < length; index++) {
                let source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (let i = 0; i < l; i++) {
                    let key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        }
    }

    var property = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };
    var Max_Array_Index = Math.pow(2, 53) - 1;
    var getLength = property('length')
    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length === 'number' && length >= 0 && length <= Max_Array_Index;
    };

    // -------------------------------------集合
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };




    // -------------------------------------数组

    //返回数据中的第一个元素; n 返回从第一个开始前n 个元素; guard 允许使用 _.map
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0; // array 为空, 返回 undefined
        if (n == null || guard) return array[0]; // 未传 n, 返回第一个元素
        return _.initial(array, array.length - n); // 传n , 返回前n 个元素组成的数组
    }
    //返回除最后一个元素的其它所有元素; 尤其在arguments 对象特别有用;
    //n 排除掉数组后面的 n 个元素, 用slice 切片切除最后 n 个元素
    _.initial = function(array, n, guard) {
        //用 Math.max(0, x) 防止n 值超过数据长度以后 x 变为负数
        //若为 x 负数, 则取 0 > x; slice.call(array, 0 ,0) 返回空数组
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    }

    _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    }
    //返回数组中除了第一个元素外的其它所有元素; n 返回从n 开始的剩余元素
    _.rest = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    }

    _.object = function(list, values) {
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    }

    //返回  创建 findIndex/findLastIndex 的函数  dir  正数为正序, 负数为逆序
    function createPredicateIndexFinder(dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        }
    }

    //查找第一个符合断言的值的索引
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);

    // _.sortedIndex([10, 20, 30, 40, 50], 35);
    //  输出 3
    //使用二分查找确定 35 在list中插入后的index
    //iteratee 如果传入的话，将作为排序依据
    _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0,
            high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value)
                low = mid + 1;
            else high = mid;

        }
        return low;
    }

    //生成 创建indexOf, indexLastOf 的函数
    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
            var i = 0,
                length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + length, i);
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) return idx;
            }
            return -1;
        }
    }

    //_.indexOf(array, value, [isSorted]) 返回value 在array 中首次出现的索引值
    //如果value 不存在 则return -1;
    //如果array , 是个比较大的数组 或数组已经排序, isSorted = true 将进行二分查找
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    // ------------------------------------ 函数

    // -------------------------------------对象

    _.has = function(obj, key) {
        return obj !== null && hasOwnProperty.call(obj, key);
    }



    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys.push(key);

        // if(hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    }

    //复制自己的属性覆盖到目标对象<继承的属性除外>   跟它的作用类似Object.assign
    _.extendOwn = _.assign = createAssigner(_.keys);

    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }



    _.each(['Function', 'String', 'Number'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
        }
    })

    //检测attrs 中的键值 是否包含在 object中
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs),
            length = keys.length;
        if (object === null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    }

    // 适当优化 isFunction , 解决在 old v8 中的typeof bug
    if (typeof /./ !== 'function' && typeof Int8Array !== 'object') {
        _.isFunction = function(obj) {
            return typeof obj === 'function' || false;
        };
    }


    //返回一个断言函数, 检测某对象是否包含指定的 键值对
    _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        }
    }



    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj !== +obj;
    }

    // -------------------------------------Utility
    //默认迭代器
    _.identity = function(value) {
        return value;
    }


    _.property = property;

}.call(this))


// const underscore = {
//     var Max_Array_Index = Math.pow(2, 53) - 1;
// }
// module.exports = underscore
