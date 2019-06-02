
export default function getObjectKeysFromArrayOfObjects(array) {
  return Object.keys(array.reduce(function(result, obj) {
    return Object.assign(result, obj);
  }, {}))
}