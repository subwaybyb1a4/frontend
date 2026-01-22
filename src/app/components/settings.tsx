import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Repeat,
  Footprints,
  Save,
  RotateCcw,
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [congestionWeight, setCongestionWeight] = useState(70);
  const [transferWeight, setTransferWeight] = useState(50);
  const [walkingWeight, setWalkingWeight] = useState(60);

  const handleReset = () => {
    setCongestionWeight(50);
    setTransferWeight(50);
    setWalkingWeight(50);
  };

  const handleSave = () => {
    // Save to localStorage or context
    localStorage.setItem(
      'comfortPreferences',
      JSON.stringify({
        congestionWeight,
        transferWeight,
        walkingWeight,
      })
    );
    alert('설정이 저장되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">쾌적 기준 설정</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-blue-900 mb-1">
                나만의 쾌적 기준
              </div>
              <div className="text-sm text-blue-700">
                각 요소의 중요도를 조절하여 맞춤형 경로 추천을 받아보세요.
                높을수록 해당 요소를 더 중요하게 고려합니다.
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          {/* Congestion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">혼잡도</div>
                <div className="text-sm text-gray-500">
                  사람 많은 것이 싫어요
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {congestionWeight}
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={congestionWeight}
                onChange={(e) => setCongestionWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>중요하지 않음</span>
                <span>매우 중요함</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">
                {congestionWeight < 30 && (
                  <span>혼잡도를 크게 신경쓰지 않습니다</span>
                )}
                {congestionWeight >= 30 && congestionWeight < 70 && (
                  <span>적당한 수준의 혼잡도를 선호합니다</span>
                )}
                {congestionWeight >= 70 && (
                  <span>
                    여유로운 공간을 매우 중요하게 생각합니다. 시간이 더
                    걸리더라도 덜 혼잡한 경로를 추천합니다.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Transfer */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Repeat className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">환승</div>
                <div className="text-sm text-gray-500">환승이 제일 싫어요</div>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {transferWeight}
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={transferWeight}
                onChange={(e) => setTransferWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>중요하지 않음</span>
                <span>매우 중요함</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">
                {transferWeight < 30 && (
                  <span>환승 횟수를 크게 신경쓰지 않습니다</span>
                )}
                {transferWeight >= 30 && transferWeight < 70 && (
                  <span>적절한 수준의 환승을 선호합니다</span>
                )}
                {transferWeight >= 70 && (
                  <span>
                    직통 또는 최소 환승을 매우 선호합니다. 환승이 적은 경로를
                    우선적으로 추천합니다.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Walking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Footprints className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">도보 거리</div>
                <div className="text-sm text-gray-500">많이 걷기 싫어요</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {walkingWeight}
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={walkingWeight}
                onChange={(e) => setWalkingWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>중요하지 않음</span>
                <span>매우 중요함</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">
                {walkingWeight < 30 && (
                  <span>도보 거리를 크게 신경쓰지 않습니다</span>
                )}
                {walkingWeight >= 30 && walkingWeight < 70 && (
                  <span>적당한 도보 거리를 선호합니다</span>
                )}
                {walkingWeight >= 70 && (
                  <span>
                    도보 거리를 최소화하길 원합니다. 걷는 거리가 짧은 경로를
                    우선적으로 추천합니다.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 mb-8">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            초기화
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg"
          >
            <Save className="w-5 h-5" />
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
