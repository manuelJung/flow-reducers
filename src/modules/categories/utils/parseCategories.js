export const types = {
  CONTENT: 'content',
  SUBMENU: 'submenu',
  DEFAULT: 'default'
}

export default function parseInitialNavigationData (data) {

  const subItemsDict = data
    .filter(row => row.templateOptions.dropdownType === 'submenu')
    .map(row => row.templateOptions.dropdownItems)
    .reduce((p,n) => Array.from(new Set([...p, ...n])), [])
    .reduce((p,n) => Object.assign(p, { [n.id]: n }), {})

  const rootItems = data.map(row => ({
    id: row.id,
    label: row.label,
    link: row.link,
    type: row.templateOptions.dropdownType === 'submenu'  ? types.SUBMENU
        : row.templateOptions.dropdownType === 'content' ? types.CONTENT
        : types.DEFAULT,
    dropdown: row.templateOptions.dropdownContent || '',
    subItems: (row.templateOptions.dropdownItems || []).filter(row => !row.parentId).map(row => row.link)
  }))
  
  const subItems = Object.keys(subItemsDict)
    .map(key => subItemsDict[key])
    .map(item => ({
      id: item.id,
      label: item.label,
      link: item.link,
      category: [item.lv1, item.lv2, item.lv3].filter(_ => _).join(' > '),
      inSubnav: item.displayInMenu,
      searchQueryString: item.searchQueryString,
      subItems: Object.keys(subItemsDict)
        .filter(key => subItemsDict[key].parentId === item.id)
    }))
    
  return {
    categories: subItems.reduce((p,n) => Object.assign(p, {[n.link]: n}), {}),
    rootCategoryPaths: rootItems.map(item => item.link)
  }
}