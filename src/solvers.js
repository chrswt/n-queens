/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;

  var findNextStep = function(existingBoard, nextRow) {
    if (nextRow === n && !existingBoard.hasAnyRooksConflicts()) {
      solution = existingBoard.rows();
    } else {
      for (var i = 0; i < n; i++) {
        var permutation = [];
        while (permutation.length < n) {
          permutation.push(0);
        }
        permutation[i] = 1;
        var nextBoard = new Board(existingBoard.rows());
        if (!nextBoard.set(nextRow, permutation).hasAnyRooksConflicts()) {
          findNextStep(nextBoard, nextRow + 1);
        } else {
          return;
        }
      }
    }
  };

  var newBoard = new Board({n: n});
  findNextStep(newBoard, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

/*** SLOWER, ROBUST VERSION (runtime ~ 3s) ***/
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;

//   var findNextStep = function(existingBoard, nextRow) {
//     if (nextRow === n && !existingBoard.hasAnyRooksConflicts()) {
//       solutionCount++;
//     } else {
//       for (var i = 0; i < n; i++) {
//         if (nextRow === 0 && i > 0) {
//           return;
//         }
//         var permutation = [];
//         while (permutation.length < n) {
//           permutation.push(0);
//         }
//         permutation[i] = 1;
//         var nextBoard = new Board(existingBoard.rows());
//         if (!nextBoard.set(nextRow, permutation).hasAnyRooksConflicts()) {
//           findNextStep(nextBoard, nextRow + 1);
//         }
//       }
//     }
//   };

//   var newBoard = new Board({n: n});
//   findNextStep(newBoard, 0);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount * n);
//   return solutionCount * n;
// };

/*** MATHEMATICAL (QUICK) VERSION ***/
window.countNRooksSolutions = function(n) {
  return n === 1 ? 1 : n * countNRooksSolutions(n - 1);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  var findNextStep = function(existingBoard, nextRow) {
    if (nextRow === n && !existingBoard.hasAnyQueensConflicts()) {
      solution = existingBoard.rows();
      return;
    } else {
      for (var i = 0; i < n; i++) {
        var permutation = [];
        while (permutation.length < n) {
          permutation.push(0);
        }
        permutation[i] = 1;
        var newBoard = new Board(existingBoard.rows());
        if (!newBoard.set(nextRow, permutation).hasAnyQueensConflicts()) {
          findNextStep(newBoard, nextRow + 1);
        }
      }
    }
  };

  var newBoard = new Board({n: n});
  findNextStep(newBoard, 0);

  if (solution === undefined) {
    var emptyBoard = new Board({n: n});
    solution = emptyBoard.rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
