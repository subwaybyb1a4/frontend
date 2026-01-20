import { Search, Star, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { favoriteRoutes } from '@/app/data/mockData';

const getCongestionColor = (level: string) => {
  switch (level) {
    case 'low':
      return 'text-green-600 bg-green-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'high':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getCongestionText = (level: string) => {
  switch (level) {
    case 'low':
      return '여유';
    case 'medium':
      return '약간 혼잡';
    case 'high':
      return '혼잡';
    default:
      return '보통';
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">편한 지하철</h1>
              <p className="text-sm text-gray-600 mt-1">
                쾌적한 경로로 스마트하게 이동하세요
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/wireframe"
                className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                와이어프레임
              </Link>
              <Link
                to="/app-structure"
                className="text-xs bg-purple-500 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-purple-600 transition-colors"
              >
                앱 구조도
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Link
          to="/search"
          className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-4 hover:shadow-md transition-shadow"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500 flex-1">어디로 가시나요?</span>
          <TrendingUp className="w-5 h-5 text-blue-500" />
        </Link>
      </div>

      {/* Quick Access - Favorites */}
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="font-semibold text-gray-900">즐겨찾기</h2>
          </div>
          <Link to="/favorites" className="text-sm text-blue-600">
            전체보기
          </Link>
        </div>

        <div className="space-y-3">
          {favoriteRoutes.map((route) => (
            <Link
              key={route.id}
              to={`/route-detail?from=${route.from.id}&to=${route.to.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {route.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getCongestionColor(
                        route.currentCongestion
                      )}`}
                    >
                      {getCongestionText(route.currentCongestion)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{route.from.name}</span>
                    <span>→</span>
                    <span>{route.to.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">지금 출발하면</div>
                  <div className="text-lg font-semibold text-blue-600">
                    약 25분
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-gray-900">최근 검색</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-center text-gray-500 text-sm py-4">
            최근 검색 내역이 없습니다
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-around">
          <Link
            to="/"
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">홈</span>
          </Link>
          <Link
            to="/favorites"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Star className="w-6 h-6" />
            <span className="text-xs">즐겨찾기</span>
          </Link>
          <Link
            to="/settings"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">MY</span>
          </Link>
        </div>
      </div>
    </div>
  );
}