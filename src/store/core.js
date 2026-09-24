// ─────────────────────────────────────────────────────────────
// Minimal Redux-compatible primitives.
//
// The API mirrors Redux Toolkit on purpose (createSlice / createStore /
// combineReducers / getState / dispatch / subscribe). Migrating later is:
//   1. npm i @reduxjs/toolkit react-redux
//   2. replace createStore(...) with configureStore({ reducer })
//   3. swap StoreProvider for <Provider> and re-export react-redux hooks
// Slices, selectors and components stay untouched.
// ─────────────────────────────────────────────────────────────

export function createSlice({ name, initialState, reducers }) {
  const actions = {};
  for (const key of Object.keys(reducers)) {
    const type = `${name}/${key}`;
    const creator = (payload) => ({ type, payload });
    creator.type = type;
    creator.match = (action) => action?.type === type;
    actions[key] = creator;
  }
  const reducer = (state = initialState, action) => {
    const [slice, key] = String(action?.type).split('/');
    if (slice !== name || !reducers[key]) return state;
    // Reducers return the next state (no Immer) — also valid in RTK.
    return reducers[key](state, action);
  };
  return { name, actions, reducer, initialState };
}

export function combineReducers(map) {
  const keys = Object.keys(map);
  return (state = {}, action) => {
    let changed = false;
    const next = {};
    for (const key of keys) {
      next[key] = map[key](state[key], action);
      if (next[key] !== state[key]) changed = true;
    }
    return changed ? next : state;
  };
}

export function createStore(reducer, preloadedState, middlewares = []) {
  let state = reducer(preloadedState, { type: '@@INIT' });
  const listeners = new Set();

  const getState = () => state;
  const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  let dispatch = (action) => {
    if (typeof action === 'function') return action(dispatch, getState); // thunk support
    const next = reducer(state, action);
    if (next !== state) {
      state = next;
      listeners.forEach((l) => l());
    }
    return action;
  };
  // Apply middleware chain (same signature as Redux middleware).
  const api = { getState, dispatch: (a) => dispatch(a) };
  dispatch = middlewares
    .map((m) => m(api))
    .reduceRight((acc, m) => m(acc), dispatch);

  return { getState, dispatch, subscribe };
}
