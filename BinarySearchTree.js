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

export function Tree(array) {
  const myHash = HashSet();

  const myArray = mergeSort(myHash.sortPurify(array));
  // console.log(myArray);
  let node = buildTree(myArray);

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
    // console.log("a" + currentNode.value);
    // console.log(parent.value);
    if (currentNode.left === null || currentNode.right === null) {
      if (currentNode.value > parent.value) {
        parent.right = currentNode.right === null ? null : currentNode.right;
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
    // if (myArray.includes(value) === false) {
    //   console.log("no such value");
    //   return;
    // }
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
    // console.log(traverse);
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

  function depth(value = node.value, currentNode = node) {
    console.log(currentNode.value);
    let depthValue = 0;
    // console.log("b" + value);
    if (currentNode.value > value) {
      currentNode = currentNode.left;
    } else if (currentNode.value < value) {
      currentNode = currentNode.right;
    } else {
      console.log("equal?");
      return 0;
    }

    // console.log("a" + currentNode.value);
    return (depthValue = depth(value, currentNode) + 1);
  }

  function isBalanced() {
    const balancedArr = [];

    function callback(node) {
      const left = node.left === null ? 0 : 1 + height(node.left.value);
      const right = node.right === null ? 0 : 1 + height(node.right.value);
      const Diff = left - right;
      const absDiff = Diff < 0 ? Diff * -1 : Diff;
      // console.log(
      //   `node value: ${node.value}, left: ${left}, right: ${right}, Diff: ${Diff}, absDiff: ${absDiff} `
      // );

      if (absDiff <= 1) {
        balancedArr.push(true);
      } else {
        balancedArr.push(false);
      }
    }
    levelOrder(callback);
    if (balancedArr.includes(false)) return false;

    return true;

    // console.log(absDiff);

    // return false;
  }

  function rebalance() {
    const rebalanceArr = [];
    function callback(node) {
      rebalanceArr.push(node.value);
    }
    inOrder(callback);
    this.node = buildTree(rebalanceArr);
    prettyPrint(this.node);
  }

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
    rebalance,
  };
}

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
