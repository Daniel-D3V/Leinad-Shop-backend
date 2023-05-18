export const formatError = (errors: Error[]) => ({
    errors: errors.map(error => ({ 
      name: error.name,
      message: error.message
    }))
  })