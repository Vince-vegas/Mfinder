const genPaginationArray = (start, numLength) => {
  let arr = [];
  for (let i = start; i <= numLength; i++) {
    arr.push(i);
  }

  return arr;
};

export { genPaginationArray };
