import { Tree } from "./BinarySearchTree.js";
import { prettyPrint } from "./prettyPrint.js";

const rngArr = [];
const levelOrder = [];
const preOrder = [];
const postOrder = [];
const inOrder = [];
function levelOrderCallback(node) {
  levelOrder.push(node.value);
}
function preOrderCallback(node) {
  preOrder.push(node.value);
}
function postOrderCallback(node) {
  postOrder.push(node.value);
}
function inOrderCallback(node) {
  inOrder.push(node.value);
}

for (let i = 0; i < 100; i++) {
  rngArr.push(Math.floor(Math.random() * 101));
}

const rngTree = Tree(rngArr);
prettyPrint(rngTree.node);
rngTree.isBalanced();
for (let i = 0; i < 10; i++) {
  rngTree.insert(Math.floor(100 + Math.random() * 101));
}
prettyPrint(rngTree.node);
rngTree.isBalanced();
rngTree.rebalance();
rngTree.isBalanced();
prettyPrint(rngTree.node);
rngTree.levelOrder(levelOrderCallback);
rngTree.preOrder(preOrderCallback);
rngTree.postOrder(postOrderCallback);
rngTree.inOrder(inOrderCallback);
console.log("levelOrder:");
console.log(levelOrder);
console.log("preOrder:");
console.log(preOrder);
console.log("postOrder:");
console.log(postOrder);
console.log("inOrder:");
console.log(inOrder);
