import { create } from 'zustand';

/**
 * 카운터 스토어 타입 정의
 */
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

/**
 * Zustand 카운터 스토어
 * 전역 상태 관리를 담당합니다.
 */
export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,

  /**
   * 카운트를 1 증가시킵니다.
   */
  increment: () => set((state) => ({ count: state.count + 1 })),

  /**
   * 카운트를 1 감소시킵니다.
   */
  decrement: () => set((state) => ({ count: state.count - 1 })),

  /**
   * 카운트를 0으로 초기화합니다.
   */
  reset: () => set({ count: 0 }),
}));
