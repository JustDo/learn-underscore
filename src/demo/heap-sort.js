// [4,2,35,87,21,32]
// 原始形状
//                  4
//                /   \
//               2    35
//             /  \   /
//            87  21 32

Array.prototype.heapSort = function() {
    this.buildMaxHeap();//先构建最大堆
    for (let i = this.length - 1; i > 0; i--) {
        this.swap(0, i);//将最后一个元素与堆顶元素调换, 此时堆顶元素到数组末尾, 不需再管它
        //将调换以后的数据再次进行最大堆构建, 进入到下一次for 循环中, 对调,构建，直到排序完成
        this.heapAdjust(0, i);
    }
    return this;
}

//构建成 最大堆
//                  87
//                /   \
//               21    35
//             /  \   /
//            2   4 32
Array.prototype.buildMaxHeap = function() {
    //构建最大堆要从最后一个非叶子节点开始, 即 35, 索引 index = 2便是
    for (let i = Math.floor(this.length / 2) - 1; i >= 0; i--) {
        this.heapAdjust(i, this.length);
    }
    return this;
}

//堆调整
Array.prototype.heapAdjust = function(current, length) {
    let largest = current,// 当前节点 索引, 最大堆的情况下定义为 largest
        left = 2 * current + 1,//左子节点  索引
        right = 2 * current + 2;//右子节点 索引
    //与左子节点比较，若< left 的值，则将左的index 给largest
    if (left < length && this[largest] < this[left]) {
        largest = left;
    }
    //与右子节点比较，若< right 的值，则将右的index 给largest
    if (right < length && this[largest] < this[right]) {
        largest = right;
    }
    //如果出现了 父<子 的情况说明largest有变化,则进入
    if (largest !== current) {
        //根据变化后的索引, 对调对应的值
        this.swap(current, largest);
        //对调以后,还需再与新的左右子节点进行对比
        this.heapAdjust(largest, length);
    }
}

Array.prototype.swap = function(i, j) {
    let tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
}


module.exports = Array;
