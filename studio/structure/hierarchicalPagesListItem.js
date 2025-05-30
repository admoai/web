import compact from 'lodash/compact'

const documentHasChildren = async (client, id, type) =>
  client.fetch('defined(*[parent._ref == $id && _type == $type]{ _id }[0])', {
    id,
    type
  })

const createHierarchicalList = (S, client, type, parentId) => {
  let list = S.documentTypeList(type)
  list = list
    .title(!parentId ? `Top Level ${list.getTitle()}s` : 'Subsection')
    .apiVersion('2021-10-21')
    .filter(
      list.getFilter() +
        (!parentId
          ? ' && !defined(parent)'
          : ' && (_id == $parentId || parent._ref == $parentId)')
    )
    .params(parentId ? { ...list.getParams(), parentId } : list.getParams())
    .defaultOrdering(
      compact([
        parentId && { field: 'parent._ref', direction: 'desc' },
        ...list.getDefaultOrdering()
      ])
    )

  const createEditor = list.getChild()
  // const menuItems = list.getMenuItems()
  list = list.child(async (documentId) => {
    // if the child has its own children, return those; otherwise edit this document
    if (
      documentId !== parentId &&
      (await documentHasChildren(client, documentId, type))
    ) {
      return createHierarchicalList(S, client, type, documentId)
    }
    return createEditor(documentId)
  })

  return list
}

const hierarchicalPagesListItem = (S, client, type) => {
  return S.documentTypeListItem(type).child(
    createHierarchicalList(S, client, type)
  )
}

export default hierarchicalPagesListItem
