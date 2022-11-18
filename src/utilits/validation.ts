export const validateRequire = (imputValue: any, inputRef: any) => {
  let result;
  if(!imputValue) {
    inputRef.current.classList.add(`warning`);
    result = false;
  } else {
    inputRef.current.classList.remove(`warning`);
    result = true
  }
  return result
}