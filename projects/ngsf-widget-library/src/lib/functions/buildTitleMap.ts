import {isArray, isObject, isString, hasOwn} from '@ngsf/common'
import {TitleMapItem} from '../interfaces/title-map-item'

/**
 * 'buildTitleMap' function
 */
export function buildTitleMap(
  titleMap: any,
  enumList: any,
  fieldRequired: boolean = true,
  flatList: boolean = true
): TitleMapItem[] {
  let newTitleMap: TitleMapItem[] = []
  let hasEmptyValue = false
  if (titleMap) {
    if (isArray(titleMap)) {
      if (enumList) {
        for (const i of Object.keys(titleMap)) {
          if (isObject(titleMap[i])) { // JSON Form style
            const value = titleMap[i].value
            if (enumList.includes(value)) {
              const name = titleMap[i].name
              newTitleMap.push({name, value})
              if (value === undefined || value === null) {
                hasEmptyValue = true
              }
            }
          } else if (isString(titleMap[i])) { // React Jsonschema Form style
            if (i < enumList.length) {
              const name = titleMap[i]
              const value = enumList[i]
              newTitleMap.push({name, value})
              if (value === undefined || value === null) {
                hasEmptyValue = true
              }
            }
          }
        }
      } else { // If array titleMap and no enum list, just return the titleMap - Angular Schema Form style
        newTitleMap = titleMap
        if (!fieldRequired) {
          hasEmptyValue = !!newTitleMap
            .filter(i => i.value === undefined || i.value === null)
            .length
        }
      }
    } else if (enumList) { // Alternate JSON Form style, with enum list
      for (const i of Object.keys(enumList)) {
        const value = enumList[i]
        if (hasOwn(titleMap, value)) {
          const name = titleMap[value]
          newTitleMap.push({name, value})
          if (value === undefined || value === null) {
            hasEmptyValue = true
          }
        }
      }
    } else { // Alternate JSON Form style, without enum list
      for (const value of Object.keys(titleMap)) {
        const name = titleMap[value]
        newTitleMap.push({name, value})
        if (value === undefined || value === null) {
          hasEmptyValue = true
        }
      }
    }
  } else if (enumList) { // Build map from enum list alone
    for (const i of Object.keys(enumList)) {
      const name = enumList[i]
      const value = enumList[i]
      newTitleMap.push({name, value})
      if (value === undefined || value === null) {
        hasEmptyValue = true
      }
    }
  } else { // If no titleMap and no enum list, return default map of boolean values
    newTitleMap = [{name: 'True', value: true}, {name: 'False', value: false}]
  }

  // Does titleMap have groups?
  if (newTitleMap.some(title => hasOwn(title, 'group'))) {
    hasEmptyValue = false

    // If flatList = true, flatten items & update name to group: name
    if (flatList) {
      newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
        if (hasOwn(title, 'group')) {
          if (isArray(title.items)) {
            groupTitleMap = [
              ...groupTitleMap,
              ...title.items.map(item =>
                ({...item, ...{name: `${title.group}: ${item.name}`}})
              )
            ]
            if (title.items.some(item => item.value === undefined || item.value === null)) {
              hasEmptyValue = true
            }
          }
          if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
            title.name = `${title.group}: ${title.name}`
            delete title.group
            groupTitleMap.push(title)
            if (title.value === undefined || title.value === null) {
              hasEmptyValue = true
            }
          }
        } else {
          groupTitleMap.push(title)
          if (title.value === undefined || title.value === null) {
            hasEmptyValue = true
          }
        }
        return groupTitleMap
      }, [])

      // If flatList = false, combine items from matching groups
    } else {
      newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
        if (hasOwn(title, 'group')) {
          if (title.group !== (groupTitleMap[groupTitleMap.length - 1] || {}).group) {
            groupTitleMap.push({group: title.group, items: title.items || []})
          }
          if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
            groupTitleMap[groupTitleMap.length - 1].items
              .push({name: title.name, value: title.value})
            if (title.value === undefined || title.value === null) {
              hasEmptyValue = true
            }
          }
        } else {
          groupTitleMap.push(title)
          if (title.value === undefined || title.value === null) {
            hasEmptyValue = true
          }
        }
        return groupTitleMap
      }, [])
    }
  }
  if (!fieldRequired && !hasEmptyValue) {
    newTitleMap.unshift({name: '<em>None</em>', value: null})
  }
  return newTitleMap
}
