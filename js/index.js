// const {
//   searchStraightLineInclude,
//   searchSnakingInclude,
// } = require('./wordSearch');

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
  for (let l = 0; l < letters.length - 1; l += 1) {
    const curLetter = letters[l];
    const nextLetter = letters[l + 1];
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

const container = document.querySelector('.container');

// render the puzzle
const puzzle = [
  ['a', 'k', 'f', 'o', 'x', 'e', 's'],
  ['s', 'o', 'a', 'w', 'a', 'h', 'p'],
  ['i', 't', 'c', 'k', 'e', 't', 'n'],
  ['o', 't', 's', 'd', 'h', 'o', 'h'],
  ['s', 'e', 'x', 'g', 's', 't', 'a'],
  ['u', 'r', 'p', 'i', 'w', 'e', 'u'],
  ['z', 's', 'b', 'n', 'u', 'i', 'r'],
];

const puzzleDiv = document.createElement('div');
puzzleDiv.className = 'puzzle';

for (let i = 0; i < puzzle.length; i += 1) {
  const puzzleRow = document.createElement('div');
  puzzleRow.className = 'puzzle__row';
  for (let j = 0; j < puzzle[0].length; j += 1) {
    const puzzleLetter = document.createElement('div');
    puzzleLetter.className = 'puzzle__letter';
    puzzleLetter.innerText = puzzle[i][j];
    puzzleRow.append(puzzleLetter);
  }
  puzzleDiv.append(puzzleRow);
}

container.append(puzzleDiv);

// read the word
const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('input');
  const word = input.value;
  if (word) {
    console.log(word);
    console.log(searchSnakingInclude(word, puzzle));
    if (searchSnakingInclude(word, puzzle)) {
      container.classList.add('active');
      container.classList.remove('red');

      setTimeout(() => container.classList.remove('active'), 3000);
    } else {
      container.classList.add('red');
      container.classList.remove('active');

      setTimeout(() => container.classList.remove('red'), 3000);
    }
  }
});
