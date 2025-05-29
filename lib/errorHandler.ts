import type { NextApiResponse } from 'next';

type ErrorInput = Error | string | { message?: string } | unknown;

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
  if (hasMessage(error)) return error.message;
  return 'Unexpected server error.';
};

function hasMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  );
}
