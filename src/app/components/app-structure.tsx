import { ArrowRight, ArrowDown } from 'lucide-react';

export default function AppStructure() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">
          편한 지하철 앱 구조도
        </h1>
        <p className="text-center text-gray-600 mb-12">
          전체 화면 플로우와 주요 기능
        </p>

        {/* Level 1: Main Entry Points */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">
              Level 1: 메인 진입점
            </span>
          </div>

          {/* Home Screen Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto border-4 border-purple-500">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg mb-4">
              <h2 className="text-xl font-bold">편한 지하철</h2>
              <p className="text-sm opacity-90">쾌적한 경로로 스마트하게</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center gap-2">
              <span className="text-gray-400">🔍</span>
              <span className="text-gray-500">어디로 가시나요?</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm font-semibold flex items-center gap-2">
                <span>⭐</span>
                <span>즐겨찾기</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="font-semibold text-sm mb-1">집으로</div>
                <div className="text-xs text-gray-600">강남역 → 잠실역</div>
                <div className="text-xs text-yellow-600 mt-1">
                  ⚠️ 약간 혼잡
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="font-semibold text-sm mb-1">회사로</div>
                <div className="text-xs text-gray-600">홍대입구역 → 강남역</div>
                <div className="text-xs text-red-600 mt-1">🔴 혼잡</div>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-around text-xs">
              <div className="text-blue-600 font-semibold">🏠 홈</div>
              <div className="text-gray-400">⭐ 즐겨찾기</div>
              <div className="text-gray-400">👤 MY</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <ArrowDown className="w-8 h-8 text-purple-500" />
        </div>

        {/* Level 2: Route Search */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
              Level 2: 검색 조건 입력
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto border-4 border-blue-500">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              ← 경로 검색
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  📍 출발역
                </label>
                <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50">
                  강남역
                </div>
              </div>

              <div className="text-center text-gray-400">↓</div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  🎯 도착역
                </label>
                <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50">
                  선릉역
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 bg-blue-500 text-white rounded-lg p-2 text-center text-sm font-semibold">
                  ⏰ 지금 출발
                </div>
                <div className="flex-1 bg-gray-200 text-gray-600 rounded-lg p-2 text-center text-sm">
                  📅 시간 예약
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
                경로 검색
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <ArrowDown className="w-8 h-8 text-blue-500" />
        </div>

        {/* Level 3: Search Results - 3 Options */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
              Level 3: 검색 결과 (3가지 옵션)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Option A: Fastest */}
            <div className="bg-white rounded-2xl shadow-xl p-5 border-4 border-orange-400">
              <div className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                ⚡ 최단 시간
              </div>
              <div className="text-4xl font-bold mb-2">12분</div>
              <div className="text-sm text-gray-600 mb-3">
                2호선 직통 • 환승 0회
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <div className="text-xs text-red-700 mb-1">혼잡도</div>
                <div className="text-sm font-semibold text-red-900">
                  🔴 혼잡 (85%)
                </div>
              </div>
              <div className="text-xs text-gray-500">
                • 가장 빠른 경로
                <br />• 높은 혼잡도 예상
              </div>
            </div>

            {/* Option B: Least Walking */}
            <div className="bg-white rounded-2xl shadow-xl p-5 border-4 border-yellow-400">
              <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                👣 최소 걸음
              </div>
              <div className="text-4xl font-bold mb-2">15분</div>
              <div className="text-sm text-gray-600 mb-3">
                2호선 → 3호선 • 환승 1회
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                <div className="text-xs text-yellow-700 mb-1">환승 편의</div>
                <div className="text-sm font-semibold text-yellow-900">
                  ✅ 에스컬레이터 이용
                </div>
              </div>
              <div className="text-xs text-gray-500">
                • 환승 거리 150m
                <br />• 환승 난이도 낮음
              </div>
            </div>

            {/* Option C: Comfort (Recommended) */}
            <div className="bg-white rounded-2xl shadow-xl p-5 border-4 border-green-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                ⭐ 추천
              </div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                😌 시간부자
              </div>
              <div className="text-4xl font-bold mb-2">
                23분
                <span className="text-lg text-blue-600"> +11분</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                2호선 → 3호선 • 환승 1회
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <div className="text-xs text-green-700 mb-1">쾌적 지수</div>
                <div className="text-sm font-semibold text-green-900">
                  😊 82점
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-900 mb-2">
                💡 11분 더 걸리지만,
                <br />
                <strong>앉아서 갈 확률 65%</strong>
              </div>
              <div className="text-xs text-gray-500">
                • 낮은 혼잡도 🟢
                <br />• 착석 가능성 높음
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <ArrowDown className="w-8 h-8 text-green-500" />
        </div>

        {/* Level 4: Route Detail */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold">
              Level 4: 경로 상세 정보
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto border-4 border-pink-500">
            <h2 className="text-xl font-bold mb-4">← 경로 상세</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tab 1: Comfort Analysis */}
              <div className="border-2 border-pink-300 rounded-lg p-4 bg-pink-50">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  📊 쾌적 분석
                </h3>
                <div className="bg-white rounded-lg p-3 mb-2">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-2">
                      <div className="text-3xl font-bold text-blue-600">82</div>
                    </div>
                    <div className="text-xs text-gray-600">쾌적 지수</div>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>👥 혼잡도</span>
                    <span className="font-semibold">75점</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🔄 환승 편의</span>
                    <span className="font-semibold">85점</span>
                  </div>
                  <div className="flex justify-between">
                    <span>👣 도보 거리</span>
                    <span className="font-semibold">90점</span>
                  </div>
                </div>
              </div>

              {/* Tab 2: Step by Step */}
              <div className="border-2 border-pink-300 rounded-lg p-4 bg-pink-50">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  🗺️ 상세 경로
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <div className="font-semibold">강남역</div>
                      <div className="text-gray-600">출발</div>
                    </div>
                  </div>
                  <div className="ml-3 border-l-2 border-gray-300 pl-3 py-2">
                    <div className="bg-white rounded p-2 mb-1">
                      <div className="font-semibold text-blue-600">
                        2호선 (8분)
                      </div>
                      <div className="text-gray-600">🟡 보통 혼잡</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      🔄
                    </div>
                    <div>
                      <div className="font-semibold">교대역 환승</div>
                      <div className="text-gray-600">5분 • 150m</div>
                    </div>
                  </div>
                  <div className="ml-3 border-l-2 border-gray-300 pl-3 py-2">
                    <div className="bg-white rounded p-2">
                      <div className="font-semibold text-orange-600">
                        3호선 (10분)
                      </div>
                      <div className="text-gray-600">🟢 여유</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white flex-shrink-0">
                      🎯
                    </div>
                    <div>
                      <div className="font-semibold">선릉역</div>
                      <div className="text-gray-600">도착</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab 3: Car Recommendation */}
              <div className="border-2 border-pink-300 rounded-lg p-4 bg-pink-50">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  🚇 칸 추천
                </h3>
                <div className="space-y-2">
                  <div className="bg-green-50 border border-green-300 rounded-lg p-2">
                    <div className="font-semibold text-sm text-green-900">
                      4-1번 칸
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      승강장 앞쪽
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      🟢 여유로움
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-300 rounded-lg p-2">
                    <div className="font-semibold text-sm text-green-900">
                      7-3번 칸
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      승강장 중간
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      🟢 여유로움
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2">
                    <div className="font-semibold text-sm text-yellow-900">
                      5-2번 칸
                    </div>
                    <div className="text-xs text-yellow-700 mt-1">
                      주요 출구 근처
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      🟡 보통
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold mt-4">
              이 경로로 출발하기
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <ArrowRight className="w-8 h-8 text-gray-400" />
            <span className="text-gray-600">또는</span>
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Additional Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Favorites */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-indigo-500">
            <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              ⭐ 즐겨찾기
            </div>
            <h2 className="text-lg font-bold mb-4">← 즐겨찾기 관리</h2>
            <div className="space-y-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">⭐ 집으로</div>
                    <div className="text-xs text-gray-600">
                      강남역 → 잠실역
                    </div>
                  </div>
                  <button className="text-red-500 text-sm">🗑️</button>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">⭐ 회사로</div>
                    <div className="text-xs text-gray-600">
                      홍대입구역 → 강남역
                    </div>
                  </div>
                  <button className="text-red-500 text-sm">🗑️</button>
                </div>
              </div>
            </div>
            <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold mt-3">
              + 새 경로 추가
            </button>
          </div>

          {/* Settings / My Page */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-500">
            <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              ⚙️ MY 설정
            </div>
            <h2 className="text-lg font-bold mb-4">← 쾌적 기준 설정</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold">👥 혼잡도</div>
                  <div className="text-xl font-bold text-red-600">70</div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: '70%' }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  사람 많은 것이 싫어요
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold">🔄 환승</div>
                  <div className="text-xl font-bold text-yellow-600">50</div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: '50%' }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  환승이 제일 싫어요
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold">👣 도보</div>
                  <div className="text-xl font-bold text-purple-600">60</div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: '60%' }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  많이 걷기 싫어요
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold">
                초기화
              </button>
              <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg text-sm font-semibold">
                💾 저장
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-lg mb-4 text-center">주요 특징</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="font-semibold mb-1">최단 시간</div>
              <div className="text-sm text-gray-600">
                기존 앱과 동일한 기준
                <br />
                빠르지만 혼잡할 수 있음
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👣</div>
              <div className="font-semibold mb-1">최소 걸음</div>
              <div className="text-sm text-gray-600">
                환승 난이도가 낮은 경로
                <br />
                에스컬레이터 이용 가능
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">😌</div>
              <div className="font-semibold mb-1">시간부자 (추천)</div>
              <div className="text-sm text-gray-600">
                +10분 이내, 혼잡도 낮음
                <br />
                착석 확률 높음
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
