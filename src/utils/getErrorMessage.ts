/**
 * Extrai a mensagem de erro legível de uma resposta do backend (AppError / Celebrate)
 * ou retorna uma mensagem genérica como fallback.
 */
export function getErrorMessage(err: unknown, fallback = 'Ocorreu um erro. Tente novamente.'): string {
  if (err !== null && typeof err === 'object' && 'isAxiosError' in (err as object)) {
    const axiosErr = err as any;
    const data = axiosErr.response?.data;

    // Celebrate: { validation: { body: { message: "..." } } }
    if (data?.validation?.body?.message) {
      return data.validation.body.message;
    }

    // AppError padrão: { message: "..." }
    if (data?.message && typeof data.message === 'string') {
      return data.message;
    }
  }

  return fallback;
}
