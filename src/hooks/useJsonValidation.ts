'use client';

import { useState, useCallback } from 'react';
import { safeJsonParse } from '@/lib/utils';
import { PageConfig } from '@/types/schema';

export function useJsonValidation() {
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((json: string): PageConfig | null => {
    if (!json.trim()) {
      setError('JSON is empty');
      return null;
    }

    const { data, error: parseError } = safeJsonParse(json);
    if (parseError) {
      setError(parseError);
      return null;
    }

    if (typeof data !== 'object' || data === null) {
      setError('JSON must be an object');
      return null;
    }

    setError(null);
    return data as PageConfig;
  }, []);

  return { error, validate, setError };
}
