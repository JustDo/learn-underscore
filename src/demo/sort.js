/**
# Author:        张鹏
# Create Date:   2019-04-23 15:32:36
# Last modified: 2019-04-23 15:32:49
# Description:
**/



//选择排序
let array = [1, 4, 6, 3, 2];
//思想:  在数组中找到最大元素, 放在末尾;
//实现:  逐个固定好外层循环 array[i], 用内层循环array[j]逐个与外层对比, array[i] > array[j] 则交换位置,  在这个过程当中，只要相对较大的都会往后交换, 两个已与其它数字交换过的大数 相遇同样会交换, 例如: 4,6
//也就是说，并不是一开始就把最大的直接放后最后去了, 而是一个逐渐的过程

function selectSort(array) {
// 外层 length - 1; 给内层 i+1 的机会去比较, 否则内层array[length]越界
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
        // 以它后面一个 array[i + 1] 开始，逐个与 arry[i]进行对比
        //发现比 固定元素array[i]大的，则交换位置 ， 此为从小到大排序, 反之从大到小
        //注: 在两个循环中元素对比完后, array 数组顺序已改变, 即每次对比时array 顺序可能都不一样
        for (let j = i + 1; j < length; j++) {
            let a_i = array[i];
            let a_j = array[j];
            if (a_i > a_j) {
                [array[i], array[j]] = [array[j], array[i]]
            }
        }
    }
    return array;
}


//冒泡排序
//思想: 相邻元素进行比较, 大数放后面
//实现: 固定外层循环, 内层循环自己与后面一位对比， 即 array[j], array[j+1]对比，
//  外层:   i=0 时，内层走完，则最大数已到最后位置;
//         i=1 时, 内层走完, 次大数到倒数第二位;
//         最小数不必再比, 所以外层 length - 1
//  内层:  外层每 + 1 后， 代表已经有一个数字放到后面,则不必再去比较后面那些数字 , 因此 length - i -1;    
function bubbleSort(array){
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            let a_j = array[j];
            let a_j1 = array[j+1];
            if (a_j > a_j1) {
                [array[j], array[j+1]] = [array[j+1], array[j]]
            }
        }
    }
    return array;
}


// const Utils = {};
//
// export default Utils;
