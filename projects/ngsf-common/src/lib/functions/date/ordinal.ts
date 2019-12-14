export function ordinal(value: number | string): string {
  if (typeof value === 'number') {
    value = value + ''
  }
  const last = value.slice(-1)
  const nextToLast = value.slice(-2, 1)
  return (nextToLast !== '1' && {1: 'st', 2: 'nd', 3: 'rd'}[last]) || 'th'
}
