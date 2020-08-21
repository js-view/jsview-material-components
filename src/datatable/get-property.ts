/**
 * A function to take a string written in dot notation style, and use it to
 * find a nested object property inside of an object.
 *
 * Useful in a plugin or module that accepts a JSON array of objects, but
 * you want to let the user specify where to find various bits of data
 * inside of each custom object instead of forcing a standardized
 * property list.
 *
 * @param String nested A dot notation style parameter reference (ie "urls.small")
 * @param Object object (optional) The object to search
 *
 * @return the value of the property in question
 */

function getProperty(propertyName: string, object: any) {
  const parts = propertyName.split('.');
  const { length } = parts;
  let i;
  let property = object;

  for (i = 0; i < length; i += 1) {
    property = property?.[parts[i]];
  }

  return property;
}

export default getProperty;
