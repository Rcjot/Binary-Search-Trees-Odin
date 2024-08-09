import { mergeSort } from "./mergeSort.js";
import { HashSet } from "./hashSet.js";

function Node(value, left, right) {
    return {
        left,
        value,
        right,
    }
}

function Tree(array){
    const myHash = HashSet();

    const myArray = myHash.sortPurify(array);
    console.log(myArray);
    const node = buildTree(myArray);
    return node;
}



function buildTree(arr){
    const myNode = Node()
    const midIndex = Math.floor(arr.length / 2);
    if (midIndex >= arr.length) {
        myNode.left = null;
        myNode.right = null;
        myNode.value = (arr.length === 0) ? null : arr[0];
        return myNode
    };
    const leftArr = arr.slice(0, midIndex);
    const rightArr = arr.slice(midIndex + 1, arr.length);
    myNode.value = arr[midIndex];

    myNode.left = (midIndex <= 0) ? null : buildTree(leftArr);
    myNode.right = (midIndex >= arr.length - 1) ? null : buildTree(rightArr);

    return myNode;

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 

const myNode = mergeSort([0,3,2,1,1,2,3,4]);
const myTree = Tree(myNode);
prettyPrint(myTree);
console.log(myTree);
