exports.lettersAndSpaceCheck = (data) => {
    if (/^[A-zÀ-ú\s]+$/.test(data)) {
      // console.log(`${data} : true`)
      return true;
    } else {
      // console.log(`${data} : false`)
      return false;
    }
  };


  exports.lettersAndNumbersCheck = (data) => {
    if (/^[A-zÀ-ú0-9.@\s]+$/.test(data)) {
      // console.log(`${data} : true`)
      return true;
    } else {
      // console.log(`${data} : false`)
      return false;
    }
  };

exports.emailValidation = (data) => {
  if (
    data.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  ) {
    
    return true;
  } else {
    return false;
  }
};