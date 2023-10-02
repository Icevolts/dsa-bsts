class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(this.root === null){
      this.root = new Node(val);
      return this;
    }

    let cur = this.root;
    while(true){
      if(val < cur.val){
        if(cur.left == null){
          cur.left = new Node(val);
          return this;
        }else{
          cur = cur.left;
        }
      }else if(val > cur.val){
        if(cur.right === null){
          cur.right = new Node(val);
          return this;
        }else{
          cur = cur.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, cur = this.root) {
    if(this.root === null){
      this.root = new Node(val);
      return this;
    }

    if(val < cur.val){
      if(cur.left === null){
        cur.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, cur.left);
    }else{
      if(cur.right === null){
        cur.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, cur.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let curNode = this.root;
    let found = false;

    if(val === curNode.val) return curNode;

    while(curNode && !found){
      if(val < curNode.val){
        curNode = curNode.left;
      }else if(val > curNode.val){
        curNode = curNode.right;
      }else{
        found = true;
      }
    }
    if(!found) return undefined;
    return curNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, cur = this.root) {
    if(this.root === null) return undefined;

    if(val < cur.val){
      if(cur.left === null)return undefined;
      return this.findRecursively(val, cur.left);
    }else if(val > cur.val){
      if(cur.right === null) return undefined;
      return this.findRecursively(val, cur.right);
    }
    return cur;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let cur = this.root;

    function traverse(node){
      data.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }

  traverse(cur);
  return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let cur = this.root;

    function traverse(node){
      node.left && traverse(node.left);
      data.push(node.val);
      node.right && traverse(node.right);
    }

  traverse(cur);
  return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let cur = this.root;

    function traverse(node){
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      data.push(node.val);
    }

  traverse(cur);
  return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);
    while(queue.length){
      node = queue.shift();
      data.push(node.val);
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while(nodeToRemove.val !== val){
      parent = nodeToRemove;
      if(val < nodeToRemove.val){
        nodeToRemove = nodeToRemove.left;
      }else{
        nodeToRemove = nodeToRemove.right;
      }
    }

    if(nodeToRemove !== this.root){
      if(nodeToRemove.left === null && nodeToRemove.right === null){
        if(parent.left === nodeToRemove){
          parent.left = null;
        }else{
          parent.right = null;
        }
      }else if(nodeToRemove.left !== null && nodeToRemove.right !== null){
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if(right.left === null){
          right.left = nodeToRemove.left;
          if(parent.left === nodeToRemove){
            parent.left = right;
          }else{
            parent.right = right;
          }
        }else{
          while(right.left !== null){
            rightParent = right;
            right = right.left;
          }
          if(parent.left === nodeToRemove){
            parent.left.val = right.val;
          }else{
            parent.right.val = right.val;
          }
          if(right.right !== null){
            rightParent.left = right.right;
          }else{
            rightParent.left = null;
          }
        }
      }else{
        if(parent.left === nodeToRemove){
          if(nodeToRemove.right === null){
            parent.left = nodeToRemove.left;
          }else{
            parent.left = nodeToRemove.right
          }
        }else{
          if(nodeToRemove.right === null){
            parent.right = nodeToRemove.left;
          }else{
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(cur = this.root) {
    if(cur === null) return;
    return maxDepth(cur) - minDepth(cur) <= 1;

    function minDepth(cur){
      if(cur === null) return 0;
      return 1 + Math.min(minDepth(cur.left), minDepth(cur.right));
    }

    function maxDepth(cur){
      if(cur === null) return 0;
      return 1 + Math.max(maxDepth(cur.left), maxDepth(cur.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(cur = this.root) {
    if(!this.root || (!this.root.left && !this.root.right)) return;

    while(cur){
      if(cur.left && !cur.right){
        return this.findSecondHighest(cur.left);
      }

      if(cur.right && (!cur.right.left && !cur.right.right)){
        return cur.val;
      }
      cur = cur.right;
    }
  }

  dfsInOrderIterative(){
    let cur = this.root;
    let stack = [];
    let dfs = [];
    while(stack.length > 0 || cur){
      while(cur){
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if(cur){
        dfs.push(cur.val);
        cur = cur.right;
      }
    }
    return dfs;
  }
}

module.exports = BinarySearchTree;
