import { createContext, useContext, useState, useSyncExternalStore, useCallback } from 'react';
import { createStore, combineReducers } from './core.js';
import ui from './slices/ui.js';
import consent from './slices/consent.js';
import auth from './slices/auth.js';
import { persistMiddleware } from './persist.js';

export const rootReducer = combineReducers({ ui, consent, auth });

export const makeStore = (preloaded) => createStore(rootReducer, preloaded, [persistMiddleware]);

const StoreContext = createContext(null);

export function StoreProvider({ children, store: external }) {
  const [store] = useState(() => external ?? makeStore());
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used within <StoreProvider>');
  return store;
}

/** Same signature as react-redux `useSelector`. */
export function useAppSelector(selector) {
  const store = useStore();
  const get = useCallback(() => selector(store.getState()), [store, selector]);
  return useSyncExternalStore(store.subscribe, get, get);
}

/** Same signature as react-redux `useDispatch`. */
export function useAppDispatch() {
  return useStore().dispatch;
}
