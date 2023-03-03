const validateUserTagline = (input) => {
    // regular expression to match user#tagline pattern
    const pattern = /^[a-zA-Z0-9\s]{3,16}#[a-zA-Z0-9]{1,5}$/;
    return pattern.test(input);
  };
  
  module.exports = { validateUserTagline };