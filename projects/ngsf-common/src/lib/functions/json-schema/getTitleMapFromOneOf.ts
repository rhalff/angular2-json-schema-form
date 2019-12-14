import {isArray} from '../validator'
import {hasOwn} from '../utility'

/**
 * 'getTitleMapFromOneOf' function
 */
export function getTitleMapFromOneOf(
  schema: any = {},
  flatList: boolean = null,
  validateOnly = false
) {
  let titleMap = null
  const oneOf = schema.oneOf || schema.anyOf || null
  if (isArray(oneOf) && oneOf.every(item => item.title)) {
    if (oneOf.every(item => isArray(item.enum) && item.enum.length === 1)) {
      if (validateOnly) {
        return true
      }
      titleMap = oneOf.map(item => ({name: item.title, value: item.enum[0]}))
    } else if (oneOf.every(item => item.const)) {
      if (validateOnly) {
        return true
      }
      titleMap = oneOf.map(item => ({name: item.title, value: item.const}))
    }

    // if flatList !== false and some items have colons, make grouped map
    if (flatList !== false && (titleMap || [])
      .filter(title => ((title || {}).name || '').indexOf(': ')).length > 1
    ) {

      // Split name on first colon to create grouped map (name -> group: name)
      const newTitleMap = titleMap.map(title => {
        const [group, name] = title.name.split(/: (.+)/)
        return group && name ? {...title, group, name} : title
      })

      // If flatList === true or at least one group has multiple items, use grouped map
      if (flatList === true || newTitleMap.some((title, index) => index &&
        hasOwn(title, 'group') && title.group === newTitleMap[index - 1].group
      )) {
        titleMap = newTitleMap
      }
    }
  }
  return validateOnly ? false : titleMap
}
