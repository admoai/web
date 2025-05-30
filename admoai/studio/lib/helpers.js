export function getPageField(fields, fieldsToMerge) {
  const slices = fields.filter((x) => x.name === 'slices')
  const pageFields = fields.filter((x) => x.name !== 'slices')
  return [...pageFields, ...fieldsToMerge, ...slices]
}
export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}
