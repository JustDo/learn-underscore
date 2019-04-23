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
function bubbleSort(array) {
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            let a_j = array[j];
            let a_j1 = array[j + 1];
            if (a_j > a_j1) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
        }
    }
    return array;
}

//插入排序  [1, 4, 6, 3, 2]
//思想: 1. 将第一个元素看成是排序好的序列, 把第二个元素到最后一个看成是未排序序列 .  1,  [4,6,3,2]
//     2. 扫描待排序序列, 将扫描到的元素插入到有序序列的适当位置
/**实现:
      i   preIndex    array[preIndex]    current        结果
      1       0           1               4             1,4,6,3,2
 4 > 1 ,所以不用变换顺序,  这时要看成   <1,4>   <6,3,2>
      2       1           4               6             1,4,6,3,2
 6 > 4 ,不用变换,更不用与 1 去比较，因为<1,4> 是有序的。  这时看成  <1,4,6> <3,2>
      3       2           3               3             1,4,'6',6,2
3 < 6, 将6插到原来3的位置 ，即array[preIndex+1]=array[preIndex], 3保存在了current中， 此时已在while循环里, 要走preIndex--   ， 这时看成  <1,4,6>  <6,2>,  current要按顺序与6,4,1对比
              1           4               3             1,'4',4,6,2
       3<4 , 因preIndex--, 这时要用第二位的4与 current对比, 然后给array[preindex+1]赋值
              0                                         1,3,4,6,2
        出while循环, array[preIndex+1] 填充 current,  这时看成 <1,3,4,6>  <2>后面就需要用current=2, 按顺序与 6,4,3,1 对比
     4        3           6               2             1,3,4,6,6
**/
function insertSort(array) {
    let length = array.length;
    let preIndex, current;
    for (let i = 1; i < length; i++) {
        preIndex = i - 1;
        current = array[i];
        while (preIndex >= 0 && array[preIndex] > current) {
            array[preIndex + 1] = array[preIndex];
            preIndex--;// 作用是让 preIndex 少1 , 便于后面 array[preIndex+1] 赋值
        }
        array[preIndex + 1] = current;
    }
    return array;
}

// const Utils = {};
//
// export default Utils;
