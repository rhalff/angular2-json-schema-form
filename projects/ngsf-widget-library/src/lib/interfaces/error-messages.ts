export interface ErrorMessages {
  // [controlName: string]: { message: string | Function | Object, code: string }[]
  [controlName: string]: { message: any, code: string }[]
}

