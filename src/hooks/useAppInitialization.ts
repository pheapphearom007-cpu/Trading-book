import { useState, useEffect, useCallback, useRef } from 'react';
import { initializeApplication, InitResult } from '../services/initService';

export interface UseAppInitializationReturn {
  isInitialized: boolean;
  isFadingOut: boolean;
  progressPercent: number;
  statusMessage: string;
  error: string | null;
  initResult: InitResult | null;
  retry: () => void;
}

export function useAppInitialization(timeoutMs = 12000): UseAppInitializationReturn {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progressPercent, setProgressPercent] = useState(10);
  const [statusMessage, setStatusMessage] = useState('Connecting to services...');
  const [error, setError] = useState<string | null>(null);
  const [initResult, setInitResult] = useState<InitResult | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startInitialization = useCallback(() => {
    // Reset state
    setError(null);
    setProgressPercent(10);
    setStatusMessage('Starting application initialization...');
    setIsInitialized(false);
    setIsFadingOut(false);

    // Cancel any previous in-flight task
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Timeout safeguard
    timeoutIdRef.current = setTimeout(() => {
      controller.abort();
      setError('Initialization timed out. Please check your network and storage settings.');
      setStatusMessage('Connection timed out');
    }, timeoutMs);

    initializeApplication((pct, msg) => {
      setProgressPercent(pct);
      setStatusMessage(msg);
    }, controller.signal)
      .then((result) => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        setInitResult(result);
        setProgressPercent(100);
        setStatusMessage('Welcome to The Trading Book');

        // Smooth fade out sequence
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsInitialized(true);
          }, 500); // 500ms matches CSS transition
        }, 300);
      })
      .catch((err: any) => {
        if (err.name === 'AbortError' || err.message === 'Initialization was cancelled.') {
          return;
        }
        console.error('App initialization failure:', err);
        setError(err?.message || 'An unexpected error occurred while preparing the application.');
        setStatusMessage('Initialization interrupted');
      });
  }, [timeoutMs]);

  useEffect(() => {
    startInitialization();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [startInitialization]);

  return {
    isInitialized,
    isFadingOut,
    progressPercent,
    statusMessage,
    error,
    initResult,
    retry: startInitialization
  };
}
