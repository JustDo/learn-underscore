String.prototype.removeSpace = function() {
    let reg = /\s/g
    return this.replace(reg, '');
}

String.prototype.encryptPhone = function() {
    const reg1 = /[^\d]/g
    let phone = this.replace(reg1, '');//去除手机号中的 空格  - , 等
    const reg2 = /(\d{3})(\d{4})(\d{4})/
    return phone.replace(reg2, '$1****$3');
}

// 不传入第一个参数，那么默认为window
// 改变this指向, 让新对象可以执行此函数。 那么思路变成: 给新对象添加一个函数，然后在执行完以后删除
Function.prototype.myCall = function(context){
    var context = context || window
    context.fns = this;
    var args = [...arguments].slice(1)
    var result = context.fns(...args)
    delete context.fn
    return result
}

// 为了克服js的一些坑...
// const Utils = {};
//
// export default Utils;
