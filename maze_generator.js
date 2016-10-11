// Based on https://en.wikipedia.org/wiki/Maze_generation_algorithm#Python_code_example

function createMaze (rows,columns) {
  // Array M contains the maze, each cell a possible position.
  // The first four elements shows if the cell has wall in each direction
  // (left, up, right, bottom). The fifth element is to flag if the cell
  //  has been visited

  var M = emptyArray(rows,columns);
  // Set starting row and column
  var r = 0;
  var c = 0;
  var history = [[0,0]];
  // while we have elements stacked in the history
  while (history.length>0) {
    M[r][c][4] = 1; // set as visited
    // let's check for possible next moves
    let check = [];
    if (c > 0 && M[r][c-1][4]===0) check.push('L'); // left available
    if (r > 0 && M[r-1][c][4]===0) check.push('U'); // up available
    if (c < columns-1 && M[r][c+1][4]===0) check.push('R'); // right available
    if (r < rows-1 && M[r+1][c][4]===0) check.push('D'); // down available
    if (check.length>0) {
      history.push([r,c]);
      var index = Math.floor(check.length*Math.random());
      let move_direction = check[index];
      if (move_direction === 'L') {
        M[r][c][0] = 1; // No wall on left side to move there
        c--;  // move to the left cell
        M[r][c][2] = 1; // No wall on right side to be able to home here
      }
      if (move_direction === 'U') {
        M[r][c][1] = 1; // No wall on up side to move there
        r--;  // move up
        M[r][c][3] = 1; // No wall on bottom side to be able to home here
      }
      if (move_direction === 'R') {
        M[r][c][2] = 1;
        c++;
        M[r][c][0] = 1;
      }
      if (move_direction === 'D') {
        M[r][c][3] = 1;
        r++;
        M[r][c][1] = 1;
      }
    } else {
      // nowhere to move, move to the next element in the history stack
      var poppedEl = history.pop();
      r = poppedEl[0];
      c = poppedEl[1];
    }
  }

  // Open entry and exist
  M[0][0][0] = 1;
  M[rows-1][columns-1][2] = 1;

  return renderMaze(M);
};

function emptyArray(row,col) {
  var output = [];
  for (var i = 0; i < row; i++) {
    var temp =[];
    for (var j = 0; j < col; j++) {
      temp.push([0,0,0,0,0]); // [left,up,right,down,visited]
    }
    output.push(temp);
  }
  return output;
}

function renderMaze(maze) {
  // creates an empty maze
  var render = [];
  for (let i = 0; i < 2*maze.length+1; i++) {
    let temp =[];
    for (let j = 0; j < 2*maze[0].length+1; j++) {
      if (i%2===1 && j%2===1) temp.push('   ');
      else temp.push(' * ');
    }
    render.push(temp);
  }
  // breaks the right walls
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[0].length; j++) {
      if (maze[i][j][0] ===1) render[2*i+1][2*j] = '   ';
      if (maze[i][j][1] ===1) render[2*i][2*j+1] = '   ';
      if (maze[i][j][2] ===1) render[2*i+1][2*j+2] = '   ';
      if (maze[i][j][3] ===1) render[2*i+2][2*j+1] = '   ';
    }
  }
  // puts the maze in a string
  let strOutput = '';
  for (let i = 0; i < render.length; i++) {
    strOutput += render[i].join('')+'\n';
  }
  return strOutput;
}

// console.log(createMaze(10,40));
