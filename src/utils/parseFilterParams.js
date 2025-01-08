// const parseStringOrNumber = (value, type) => {
//   const parsedValue = typeof value === 'string' ? value.trim() : undefined;
//   if (!parsedValue) return;

//   if (type === 'number') {
//     const parsedNumber = parseInt(parsedValue, 10);
//     if (Number.isNaN(parsedNumber)) {
//       return;
//     }
//     return parsedNumber;
//   }

//   if (type === 'string') {
//     return parsedValue;
//   }

//   return undefined;
// };

// const parseBoolean = (value) => {
//   if (typeof value === 'string') {
//     const lowerValue = value.toLowerCase();
//     if (lowerValue === 'true') return true;
//     if (lowerValue === 'false') return false;
//   }
//   return typeof value === 'boolean' ? value : undefined;
// };

// const parseContactType = (type) => {
//   const validTypes = ['work', 'home', 'personal'];
//   return validTypes.includes(type) ? type : undefined;
// };

// export const parseContactFilterParams = (query) => {
//   const { isFavourite, contactType, name } = query;

//   const parsedName = parseStringOrNumber(name);
//   const parsedIsFavourite = parseBoolean(isFavourite);
//   const parsedContactType = parseContactType(contactType);

//   return {
//     name: parsedName,
//     isFavourite: parsedIsFavourite,
//     contactType: parsedContactType,
//   };
// };

const parseStringOrNumber = (value, type) => {
  const parsedValue = typeof value === 'string' ? value.trim() : undefined;
  if (!parsedValue) return;

  if (type === 'number') {
    const parsedNumber = parseInt(parsedValue, 10);
    if (Number.isNaN(parsedNumber)) {
      return;
    }
    return parsedNumber;
  }

  if (type === 'string') {
    return parsedValue;
  }

  return undefined;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') return true;
    if (lowerValue === 'false') return false;
  }
  return typeof value === 'boolean' ? value : undefined;
};

const parseContactType = (type) => {
  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(type) ? type : undefined;
};

export const parseContactFilterParams = (query) => {
  const { isFavourite, contactType, name } = query;

  const parsedName = parseStringOrNumber(name, 'string');
  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    name: parsedName,
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
