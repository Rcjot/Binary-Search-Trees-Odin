export function mergeSort(arr) {
    if (arr.length === 1){
        return arr;
    }else{
        let midIndex = Math.ceil(arr.length/2)
        let leftArr = mergeSort(arr.slice(0, midIndex));
        let rightArr = mergeSort(arr.slice(midIndex, arr.length));

        let mergedArr = [];
        let l = 0;
        let r = 0;
        for (let i = 0; i< arr.length - 1; i++){
            if (leftArr[l] > rightArr[r]){
                mergedArr.push(rightArr[r]);
                r++;
            }else if (leftArr[l] < rightArr[r]){
                mergedArr.push(leftArr[l]);
                l++;
            }else if (leftArr[l] === rightArr[r]){
                mergedArr.push(rightArr[r]);
                r++;
            }   
            if (l >= leftArr.length){
                mergedArr.push(rightArr[r]);
                r++;                
            }else if (r >= rightArr.length) {
                mergedArr.push(leftArr[l]);
                l++;
            }
        }

        return mergedArr;
    }
};