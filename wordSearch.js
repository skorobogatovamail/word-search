let puzzle = [
  ['a', 'k', 'f', 'o', 'x', 'e', 's'],
  ['s', 'o', 'a', 'w', 'a', 'h', 'p'],
  ['i', 't', 'c', 'k', 'e', 't', 'n'],
  ['o', 't', 's', 'd', 'h', 'o', 'h'],
  ['s', 'e', 'x', 'g', 's', 't', 'a'],
  ['u', 'r', 'p', 'i', 'w', 'e', 'u'],
  ['z', 's', 'b', 'n', 'u', 'i', 'r'],
];

function searchStraightLineInclude(word, puzzle) {
  // search in usual array and in transposed array
  // 1 concatenate all elements in row / column
  // test regular expression with given word in concatenated string

  function testWord(arr) {
    const words = arr.map((el) => el.join(''));
    const wordsReverse = arr.map((el) => el.reverse().join(''));

    const regex = new RegExp(word);
    const bools = words.map((el) => regex.test(el));
    const boolsReverse = wordsReverse.map((el) => regex.test(el));
    return bools.some((e) => e === true) || boolsReverse.some((e) => e);
  }

  // transpose matrix
  function transposeMatrix(matrix) {
    const nRows = matrix.length;
    const nCols = matrix[0].length;
    const matrixTransposed = [...Array(nCols)].map((e) => Array(nRows));
    for (let i = 0; i < nRows; i += 1) {
      for (let j = 0; j < nCols; j += 1) {
        matrixTransposed[j][i] = matrix[i][j];
      }
    }
    return matrixTransposed;
  }

  // diagonal traverse
  function getDiagonals(matrix) {
    const nRows = matrix.length;
    const nCols = matrix[0].length;

    const diagonals = [];
    for (
      let diagonalLineNum = 1;
      diagonalLineNum < nRows + nCols;
      diagonalLineNum += 1
    ) {
      // Get column index of the first element
      // in this line of output. The index is 0
      // for first ROW lines and line - ROW for
      // remaining lines
      const startCol = Math.max(0, diagonalLineNum - nRows);

      // Get count of elements in this line.
      // The count of elements is equal to
      // minimum of line number, COL-start_col and ROW
      const numObjectsInDiagonal = Math.min(
        diagonalLineNum,
        nCols - startCol,
        nRows,
      );

      // print elements of diagonal
      const diagonalElements = [];
      for (let i = 0; i < numObjectsInDiagonal; i += 1) {
        const element =
          matrix[Math.min(nRows, diagonalLineNum) - i - 1][startCol + i];
        diagonalElements.push(element);
      }
      diagonals.push(diagonalElements);
    }

    return diagonals;
  }

  const puzzleTransposed = transposeMatrix(puzzle);
  const puzzleDiagonal = getDiagonals(puzzle);
  //   console.log(puzzleDiagonal);

  return (
    testWord(puzzle) || testWord(puzzleTransposed) || testWord(puzzleDiagonal)
  );
}

// console.log(searchStraightLineInclude('foxes', puzzle));
// console.log(searchStraightLineInclude('otters', puzzle));
// console.log(searchStraightLineInclude('bison', puzzle));
// console.log(searchStraightLineInclude('cat', puzzle));

function searchSnakingInclude(word, puzzle) {
  // get all indexes of element in matrix
  // console.log(getAllIndexes('f', puzzle));
  function getAllIndexes(letter, matrix) {
    const letterIndexes = [];
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[0].length; j += 1) {
        if (matrix[i][j] === letter) {
          letterIndexes.push([i, j]);
        }
      }
    }
    return letterIndexes;
  }
  function compareIndexes(coords1, coords2) {
    const row1 = coords1[0];
    const col1 = coords1[1];

    const row2 = coords2[0];
    const col2 = coords2[1];
    if (Math.abs(row1 - row2) < 2 && Math.abs(col1 - col2) < 2) {
      return true;
    }
    return false;
  }

  // 1 collect indexes (coordinates) of all letters
  //   {
  //     f: [ [ 0, 2 ] ],
  //     o: [ [ 0, 3 ], [ 1, 1 ], [ 3, 0 ], [ 3, 5 ] ],
  //     x: [ [ 0, 4 ], [ 4, 2 ] ]
  //   }
  const letters = word.split('');
  const coordinates = {};
  for (let i = 0; i < letters.length; i += 1) {
    coordinates[letters[i]] = getAllIndexes(letters[i], puzzle);
  }

  // 2 for every letter calculate distance to next letter
  // row1 - row2 < 2 && col1 - col2
  // return coordinates;
  for (let i = 0; i < letters.length - 1; i += 1) {
    const curLetter = letters[i];
    const nextLetter = letters[i + 1];
    const curLetterIdxs = coordinates[curLetter];
    const nextLetterIdxs = coordinates[nextLetter];

    const comparisons = [];
    for (let i = 0; i < curLetterIdxs.length; i += 1) {
      for (let j = 0; j < nextLetterIdxs.length; j += 1) {
        comparisons.push(compareIndexes(curLetterIdxs[i], nextLetterIdxs[j]));
      }
    }
    if (comparisons.every((el) => el === false)) return false;
  }
  return true;
}

console.log(searchSnakingInclude('akotters', puzzle)); // true
console.log(searchSnakingInclude('weirua', puzzle)); // true
console.log(searchSnakingInclude('afx', puzzle)); // false
console.log(searchSnakingInclude('ophp', puzzle)); // false
