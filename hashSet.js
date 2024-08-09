export function HashSet() {
    let bucketLength = 16;
    const bucketArray = Array(bucketLength).fill(null).map(()=> []);

    function hash(key) {
        const primeNumber = 31;
        const hashCode = primeNumber * key;
        return hashCode;
    } 

    function set(key) {
        const hashNum = hash(key);
        const index = hashNum % bucketLength;
        bucketArray[index].push(key);
    }

    function has(key) {
        const hashNum = hash(key);
        const index = hashNum % bucketLength;
        for (let i of bucketArray[index]){
            if (i === key) return true;
        }
        return false;
    }

    function sortPurify(array){
        const myHash = HashSet();
        const purifiedArray = [];
    
        for (let i of array) {
            if (!myHash.has(i)) {
                myHash.set(i);
                purifiedArray.push(i);
            }
        }
        return purifiedArray;
    }


    return {
        set,
        has,
        sortPurify,

    }
}

