const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === "object") {
    return Object.keys(value).length === 0 && value.constructor === Object;
  } else if (typeof value === "string") {
    return value.trim().length === 0;
  } else if (typeof value === "number") {
    return value <= 0;
  } else if (!value) {
    return true;
  }

  return false;
};

export { isEmpty };
