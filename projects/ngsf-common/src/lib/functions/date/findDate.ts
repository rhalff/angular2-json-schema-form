/**
 * 'findDate' function
 */
export function findDate(text): string {
  if (!text) {
    return null
  }
  let foundDate: any[]
  // Match ...YYYY-MM-DD...
  foundDate = text.match(/(?:19|20)\d\d[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:[012]?\d|3[01])(?!\d)/)
  if (foundDate) {
    return foundDate[0]
  }
  // Match ...MM-DD-YYYY...
  foundDate = text.match(/(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:19|20)\d\d(?!\d)/)
  if (foundDate) {
    return foundDate[0]
  }
  // Match MM-DD-YY...
  foundDate = text.match(/^(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ]\d\d(?!\d)/)
  if (foundDate) {
    return foundDate[0]
  }
  // Match YY-MM-DD...
  foundDate = text.match(/^\d\d[-_\\\/\. ](?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])(?!\d)/)
  if (foundDate) {
    return foundDate[0]
  }
  // Match YYYYMMDD...
  foundDate = text.match(/^(?:19|20)\d\d(?:0\d|1[012])(?:[012]\d|3[01])/)
  if (foundDate) {
    return foundDate[0]
  }
}
