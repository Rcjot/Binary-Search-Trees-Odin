import { Tree } from "./BinarySearchTree.js";
import { prettyPrint } from "./prettyPrint.js";

const myNode = [0, 3, 2, 1, 1, 2, 3, 4, 7, 8, 9, 10];
const myNode2 = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10];
const myTree2 = Tree(myNode2);
const myTree = Tree(myNode);

prettyPrint(myTree.node);
myTree.insert(5);
myTree.insert(11);
prettyPrint(myTree.node);
myTree.deleteItem(2);
myTree.deleteItem(1);
myTree.deleteItem(9);
myTree.deleteItem(4);
prettyPrint(myTree.node);
console.log(myTree.find(10));
prettyPrint(myTree.node);
console.log(myTree.height(3));
console.log(myTree.height(5));
console.log(myTree.depth(5));
prettyPrint(myTree.node);
console.log(myTree.isBalanced());
myTree.rebalance();
