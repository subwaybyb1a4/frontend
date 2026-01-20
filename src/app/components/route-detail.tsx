import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Smile,
  MapPin,
  Target,
  Users,
  Repeat,
  Footprints,
  TrendingUp,
  Star,
  Train,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { sampleRoutes, carRecommendations } from '@/app/data/mockData';

export default function RouteDetail() {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'car'>(
    'overview'
  );

  const route = sampleRoutes.find((r) => r.id === routeId) || sampleRoutes[1];

  const comfortData = [
    {
      subject: '혼잡도',
      value: route.comfortFactors.congestionScore,
      fullMark: 100,
    },
    {
      subject: '환승 편의',
      value: route.comfortFactors.transferScore,
      fullMark: 100,
    },
    {
      subject: '도보 거리',
      value: route.comfortFactors.walkingScore,
      fullMark: 100,
    },
    { subject: '착석 확률', value: route.comfortFactors.seatProbability * 1.5, fullMark: 100 },
  ];

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500 text-green-100';
      case 'medium':
        return 'bg-yellow-500 text-yellow-100';
      case 'high':
        return 'bg-red-500 text-red-100';
      default:
        return 'bg-gray-500 text-gray-100';
    }
  };

  const getCongestionText = (level: string) => {
    switch (level) {
      case 'low':
        return '여유';
      case 'medium':
        return '보통';
      case 'high':
        return '혼잡';
      default:
        return '보통';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold flex-1 text-center">
            경로 상세
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Star className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl font-bold mb-2">
                {route.totalTime}분
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-4 h-4" />
                <span className="text-sm">예상 소요 시간</span>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="text-3xl font-bold">{route.comfortScore}</div>
                <div className="text-xs mt-1">쾌적 지수</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-400">
            <div>
              <div className="text-blue-100 text-sm mb-1">환승</div>
              <div className="text-xl font-semibold">
                {route.transfers.length}회
              </div>
            </div>
            <div>
              <div className="text-blue-100 text-sm mb-1">요금</div>
              <div className="text-xl font-semibold">{route.fare}원</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            쾌적 분석
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'steps'
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            <MapPin className="w-5 h-5 inline mr-2" />
            상세 경로
          </button>
          <button
            onClick={() => setActiveTab('car')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'car'
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            <Train className="w-5 h-5 inline mr-2" />
            칸 추천
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Comfort Score Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Smile className="w-5 h-5 text-blue-500" />
                쾌적 지수 분석
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={comfortData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="쾌적도"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm text-green-700 mb-1">환승 피로도</div>
                  <div className="font-semibold text-green-900">낮음</div>
                  <div className="text-xs text-green-600 mt-1">
                    에스컬레이터 이용 가능
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm text-blue-700 mb-1">착석 확률</div>
                  <div className="font-semibold text-blue-900">
                    {route.comfortFactors.seatProbability}%
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    혼잡 시간대 고려
                  </div>
                </div>
              </div>
            </div>

            {/* Comfort Factors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4">상세 요인</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">구간 혼잡도</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${route.comfortFactors.congestionScore}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-10 text-right">
                      {route.comfortFactors.congestionScore}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Repeat className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">환승 편의</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${route.comfortFactors.transferScore}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-10 text-right">
                      {route.comfortFactors.transferScore}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Footprints className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">도보 거리</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{
                          width: `${route.comfortFactors.walkingScore}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-10 text-right">
                      {route.comfortFactors.walkingScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Steps Tab */}
        {activeTab === 'steps' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4">상세 경로 안내</h3>
            <div className="space-y-4">
              {/* Start */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-px h-full bg-blue-200 mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="font-semibold text-gray-900">
                    {route.segments[0].from.name}
                  </div>
                  <div className="text-sm text-gray-500">출발</div>
                </div>
              </div>

              {/* Segments */}
              {route.segments.map((segment, idx) => (
                <div key={idx}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Train className="w-5 h-5 text-gray-600" />
                      </div>
                      {idx < route.segments.length - 1 && (
                        <div className="w-px h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {segment.line}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getCongestionColor(
                              segment.congestion
                            )}`}
                          >
                            {getCongestionText(segment.congestion)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{segment.duration}분</span>
                          <span>•</span>
                          <span>{segment.distance}km</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transfer */}
                  {idx < route.segments.length - 1 &&
                    route.transfers[idx] && (
                      <div className="flex gap-4 my-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Repeat className="w-5 h-5 text-white" />
                          </div>
                          <div className="w-px h-full bg-gray-200 mt-2" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="font-semibold text-yellow-900 mb-1">
                              {route.transfers[idx].station.name} 환승
                            </div>
                            <div className="text-sm text-yellow-700 space-y-1">
                              <div>
                                도보 {route.transfers[idx].walkingDistance}m
                              </div>
                              <div>
                                예상 시간 {route.transfers[idx].transferTime}분
                              </div>
                              {route.transfers[idx].hasEscalator && (
                                <div className="text-green-700">
                                  ✓ 에스컬레이터 이용 가능
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ))}

              {/* End */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {route.segments[route.segments.length - 1].to.name}
                  </div>
                  <div className="text-sm text-gray-500">도착</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Car Recommendation Tab */}
        {activeTab === 'car' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Train className="w-5 h-5 text-blue-500" />
                추천 열차 칸
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                탑승 위치에 따른 혼잡도 예측 정보입니다
              </p>

              <div className="space-y-3">
                {carRecommendations.map((car) => {
                  const bgColor =
                    car.congestionLevel === 'low'
                      ? 'bg-green-50 border-green-200'
                      : car.congestionLevel === 'medium'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200';

                  const textColor =
                    car.congestionLevel === 'low'
                      ? 'text-green-900'
                      : car.congestionLevel === 'medium'
                      ? 'text-yellow-900'
                      : 'text-red-900';

                  const badgeColor =
                    car.congestionLevel === 'low'
                      ? 'bg-green-500 text-white'
                      : car.congestionLevel === 'medium'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white';

                  return (
                    <div
                      key={car.carNumber}
                      className={`border rounded-lg p-4 ${bgColor}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className={`font-semibold ${textColor}`}>
                            {car.carNumber}번 칸
                          </div>
                          <div className="text-sm text-gray-600">
                            {car.position}
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}
                        >
                          {getCongestionText(car.congestionLevel)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">{car.reason}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                    탑승 팁
                  </div>
                  <div className="text-sm text-blue-700">
                    승강장 표시를 참고하여 추천 칸 위치로 이동하면 더욱
                    쾌적하게 탑승하실 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-2xl mx-auto">
          <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg">
            이 경로로 출발하기
          </button>
        </div>
      </div>
    </div>
  );
}
