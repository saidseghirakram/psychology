import type { NextApiResponse } from 'next';

type ErrorInput = Error | string | unknown;

export const handleApiError = (
  res: NextApiResponse,
  error: ErrorInput,
  statusCode: number = 500
) => {
  const message = extractMessage(error);

  if (process.env.NODE_ENV !== 'production') {
    console.error('[API ERROR]', message);
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: message,
  });
};

const extractMessage = (error: ErrorInput): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as any).message;
  }
  return 'Unexpected server error.';
};
