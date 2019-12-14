import {copy, forEach, hasOwn} from '../utility'
import {isArray, isDefined, isObject} from '../validator'

/**
 * 'mapLayout' function
 *
 * Creates a new layout by running each element in an existing layout through
 * an iteratee. Recursively maps within array elements 'items' and 'tabs'.
 * The iteratee is invoked with four arguments: (value, index, layout, path)
 *
 * The returned layout may be longer (or shorter) then the source layout.
 *
 * If an item from the source layout returns multiple items (as '*' usually will),
 * this function will keep all returned items in-line with the surrounding items.
 *
 * If an item from the source layout causes an error and returns null, it is
 * skipped without error, and the function will still return all non-null items.
 *
 * @param layout - the layout to map
 * @param fn - the function to invoke on each element
 * @param layoutPointer - the layoutPointer to layout, inside rootLayout
 * @param rootLayout - the root layout, which contains layout
 */
export function mapLayout(
  layout: any[],
  fn: (v: any, i?: number, l?: any, p?: string) => any,
  layoutPointer: string|string[] = '',
  rootLayout: any = layout
): any[] {
  let indexPad = 0
  let newLayout: any[] = []
  forEach(layout, (item, index) => {
    const realIndex = +index + indexPad
    const newLayoutPointer = layoutPointer + '/' + realIndex
    let newNode: any = copy(item)
    let itemsArray: any[] = []
    if (isObject(item)) {
      if (hasOwn(item, 'tabs')) {
        item.items = item.tabs
        delete item.tabs
      }
      if (hasOwn(item, 'items')) {
        itemsArray = isArray(item.items) ? item.items : [item.items]
      }
    }
    if (itemsArray.length) {
      newNode.items = mapLayout(itemsArray, fn, newLayoutPointer + '/items', rootLayout)
    }
    newNode = fn(newNode, realIndex, newLayoutPointer, rootLayout)
    if (!isDefined(newNode)) {
      indexPad--
    } else {
      if (isArray(newNode)) {
        indexPad += newNode.length - 1
      }
      newLayout = newLayout.concat(newNode)
    }
  })
  return newLayout
}
