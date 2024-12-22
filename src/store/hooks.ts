// src/app/hooks.ts

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

// Хук для использования dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Хук для использования состояния
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected =>
    useSelector(selector);
