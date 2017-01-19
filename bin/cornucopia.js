(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    function getNow() {
        var eTime = new Date();
        var yearStr = eTime.getFullYear().toString();
        var monthStr = expandStr((eTime.getMonth() + 1).toString(), 2);
        var dayStr = expandStr(eTime.getDate().toString(), 2);
        var hourStr = expandStr(eTime.getHours().toString(), 2);
        var minStr = expandStr(eTime.getMinutes().toString(), 2);
        var secStr = expandStr(eTime.getSeconds().toString(), 2);
        if ((!yearStr) || (!monthStr) || (!dayStr) ||
            (!hourStr) || (!minStr) || (!secStr))
            return null;
        return {
            date: dayStr + '/' + monthStr + '/' + yearStr,
            time: hourStr + ':' + minStr + ':' + secStr,
            day: dayStr,
            month: monthStr,
            year: yearStr
        };
    }
    exports.getNow = getNow;
    function expandStr(baseStr, tLength) {
        if ((typeof baseStr !== 'string') ||
            (!isInteger(tLength)) ||
            (tLength < 2))
            throw new Error('Invalid parameters to expandStr() function.');
        if (baseStr.length >= tLength)
            return baseStr;
        return expandStr('0' + baseStr, tLength);
    }
    exports.expandStr = expandStr;
    function trimNumStr(nStr, tLength, trimLeft) {
        var strRegex = /^0*[1-9]\d*$/;
        if ((typeof nStr !== 'string') ||
            (!strRegex.test(nStr)) ||
            (!isInteger(tLength)) ||
            (tLength < 1) ||
            ((nStr.charAt(0) !== '0') && (nStr.length <= tLength)) ||
            (typeof trimLeft !== 'boolean'))
            throw new Error('Invalid parameters to trimNumStr() function.');
        var trimLeftRegex = new RegExp('[1-9]\\d{0,' + (tLength - 1) + '}$');
        var trimRightRegex = new RegExp('[1-9]\\d{0,' + (tLength - 1) + '}');
        var trimRegex = (trimLeft) ?
            trimLeftRegex :
            trimRightRegex;
        var trimStr = nStr.match(trimRegex);
        if (trimStr === null)
            return null;
        if (trimStr.length === 0)
            return null;
        return trimStr[0];
    }
    exports.trimNumStr = trimNumStr;
    function strToNumstr(inputStr) {
        if (typeof inputStr !== 'string')
            throw new Error('Invalid parameter to textToNum() function.');
        return inputStr.replace(/\D/g, '');
    }
    exports.strToNumstr = strToNumstr;
    function getBetween(raw, min, max) {
        if ((!isInteger(raw)) ||
            (!isInteger(min)) ||
            (!isInteger(max)))
            throw new Error('Invalid parameters to getBetween() function');
        if (raw < min)
            return min;
        if (raw > max)
            return max;
        return raw;
    }
    exports.getBetween = getBetween;
    function cleanNumStr(numStr) {
        if (typeof numStr !== 'string')
            throw new Error('Invalid parameter to cleanNumStr() function');
        var cleanStr = stripLeadingZero(numStr.trim().replace(/,/g, ''));
        if ((/^\d+$/.test(cleanStr)) || (/^\d+.\d+$/.test(cleanStr)))
            return cleanStr;
        return '';
    }
    exports.cleanNumStr = cleanNumStr;
    function stripLeadingZero(numStr1) {
        if (numStr1 === '')
            return numStr1;
        if (numStr1.slice(0, 1) !== '0')
            return numStr1;
        return stripLeadingZero(numStr1.slice(1));
    }
    exports.stripLeadingZero = stripLeadingZero;
    function arrToCSV(arr) {
        return arr.reduce(function (accum, nextItem) {
            return accum + nextItem.join('\t') + '\r\n';
        }, '');
    }
    exports.arrToCSV = arrToCSV;
    function isInteger(value) {
        return ((typeof value === "number") &&
            (isFinite(value)) &&
            (Math.floor(value) === value));
    }
    ;
    function getBlankArray(_arrSize) {
        if ((typeof _arrSize !== 'number') ||
            (_arrSize === Infinity) ||
            (_arrSize !== _arrSize))
            throw new Error('Invalid parameter passed to getBlankArray() function');
        var arrSize = Math.round(_arrSize);
        var arr = Array(arrSize);
        var i = 0;
        for (; i < arrSize;)
            arr[i++] = '';
        return arr;
    }
    exports.getBlankArray = getBlankArray;
    function getSequentialArray(arrSize, _step) {
        if ((typeof arrSize !== 'number') ||
            (arrSize === Infinity) ||
            (arrSize !== arrSize) ||
            (typeof _step !== 'number') ||
            (_step === Infinity) ||
            (_step !== _step))
            throw new Error('Invalid paramater to getSequentialArray() function');
        var step = (_step === void 0) ?
            1 :
            _step;
        return getBlankArray(arrSize)
            .map(function (_, index) {
            return index * step;
        });
    }
    exports.getSequentialArray = getSequentialArray;
});
