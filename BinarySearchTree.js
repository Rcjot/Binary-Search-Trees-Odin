import { mergeSort } from "./mergeSort.js";
import { HashSet } from "./hashSet.js";
import { prettyPrint } from "./prettyPrint.js";
function Node(value, left = null, right = null) {
  return {
    left,
    value,
    right,
  };
}

function Tree(array) {
  const myHash = HashSet();

  const myArray = myHash.sortPurify(array);
  console.log(myArray);
  const node = buildTree(myArray);

  function buildTree(arr) {
    const myNode = Node();
    const midIndex = Math.floor(arr.length / 2);
    if (midIndex >= arr.length) {
      myNode.left = null;
      myNode.right = null;
      myNode.value = arr.length === 0 ? null : arr[0];
      return myNode;
    }
    const leftArr = arr.slice(0, midIndex);
    const rightArr = arr.slice(midIndex + 1, arr.length);
    myNode.value = arr[midIndex];

    myNode.left = midIndex <= 0 ? null : buildTree(leftArr);
    myNode.right = midIndex >= arr.length - 1 ? null : buildTree(rightArr);

    return myNode;
  }

  function insert(value) {
    let currentNode = node;
    let parent = null;
    while (currentNode != null) {
      parent = currentNode;
      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        return;
      }
    }
    const newNode = Node(value);
    if (parent === null) {
      node = newNode;
    } else if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  function deleteItem(value = null) {
    if (value === null) return;
    let currentNode = node;
    let parent = null;
    while (currentNode.value !== value) {
      parent = currentNode;
      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        break;
      }
    }

    if (currentNode.left === null || currentNode.right === null) {
      if (currentNode.value > parent.value) {
        parent.right = currentNode.left === null ? null : currentNode.left;
      } else {
        parent.left = currentNode.left === null ? null : currentNode.left;
      }
    } else {
      let oneStepRight = currentNode.right;
      let deepestLeft = oneStepRight;
      while (deepestLeft.left != null) {
        deepestLeft = deepestLeft.left;
      }
      const temp = deepestLeft.value;
      deleteItem(deepestLeft.value);
      currentNode.value = temp;
    }
  }

  function find(value) {
    if (value === null) return;
    let currentNode = node;
    let parent = null;
    while (currentNode.value !== value) {
      parent = currentNode;
      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        break;
      }
    }

    return currentNode;
  }

  function levelOrder(callback, queue = [node], traverse = [node.value]) {
    if (typeof callback !== "function") {
      console.log("call back is not a function!");
      return;
    }
    if (queue.length === 0) return;

    const dequeued = queue[0];
    queue.shift();

    callback(dequeued);

    if (dequeued.left !== null) {
      const left = dequeued.left;
      queue.push(left);
      traverse.push(left.value);
    }
    if (dequeued.right !== null) {
      const right = dequeued.right;
      queue.push(right);
      traverse.push(right.value);
    }

    levelOrder(callback, queue, traverse);
    // console.log(traverse);
    /**
     * enqueue currentNode;
     * dequeue item
     * enqueue left and right of item.
     */
  }

  function inOrder(callback, currentNode = node, traverse = []) {
    if (typeof callback !== "function") return;
    if (currentNode === null) return;

    inOrder(callback, currentNode.left, traverse);
    callback(currentNode);
    traverse.push(currentNode.value);
    inOrder(callback, currentNode.right, traverse);
    // console.log(traverse);
  }

  function preOrder(callback, currentNode = node, traverse = []) {
    if (typeof callback !== "function") return;
    if (currentNode === null) return;

    callback(currentNode);
    traverse.push(currentNode.value);
    preOrder(callback, currentNode.left, traverse);
    preOrder(callback, currentNode.right, traverse);
    // console.log(traverse);
  }

  function postOrder(callback, currentNode = node, traverse = []) {
    if (typeof callback !== "function") return;
    if (currentNode === null) return;

    postOrder(callback, currentNode.left, traverse);
    postOrder(callback, currentNode.right, traverse);
    callback(currentNode);
    traverse.push(currentNode.value);
    console.log(traverse);
  }

  function height(value = node.value) {
    let currentNode = node;
    let leftHeight = 0;
    let rightHeight = 0;
    while (currentNode.value != value) {
      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode.left !== null) {
      leftHeight = 1 + height(currentNode.left.value);
    } else if (currentNode.left === null) {
      leftHeight = 0;
    }
    if (currentNode.right !== null) {
      rightHeight = 1 + height(currentNode.right.value);
    } else if (currentNode.right === null) {
      rightHeight = 0;
    }
    return leftHeight >= rightHeight ? leftHeight : rightHeight;
  }

  function depth(value = node.value) {
    return height(node.value) - height(value);
  }

  function isBalanced() {
    const Diff = height(node.left.value) - height(node.right.value);
    const absDiff = Diff < 0 ? Diff * -1 : Diff;
    console.log(absDiff);
    if (absDiff <= 1) return true;

    return false;
  }

  function rebalance() {}

  return {
    node,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
}

const myNode = mergeSort([0, 3, 2, 1, 1, 2, 3, 4, 7, 8, 9, 10]);
const myTree = Tree(myNode);

myTree.insert(5);
myTree.insert(11);
prettyPrint(myTree.node);
// myTree.deleteItem(2);
// myTree.deleteItem(1);
// myTree.deleteItem(9);
// myTree.deleteItem(4);
// console.log(myTree.find(10));
// myTree.levelOrder();
prettyPrint(myTree.node);
// myTree.levelOrder(() => {
//   console.log("");
// });
console.log(myTree.height(4));
console.log(myTree.depth(5));
console.log(myTree.isBalanced());

/**
delete 30:
referenced parent : null;
referenced currentNode : 30
go to its right by one step: 40
find the deepest left : 32
assign the value of the node to delete to the deepest left: 30 -> 32
deepest left = its right node .

delete 9:
referenced parent : 4
referenced currentNode : 9
go to its right by one step : 10
find the deepest left: 10
assign value of value of deepest left to node to delete : 9 -> 10;
deepest left = its right node

delete 1:
referenced parent : 2
referenced currentNode : 1
go to its right by one step : none so 1;
get deepest left: 0
change values: 1 -> 0;
deepest left is its right node which is itself 1;
*/
