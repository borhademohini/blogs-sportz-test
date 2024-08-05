// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
// Obj1 = {x: 1, y: 2}

// Obj2 = {a: 3, b: 4}

// result = Object.assign(Obj1, Obj2);

arr1 = [1,0,1,1,0,0,1,1,1]

arr2 = [1,0,1,1,0,1]

arr3 = [1,1,1,1,1,1]

function findConsecutive(param) {
let arr = [];   
let tempArray = [];
for (let i=0; i<param.length; i++) {
    if (param[i] == 1 && (arr.length > 0 && arr[arr.length-1] == 1 || arr.length == 0)) {
        arr.push(1);
    } else {
        tempArray = arr;
        arr = [];
    }
}
return getMax(arr.length,tempArray.length);
}

function getMax(num1 , num2){
    return num1 > num2 ? num1 : num2;
} 

let result = findConsecutive(arr3);


arr = [10, 28, 40, 6, 51];

// let min = ;

// for (let i=0; i < arr.length; i++) {
//     if (arr[i] > min)
    
// }

sortedArray = arr.sort((a,b) =>  a - b);

console.log("result :: ", sortedArray, sortedArray[sortedArray.length - 2]);