// src/utils/localStorage.ts
export const loadState = () => {
    try {
      const serialized = localStorage.getItem('reduxState');
      return serialized ? JSON.parse(serialized) : undefined;
    } catch {
      return undefined;
    }
  };
  
  export const saveState = (state: any) => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem('reduxState', serialized);
    } catch {
      // Ignore write errors
    }
  };
  