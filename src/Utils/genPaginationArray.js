// create an array of pagination item
// [1, 2, 3, 4, 5]

const genPaginationArray = (num) => {
  let arr = [];
  for (let i = 1; i <= num.length; i++) {
    arr.push(i);
  }

  return arr;
};

export { genPaginationArray };
