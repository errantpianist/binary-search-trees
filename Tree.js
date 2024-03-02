/* eslint-disable max-classes-per-file */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = [...new Set(arr.sort((a, b) => a - b))];
    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    root.left = mid > 0 ? this.buildTree(arr.slice(0, mid)) : null;
    root.right =
      mid < arr.length - 1 ? this.buildTree(arr.slice(mid + 1)) : null;
    return root;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let cur = this.root;
    while (cur) {
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = newNode;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = newNode;
          return;
        }
        cur = cur.right;
      }
    }
  }

  deleteItem(value) {
    let cur = this.root;
    let parent = null;
    while (cur) {
      if (value < cur.value) {
        parent = cur;
        cur = cur.left;
      } else if (value > cur.value) {
        parent = cur;
        cur = cur.right;
      } else {
        if (cur.left && cur.right) {
          let temp = cur.right;
          let tempParent = cur;
          while (temp.left) {
            tempParent = temp;
            temp = temp.left;
          }
          cur.value = temp.value;
          tempParent.left = temp.right;
          return;
        }
        if (!cur.left && !cur.right) {
          if (!parent) {
            this.root = null;
          } else if (parent.left === cur) {
            parent.left = null;
          } else {
            parent.right = null;
          }
          return;
        }

        const child = cur.left || cur.right;
        if (!parent) {
          this.root = child;
        } else if (parent.left === cur) {
          parent.left = child;
        } else {
          parent.right = child;
        }
        return;
      }
    }
  }

  find(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) {
        return cur;
      }
      if (value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    return null;
  }

  levelOrder(callback = () => {}) {
    const queue = [this.root];
    while (queue.length) {
      const cur = queue.shift();
      callback(cur);

      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }
    }
  }

  inOrder(callback = () => {}) {
    const stack = [];
    let cur = this.root;
    while (cur || stack.length) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      callback(cur);
      cur = cur.right;
    }
  }

  preOrder(callback = () => {}) {
    const stack = [this.root];
    while (stack.length) {
      const cur = stack.pop();
      callback(cur);
      if (cur.right) {
        stack.push(cur.right);
      }
      if (cur.left) {
        stack.push(cur.left);
      }
    }
  }

  postOrder(callback = () => {}) {
    const stack = [this.root];
    const output = [];
    while (stack.length) {
      const cur = stack.pop();
      output.push(cur);
      if (cur.left) {
        stack.push(cur.left);
      }
      if (cur.right) {
        stack.push(cur.right);
      }
    }
    while (output.length) {
      callback(output.pop());
    }
  }

  height(node) {
    if (!node) {
      return -1;
    }
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {
    let depth = 0;
    let cur = this.root;
    while (cur) {
      if (node.value === cur.value) {
        return depth;
      }
      if (node.value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
      depth++;
    }
    return -1;
  }

  isBalanced() {
    const queue = [this.root];
    while (queue.length) {
      const cur = queue.shift();
      if (Math.abs(this.height(cur.left) - this.height(cur.right)) > 1) {
        return false;
      }
      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }
    }
    return true;
  }

  rebalance() {
    const arr = [];
    this.inOrder((node) => arr.push(node.value));
    this.root = this.buildTree(arr);
  }
}

function gen100RandomNumbers() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

// const test = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// console.log(test.root);
// console.log(test.deleteItem(5));
// console.log(test.root);
// console.log(test.find(5));
// console.log(test.find(6));
// test.levelOrder((node) => console.log('Level Order: Value is: ', node.value));
// test.inOrder((node) => console.log('In Order: Value is: ', node.value));
// test.preOrder((node) => console.log('Pre Order: Value is: ', node.value));
// test.postOrder((node) => console.log('Post Order: Value is: ', node.value));
// console.log(test.height(test.root));
// console.log(test.depth(test.find(6)));
// console.log(test.isBalanced());
// test.rebalance();
// console.log(test.root);
// console.log(test.isBalanced());
// test.levelOrder((node) => console.log('Level Order: Value is: ', node.value));
// test.inOrder((node) => console.log('In Order: Value is: ', node.value));

// const test = new Tree(gen100RandomNumbers());
// console.log('Is Balanced: ', test.isBalanced());
// test.levelOrder((node) => {
//   console.log('Level Order: Value is: ', node.value);
// });
// console.log(
//   'In Order: ',
//   test.inOrder((node) => {
//     console.log('In Order: Value is: ', node.value);
//   })
// );
// console.log(
//   'Pre Order: ',
//   test.preOrder((node) => {
//     console.log('Pre Order: Value is: ', node.value);
//   })
// );
// console.log(
//   'Post Order: ',
//   test.postOrder((node) => {
//     console.log('Post Order: Value is: ', node.value);
//   })
// );
// test.insert(101);
// test.insert(102);
// test.insert(103);
// test.insert(104);
// console.log('Is Balanced: ', test.isBalanced());
// test.rebalance();
// console.log('Is Balanced: ', test.isBalanced());
// console.log(
//   'Level Order: ',
//   test.levelOrder((node) => {
//     console.log('Level Order: Value is: ', node.value);
//   })
// );
// console.log(
//   'In Order: ',
//   test.inOrder((node) => {
//     console.log('In Order: Value is: ', node.value);
//   })
// );
// console.log(
//   'Pre Order: ',
//   test.preOrder((node) => {
//     console.log('Pre Order: Value is: ', node.value);
//   })
// );
// console.log(
//   'Post Order: ',
//   test.postOrder((node) => {
//     console.log('Post Order: Value is: ', node.value);
//   })
// );
