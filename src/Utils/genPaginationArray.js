// create an array of pagination items
// [1, 2, 3, 4, 5]

const genPaginationArray = (numLength) => {
  let arr = [];
  for (let i = 1; i <= numLength; i++) {
    arr.push(i);
  }

  return arr;
};

export { genPaginationArray };
