class Node {
  constructor(coord) {
    this.position = coord;
    this.moves = [
      [coord[0]+1, coord[1]+2], [coord[0]+2, coord[1]+1], [coord[0]+2, coord[1]-1], [coord[0]+1, coord[1]-2], 
      [coord[0]-1, coord[1]-2], [coord[0]-2, coord[1]-1], [coord[0]-2, coord[1]+1], [coord[0]-1, coord[1]+2]
    ];
    this.visited = false;
    this.parent = null;
  }
}

function knightMoves(start, end) {
  if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7 || end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
    console.log('Invalid Input Coordinates')
    return null
  }
  
  const root = new Node(start);
  const path = [];
  const queue = [root];

  function isValid(coordinates) {
    return coordinates[0] >= 0 && coordinates[0] <= 7 && coordinates[1] >= 0 && coordinates[1] <= 7;
  }

  function backtrace(currNode) {
    if (currNode.parent === null) {
      path.push(currNode.position)
      return null
    }
    path.push(currNode.position);
    backtrace(currNode.parent);
  }

  function recursive(arr) {
    const currNode = arr.shift()
    if (!isValid(currNode.position) || currNode.visited) {
      // Do nothing
    } else if (JSON.stringify(currNode.position) === JSON.stringify(end)) {
      return backtrace(currNode)
    } else {
      currNode.visited = true
      for (let i = 0; i < currNode.moves.length; i++) {
        const nextNode = new Node(currNode.moves[i])
        nextNode.parent = currNode
        arr.push(nextNode)
      }
    }
    return recursive(arr)
  }

  recursive(queue)
  path.reverse()
  console.log(`=> You made it in ${path.length - 1} moves! Here is your path:`)
  path.forEach((position) => console.log(position))
  return path
}

// Driver code
const start = [3, 3];
const end = [7, 7];
knightMoves(start, end);