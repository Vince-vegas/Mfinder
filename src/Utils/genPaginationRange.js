const genPaginationRange = (currentPage, totalPage, totalVisiblePage) => {
  let start = currentPage - (totalVisiblePage - 1);
  
  if(start < 2) {
    start = 2;
  }

  let end = start + (totalVisiblePage - 1);

  if(currentPage >= totalPage) {
    end = totalPage - 1;
    start = (end - totalVisiblePage) + 1;
  }

  return {
    start,
    end
  }
}

export { genPaginationRange }