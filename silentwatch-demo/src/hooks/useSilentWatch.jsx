import { useContext } from 'react';
import SilentWatchContext from '../contexts/SilentWatchContext';

export default function useSilentWatch() {
  return useContext(SilentWatchContext);
}
