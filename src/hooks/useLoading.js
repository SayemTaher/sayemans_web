import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { loadEnd, loadStart } from '@/store/slices/ui';

/**
 * Register "something is loading" with the global loader while `active`.
 * The bouncing SAYEMANS overlay appears if it takes longer than
 * loaderConfig.showAfterMs, and gives up after loaderConfig.timeoutMs.
 */
export function useLoading(active = true) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!active) return;
    dispatch(loadStart());
    return () => dispatch(loadEnd());
  }, [active, dispatch]);
}

/** Same, for a promise: `await trackLoading(dispatch, fetchSomething())`. */
export function trackLoading(dispatch, promise) {
  dispatch(loadStart());
  return Promise.resolve(promise).finally(() => dispatch(loadEnd()));
}
