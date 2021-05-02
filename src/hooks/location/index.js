import { useLocation } from 'react-router';

export default (...params) => {
  try {
    return useLocation(...params);
  } catch {
    return {};
  }
};
