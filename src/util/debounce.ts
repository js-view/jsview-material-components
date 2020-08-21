export const debounce = (func: Function, delay = 300) => {
  let inDebounce: any;
  return (...args: any) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  };
};
