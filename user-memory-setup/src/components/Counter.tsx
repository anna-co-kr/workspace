'use client';

import { useCounterStore } from '@/store/counterStore';

// 상수 정의
const BUTTON_CLASS =
  'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
const PRIMARY_BUTTON_CLASS = `${BUTTON_CLASS} bg-blue-600 hover:bg-blue-700 text-white`;
const SECONDARY_BUTTON_CLASS = `${BUTTON_CLASS} bg-gray-300 hover:bg-gray-400 text-gray-800`;
const DANGER_BUTTON_CLASS = `${BUTTON_CLASS} bg-red-600 hover:bg-red-700 text-white`;

/**
 * 카운터 컴포넌트
 * 증가, 감소, 초기화 기능을 제공합니다.
 * @returns {JSX.Element} 카운터 UI
 */
export function Counter(): JSX.Element {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          카운터
        </h1>

        {/* 카운트 표시 */}
        <div className="text-6xl font-bold text-center mb-8 text-blue-600">
          {count}
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={decrement}
            className={SECONDARY_BUTTON_CLASS}
            aria-label="감소"
          >
            −
          </button>

          <button
            onClick={reset}
            className={DANGER_BUTTON_CLASS}
            aria-label="초기화"
          >
            초기화
          </button>

          <button
            onClick={increment}
            className={PRIMARY_BUTTON_CLASS}
            aria-label="증가"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
