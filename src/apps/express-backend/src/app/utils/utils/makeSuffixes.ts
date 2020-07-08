export function makeSuffixes(values) {
    const results = [];
    values.sort().reverse().forEach(function(val) {
        let tmp, hasSuffix;
        for (let i=0; i<val.length-2; i++) {
            tmp = val.substr(i).toUpperCase();
            hasSuffix = false;
            for (let j=0; j<results.length; j++) {
                if (results[j].indexOf(tmp) === 0) {
                    hasSuffix = true;
                    break;
                }
            }
            if (!hasSuffix) results.push(tmp);
        }
    });
    return results;
}