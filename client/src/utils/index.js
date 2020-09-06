/**
 * currify the gave function
 * If number n is given, `curry` will currify the function base on the n arguments.
 * @param {Function} fn
 * @param {Number} n specify number of arguments given.
 */
const curry = (fn, n) => {
    const arity = n || fn.length;
    return function curried(...args) {
        return args.length >= arity
            ? fn.call(this, ...args)
            : (...rest) => {
                  return curried.call(this, ...args, ...rest);
              };
    };
};

/**
 *  pipe doing each functions and return the result.
 * @param {Function[]} fns
 */
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/**
 * compose doing each functions from right to left and return the result.
 * @param {Function[]} fns
 */
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

/**
 * map array. (can be used by curry.)
 * @param {Function} fn
 * @param {Array<any>} array
 */
const map = curry((fn, ary) => ary.map(fn), 2);

/**
 * filter array. (can be used by curry.)
 * @param {Function} fn
 * @param {Array<any>} array
 */
const filter = curry((fn, ary) => ary.filter(fn), 2);

/**
 * reduce array. (can be used by curry.)
 * @param {Function} fn
 * @param {any} initial
 * @param {Array<any>} array
 */
const reduce = curry((fn, initial, ary) => ary.reduce(fn, initial), 3);

/**
 * @description get the value by prop of an object
 * @param {string} prop
 * @param {object} obj
 */
const prop = curry((prop, obj) => obj[prop], 2);

const and = curry((f1, f2) => o => f1(o) && f2(o), 2);

const push = x => ary => [...(ary || []), x];

const pop = ary => ary[ary.length - 1];

const shift = ary => ary[0];

const unshift = x => ary => [x, ...(ary || [])];

const slice = (from, to, ary) => ary.slice(from, to);

const repeat = n => f => x => (n > 0 ? repeat(n - 1)(f)(f(x)) : x);

/**
 * XOR
 * @param {object} a
 * @param {object} b
 * @return boolean
 */
export const XOR = (a, b) => !!(a ^ b);

/**
 * detect is empty or not
 * @param obj
 * @returns {boolean}
 */
const isEmpty = obj => {
    if (obj) return Object.keys(obj).length == 0;

    return obj == null;
};

/**
 * random the sequence for an array, then return new array
 * @param {any[]} ary
 * @returns {any[]}
 */
const shuffle = ary => {
    const arr = [...ary];

    ary.forEach((x, i) => {
        const j = ~~(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    });

    return arr;
};

/**
 * group array by the result fn given. (can be used by curry.)
 * @param {Function} fn
 * @param {Array<any>} array
 */
const groupBy = curry((fn, array) => {
    const genKey = ele => JSON.stringify(fn(ele));

    const dispatchByKey = (prev, curr) => ({
        ...prev,
        [genKey(curr)]: push(curr)(prop(genKey(curr))(prev) || [])
    });

    const groupInAnObject = reduce(dispatchByKey, {});

    const dispatchToList = obj => Object.keys(obj).map(key => obj[key]);

    return pipe(groupInAnObject, dispatchToList)(array);
}, 2);

/**
 *
 * @param {any} val 要被檢測的數值
 * @param {string} typeString 定義的數值型別
 * @param {any?} opt 額外的設定 {noEmpty_array, noEmpty_object, nofalsy}
 * @returns {boolean}
 */
const _checkType = (val, typeString, opt) => {
    let isTrueType = true;

    // 如果沒有給 type 則只單純檢查是否有值
    if (!typeString) return val !== undefined && val !== null;

    // 支援 復合型別
    if (typeString.split('|').length > 1) {
        let typeList = typeString.split('|');
        let canBeTrueType = false;

        for (let k in typeList) {
            let typeStr = typeList[k];

            canBeTrueType = canBeTrueType || _checkType(val, typeStr, opt);
        }

        return canBeTrueType;
    }

    // 支援 array類型 的判斷
    if (/^\w*\[\]$/.test(typeString)) {
        typeString = typeString.split('[]')[0];

        if (!Array.isArray(val)) return false;

        if (opt && opt.noEmpty_array && val.length == 0) return false;

        for (let i in val) {
            let ele = val[i];

            isTrueType = isTrueType && _checkType(ele, typeString, opt);
        }

        return isTrueType;
    }

    if (typeString === 'Date') {
        // Date 參數
        isTrueType =
            isTrueType &&
            Object.prototype.toString.call(val) === '[object Date]' &&
            !isNaN(val);
    } else {
        // Date 參數
        isTrueType =
            isTrueType &&
            (typeString === 'number' ? !isNaN(val) : typeof val === typeString);
    }

    opt &&
        opt.noEmpty_object &&
        typeString &&
        (isTrueType = isTrueType && !isEmpty(val));
    opt && opt.nofalsy && (isTrueType = isTrueType && !!val);

    return isTrueType;
};

/**
 *
 * @param {string} key 欄位的 key
 * @param {any} args 要被檢測的 參數 form
 */
const _getKeyValue = (key, args) => {
    let val = args[key];

    if (key.split('.').length > 1) {
        val = args;
        let steps = key.split('.');
        for (let i = 0; i < steps.length; i++) {
            key = steps[i];

            if (typeof val !== 'object') return {};

            val = val[key];
        }
    }

    return { key, val };
};

/**
 * @description 檢查表單參數是否合法
 * @param {any[]} formSchema 檢查表單的參數格式
 * @param {any} args 要被檢查的參數
 * @returns {boolean|string} 回傳值是 boolean 或 errMsg(若有的話)
 */
const formVerify = (formSchema, args) => {
    for (let i = 0; i < formSchema.length; i++) {
        let checkObj = formSchema[i];
        let key = typeof checkObj === 'string' ? checkObj : checkObj.key;
        let val = '';

        ({ key, val } = _getKeyValue(key, args));

        if (
            typeof checkObj === 'object' &&
            !_checkType(val, checkObj.type, checkObj.opt)
        ) {
            if (checkObj.opt && checkObj.opt.errMsg) return checkObj.opt.errMsg;

            return false;
        }

        if (val === undefined || val === null) return false;
    }
    return true;
};

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

export default {
    shift,
    unshift,
    slice,
    and,
    pop,
    push,
    map,
    filter,
    reduce,
    prop,
    curry,
    pipe,
    compose,
    XOR,
    isEmpty,
    shuffle,
    groupBy,
    formVerify,
    debounce,
    repeat
};
