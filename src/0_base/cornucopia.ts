/**
 * This function reads the current system time and date and returns an
 * object with two properties: the date in the format dd/mm/yyyy and the
 * time in the format hh:mm:ss.
 *
 * History:
 * Created: 05-Aug-2016
 * Converted to TypeScript 12-Jan-2017
 * Last update: 12-Jan-2017
 *
 * @function
 * @returns {Object} An object with two properties, date and time.
 */


interface DateObj {
    
    date: string;
    time: string;
    day: string;
    month: string;
    year: string;
    
}

function getNow (): DateObj | null {
    
    const eTime: Date = new Date();
    
    const yearStr: string = eTime.getFullYear().toString ();
    const monthStr: string = expandStr (
            (eTime.getMonth() + 1).toString (), 2);
    const dayStr: string = expandStr (eTime.getDate().toString (), 2);
    const hourStr: string = expandStr (eTime.getHours().toString (), 2);
    const minStr: string = expandStr (eTime.getMinutes().toString (), 2);
    const secStr: string = expandStr (eTime.getSeconds().toString (), 2);
    
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


/**
 * This function takes a string value and an integer and 'fills out' the
 * string value with leading zeros.  This current version was designed to
 * help print date and time values in a more aesthetic form, but has
 * other purposes beyond this.
 *
 * History:
 * Created: 05-Aug-2016
 * Converted to TypeScript 12-Jan-2017
 * Last update: 12-Jan-2017
 *
 * @function
 * @param {String} baseStr - The string to be expanded.
 * @param {Number} tLength - The desired length of the string.
 * @returns {String}
 */
function expandStr (baseStr: string, tLength: number): string {
    
    if ((typeof baseStr !== 'string') ||
            (!isInteger (tLength)) ||
            (tLength < 2))
        throw new Error ('Invalid parameters to expandStr() function.');
    
    if (baseStr.length >= tLength) return baseStr;
    return expandStr ('0' + baseStr, tLength);
    
}


/**
 * This function trims a string value representing a number to a given
 * length, after any leading zeros have been removed.
 *
 * History:
 * Created: 10-Aug-2016
 * Converted to TypeScript 12-Jan-2017
 * Last update: 12-Jan-2017
 *
 * @function
 * @param {String} nStr - The string to be trimmed.  This needs to be numeric
 *      string with at least one non-zero digit, otherwise the function
 *      returns false.
 * @param {Number} tLength - The desired length of the string.
 * @param {Boolean} trimLeft - Should the string prefix be removed (true) or
 *      the suffix (false).
 * @returns {String} Return false if the parameters are not valid or
 *      the string does not need to be trimmed, or the trimmed string
 *      otherwise.
 */
function trimNumStr (nStr: string, tLength: number, trimLeft: boolean)
        : string | null {
    
    const strRegex: RegExp = /^0*[1-9]\d*$/;
    
    /*
    if (typeof nStr !== 'string') return false;
    if (typeof tLength !== 'number') return false;
    if (!strRegex.test (nStr)) return false;
    if ((nStr.charAt (0) !== '0') && (blNum.length <= tLength))
            return false;
    */
    
    if ((typeof nStr !== 'string') ||
            (!strRegex.test (nStr)) ||
            (!isInteger (tLength)) ||
            (tLength < 1) ||
            ((nStr.charAt (0) !== '0') && (nStr.length <= tLength)) ||
            (typeof trimLeft !== 'boolean'))
        throw new Error ('Invalid parameters to trimNumStr() function.');
    
    const trimLeftRegex: RegExp = new RegExp (
            '[1-9]\\d{0,' + (tLength - 1) + '}$');
    const trimRightRegex: RegExp = new RegExp (
            '[1-9]\\d{0,' + (tLength - 1) + '}');
    const trimRegex: RegExp = (trimLeft) ?
            trimLeftRegex :
            trimRightRegex;
    const trimStr: string[] | null = nStr.match (trimRegex);
    
    if (trimStr === null) return null;
    if (trimStr.length === 0) return null;
    return trimStr [0];
    
}


function strToNumstr (inputStr: string): string {
    
    if (typeof inputStr !== 'string')
        throw new Error ('Invalid parameter to textToNum() function.');
    
    return inputStr.replace (/\D/g, '');
    
}


function getBetween (raw: number, min: number, max: number): number {
    
    if ((!isInteger (raw)) ||
            (!isInteger (min)) ||
            (!isInteger (max)))
        throw new Error
                ('Invalid parameters to getBetween() function');
    
    if (raw < min) return min;
    if (raw > max) return max;
    return raw;
    
}


function cleanNumStr (numStr: string): string {
    
    if (typeof numStr !== 'string')
        throw new Error
                ('Invalid parameter to cleanNumStr() function');
    
    const cleanStr: string = stripLeadingZero (
            numStr.trim().replace (/,/g, ''));
    
    if ((/^\d+$/.test (cleanStr)) || (/^\d+.\d+$/.test (cleanStr)))
            return cleanStr;
    
    return '';
    
}


function stripLeadingZero (numStr1: string): string {
    
    if (numStr1 === '') return numStr1;
    if (numStr1.slice (0, 1) !== '0') return numStr1;
    return stripLeadingZero (numStr1.slice (1));
    
}


function arrToCSV (arr: string[][]): string {
    
    return arr.reduce (function (accum: string, nextItem: string[]): string {
        
        return accum + nextItem.join ('\t') + '\r\n';
        
    }, '');
}


/*
 * Borrowed/adatped/stolen from https://developer.mozilla.org/en-US/docs/
 * Web/JavaScript/Reference/Global_Objects/Number/isInteger
 */
function isInteger (value: number): boolean {
    
    return ((typeof value === "number") && 
            (isFinite (value)) && 
            (Math.floor (value) === value));
};


/*
 * If passed a number, this returns an array of blank strings with a length
 * equal to the arguement.  On all other parameters it throws an error.
 */
function getBlankArray (_arrSize: number): string[] {
    
    if ((typeof _arrSize !== 'number') ||
            (_arrSize === Infinity) ||
            (_arrSize !== _arrSize))
        throw new Error (
                'Invalid parameter passed to getBlankArray() function');
    
    const arrSize: number = Math.round (_arrSize);
    const arr: any[] = Array (arrSize);
    let i: number = 0;
    
    for (; i < arrSize;) arr [i++] = '';
    
    return arr;
    
}


/*
 * If passed a number, this returns an array of numbers with a length
 * equal to the argument with the first element equalling zero and the rest
 * incrementing from there.  On all other parameters it throws an error.
 */
function getSequentialArray (arrSize: number, _step?: number): number[] {
    
    if ((typeof arrSize !== 'number') ||
            (arrSize === Infinity) ||
            (arrSize !== arrSize) ||
            (typeof _step !== 'number') ||
            (_step === Infinity) ||
            (_step !== _step))
        throw new Error (
                'Invalid paramater to getSequentialArray() function');
    
    const step: number = (_step === void 0) ?
        1 :
        _step;
    
    return getBlankArray (arrSize)
        .map (function (_: string, index: number) {
            
            return index * step;
            
        });
}


const isNothing: (x: any) => boolean = x => (
    
    ((typeof x === 'undefined') || (x === null))
    
);



export {
    
    getNow,
    expandStr,
    trimNumStr,
    strToNumstr,
    getBetween,
    cleanNumStr,
    stripLeadingZero,
    arrToCSV,
    getBlankArray,
    getSequentialArray,
    isNothing
    
};
