console.log("Crimson ;: ");
var data = [1,2,[3,4,[6,7],8,9],11,12,[12,13]];
console.log("data ;: ", data.flat(3));

const flatArray = (arr, result=[]) => {    
    arr.forEach((ar) => {
        if (Array.isArray(ar)) {
            flatArray(ar, result);
        } else {
            result.push(ar);
        }
    });
    return result;
}

let flatArrayResult = flatArray(data);

console.log("flatArrayResult :: ", result, flatArrayResult);







