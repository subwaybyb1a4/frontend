import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Smile,
  TrendingUp,
  Users,
  Footprints,
  Repeat,
} from 'lucide-react';
import { sampleRoutes } from '@/app/data/mockData';

export default function RouteResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'time' | 'comfort'>('comfort');

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const sortedRoutes =
    viewMode === 'time'
      ? [...sampleRoutes].sort((a, b) => a.totalTime - b.totalTime)
      : [...sampleRoutes].sort((a, b) => b.comfortScore - a.comfortScore);

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getComfortScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
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
                검색 결과 {sampleRoutes.length}개
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('comfort')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                viewMode === 'comfort'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Smile className="w-5 h-5 inline mr-2" />
              쾌적함 우선
            </button>
            <button
              onClick={() => setViewMode('time')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                viewMode === 'time'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Clock className="w-5 h-5 inline mr-2" />
              시간 우선
            </button>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {sortedRoutes.map((route, index) => {
          const isRecommended = viewMode === 'comfort' && index === 0;
          const timeDiff =
            viewMode === 'comfort'
              ? route.totalTime - sortedRoutes[0].totalTime
              : 0;

          return (
            <div
              key={route.id}
              onClick={() => navigate(`/route-detail/${route.id}`)}
              className={`bg-white rounded-xl shadow-sm border-2 cursor-pointer hover:shadow-lg transition-all ${
                isRecommended ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {isRecommended && (
                <div className="bg-blue-500 text-white px-4 py-2 rounded-t-xl flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold text-sm">추천 경로</span>
                </div>
              )}

              <div className="p-4">
                {/* Time and Comfort Score */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {route.totalTime}분
                    </div>
                    {timeDiff > 0 && viewMode === 'comfort' && (
                      <div className="text-sm text-blue-600 mt-1">
                        최단 경로보다 +{timeDiff}분
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${getComfortScoreColor(
                        route.comfortScore
                      )}`}
                    >
                      <Smile className="w-5 h-5" />
                      <span className="font-bold text-lg">
                        {route.comfortScore}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">쾌적 지수</div>
                  </div>
                </div>

                {/* Comfort Message */}
                {isRecommended && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">{timeDiff}분</span> 더
                      걸리지만,{' '}
                      <span className="font-semibold">
                        앉아서 갈 확률이{' '}
                        {route.comfortFactors.seatProbability}% 더 높아요
                      </span>
                    </p>
                  </div>
                )}

                {/* Route Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Repeat className="w-4 h-4" />
                      <span>환승 {route.transfers.length}회</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                      {route.fare}원
                    </div>
                  </div>

                  {/* Segments */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {route.segments.map((segment, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                          <div
                            className={`w-2 h-2 rounded-full ${getCongestionColor(
                              segment.congestion
                            )}`}
                          />
                          <span className="text-xs font-medium text-gray-700">
                            {segment.line}
                          </span>
                          <span className="text-xs text-gray-500">
                            {segment.duration}분
                          </span>
                        </div>
                        {idx < route.segments.length - 1 && (
                          <span className="text-gray-400">→</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Comfort Factors */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <Users className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500">혼잡도</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {route.comfortFactors.congestionScore}
                      </div>
                    </div>
                    <div className="text-center">
                      <Repeat className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500">환승</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {route.comfortFactors.transferScore}
                      </div>
                    </div>
                    <div className="text-center">
                      <Footprints className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500">도보</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {route.comfortFactors.walkingScore}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
