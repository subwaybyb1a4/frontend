import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Footprints,
  Smile,
  TrendingUp,
  Users,
  Repeat,
} from 'lucide-react';

export default function RouteResultsNew() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const routes = [
    {
      id: 'fastest',
      type: 'fastest',
      name: '최단 시간',
      icon: '⚡',
      color: 'orange',
      time: 12,
      timeDiff: 0,
      transfers: 0,
      congestion: 'high',
      congestionScore: 40,
      comfortScore: 65,
      seatProbability: 25,
      line: '2호선 직통',
      features: ['가장 빠른 경로', '높은 혼잡도 예상'],
    },
    {
      id: 'comfort',
      type: 'comfort',
      name: '시간부자',
      icon: '😌',
      color: 'green',
      time: 23,
      timeDiff: 11,
      transfers: 1,
      congestion: 'low',
      congestionScore: 75,
      comfortScore: 82,
      seatProbability: 65,
      line: '2호선 → 3호선',
      features: ['낮은 혼잡도', '착석 가능성 높음'],
      recommended: true,
      message: '11분 더 걸리지만, 앉아서 갈 확률이 65% 더 높아요',
    },
    {
      id: 'easy',
      type: 'easy-transfer',
      name: '최소 걸음',
      icon: '👣',
      color: 'yellow',
      time: 15,
      timeDiff: 3,
      transfers: 1,
      congestion: 'medium',
      congestionScore: 60,
      comfortScore: 72,
      seatProbability: 45,
      line: '2호선 → 3호선',
      features: ['환승 거리 150m', '에스컬레이터 이용'],
    },
  ];

  const getColorClasses = (color: string, variant: 'bg' | 'border' | 'text') => {
    const colors = {
      orange: {
        bg: 'bg-orange-400',
        border: 'border-orange-400',
        text: 'text-orange-600',
      },
      green: {
        bg: 'bg-green-500',
        border: 'border-green-500',
        text: 'text-green-600',
      },
      yellow: {
        bg: 'bg-yellow-400',
        border: 'border-yellow-400',
        text: 'text-yellow-600',
      },
    };
    return colors[color as keyof typeof colors][variant];
  };

  const getCongestionBadge = (level: string) => {
    switch (level) {
      case 'high':
        return {
          text: '혼잡',
          color: 'bg-red-500 text-red-100',
          percentage: '85%',
        };
      case 'medium':
        return {
          text: '보통',
          color: 'bg-yellow-500 text-yellow-100',
          percentage: '60%',
        };
      case 'low':
        return {
          text: '여유',
          color: 'bg-green-500 text-green-100',
          percentage: '30%',
        };
      default:
        return {
          text: '보통',
          color: 'bg-gray-500 text-gray-100',
          percentage: '50%',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                {from} → {to}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                검색 결과 3개 (시간/걸음/쾌적)
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <div className="flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-blue-900">
              <span className="font-semibold">시간부자</span> 경로가 추천됩니다.
              조금 더 걸리지만 훨씬 쾌적한 이동이 가능해요!
            </div>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {routes.map((route) => {
            const congestionBadge = getCongestionBadge(route.congestion);

            return (
              <div
                key={route.id}
                onClick={() => navigate(`/route-detail/${route.id}`)}
                className={`bg-white rounded-2xl shadow-md border-4 cursor-pointer hover:shadow-xl transition-all relative ${
                  getColorClasses(route.color, 'border')
                }`}
              >
                {/* Recommended Badge */}
                {route.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    추천 경로
                  </div>
                )}

                {/* Header Badge */}
                <div className="p-5 pb-4">
                  <div
                    className={`${getColorClasses(
                      route.color,
                      'bg'
                    )} text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2`}
                  >
                    <span className="text-lg">{route.icon}</span>
                    {route.name}
                  </div>

                  {/* Time Section */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900">
                          {route.time}
                        </span>
                        <span className="text-2xl text-gray-600">분</span>
                      </div>
                      {route.timeDiff > 0 && (
                        <div className="text-sm text-blue-600 mt-1 font-medium">
                          최단 경로보다 +{route.timeDiff}분
                        </div>
                      )}
                    </div>

                    {/* Comfort Score */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-1">
                        <div className="text-2xl font-bold">
                          {route.comfortScore}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">쾌적 지수</div>
                    </div>
                  </div>

                  {/* Message for Comfort Route */}
                  {route.message && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Smile className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-900 font-medium">
                          {route.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Route Info */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-gray-700">
                        {route.line}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Repeat className="w-4 h-4" />
                        <span>환승 {route.transfers}회</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">
                          혼잡도
                        </div>
                        <div
                          className={`text-xs px-3 py-1.5 rounded-full font-semibold inline-block ${congestionBadge.color}`}
                        >
                          {congestionBadge.text} ({congestionBadge.percentage})
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">
                          착석 확률
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {route.seatProbability}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {route.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700"
                      >
                        • {feature}
                      </div>
                    ))}
                  </div>

                  {/* Comfort Factors */}
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <Users className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500 mb-1">혼잡도</div>
                      <div className="text-sm font-bold text-gray-900">
                        {route.congestionScore}
                      </div>
                    </div>
                    <div className="text-center">
                      <Repeat className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500 mb-1">환승</div>
                      <div className="text-sm font-bold text-gray-900">
                        {100 - route.transfers * 15}
                      </div>
                    </div>
                    <div className="text-center">
                      <Footprints className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500 mb-1">도보</div>
                      <div className="text-sm font-bold text-gray-900">
                        {90 - route.transfers * 10}
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Detail Button */}
                <div className="border-t border-gray-200 p-4">
                  <div className="text-center text-sm font-semibold text-gray-600">
                    상세 보기 →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
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
                나에게 맞는 경로는?
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>
                  <strong>⚡ 최단 시간:</strong> 빠르게 가야 할 때
                </div>
                <div>
                  <strong>👣 최소 걸음:</strong> 환승이 힘들거나 짐이 많을 때
                </div>
                <div>
                  <strong>😌 시간부자:</strong> 여유롭고 쾌적하게 가고 싶을 때
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
