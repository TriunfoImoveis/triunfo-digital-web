export const isFullAccessAdmin = (office: string): boolean => {
  switch (office) {
    case 'Gerente':
      return true
    case 'Presidente': 
    return true
    default:
      return false
  }
}