
export function makeAutocomplete (object: any, key: string = 'id', value: string = 'name') {
  return object.map(obj => ({
    value: obj[key],
    title: obj[value]
  }))
}
