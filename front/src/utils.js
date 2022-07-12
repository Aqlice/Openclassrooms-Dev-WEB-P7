
export function emailValidation(data) {
  const regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (
    data.match(regex)
  ) {
     console.log("Email valide");
    return true;
  } else {
    console.log("email invalide");
    return false;
  }
}

export function nameValidation(data){
  var nameRegex = /^[a-zA-Z-]+$/;
  if (
    data.match(nameRegex)
  ) {
     console.log("nom valide");
    return true;
  } else {
    console.log("nom invalide");
    return false;
  }

}

export function firstNameValidation(data){
  var firstNameRegex = /^[a-zA-Z-]+$/;
  if (
    data.match(firstNameRegex)
  ) {
     console.log("firstnom valide");
    return true;
  } else {
    console.log("firstnom invalide");
    return false;
  }

}