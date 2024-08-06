export function firstName (name: string) {
  return name.split(' ')[0]
}

export function firstAndLastName (name: string) {
  let split = name.split(' ')

  if (split.length > 0) {
    return split.at(0) + ' ' + split.at(-1)
  }

  return split.at(0)
}
