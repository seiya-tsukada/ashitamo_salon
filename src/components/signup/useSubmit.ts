import { useState } from 'react';

// Runs an async form action, tracking the in-flight state and the error message to show
export const useSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (action: () => Promise<void>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
};
