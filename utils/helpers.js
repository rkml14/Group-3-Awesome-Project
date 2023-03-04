const validateUserTagline = (input) => {
    // regular expression to match user#tagline pattern
    const pattern = /^[a-zA-Z0-9\s]{3,16}#[a-zA-Z0-9]{1,5}$/;
    return pattern.test(input);
  };

// pagination helper function
const paginate = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginationInfo = {
    currentPage: page,
    totalPages: totalPages,
    hasPreviousPage: page > 1,
    previousPage: page > 1 ? page - 1 : null,
    hasNextPage: page < totalPages,
    nextPage: page < totalPages ? page + 1 : null,
  };
  return { data: paginatedData, paginationInfo };
};
  
  module.exports = { validateUserTagline, paginate };