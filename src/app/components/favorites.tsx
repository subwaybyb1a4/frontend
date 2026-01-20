import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Trash2, Edit } from 'lucide-react';
import { favoriteRoutes } from '@/app/data/mockData';

const getCongestionColor = (level: string) => {
  switch (level) {
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
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

export default function Favorites() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState(favoriteRoutes);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = (id: string) => {
    setRoutes(routes.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">즐겨찾기</h1>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {editMode ? '완료' : '편집'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {routes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Star className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              즐겨찾기가 비어있습니다
            </h3>
            <p className="text-gray-500 mb-6">
              자주 이용하는 경로를 추가해보세요
            </p>
            <button
              onClick={() => navigate('/search')}
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              경로 추가하기
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative"
                >
                  {editMode && (
                    <button
                      onClick={() => handleDelete(route.id)}
                      className="absolute top-3 right-3 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  )}

                  <div
                    onClick={() =>
                      !editMode &&
                      navigate(
                        `/route-detail?from=${route.from.id}&to=${route.to.id}`
                      )
                    }
                    className={`${!editMode && 'cursor-pointer'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-lg font-semibold text-gray-900">
                            {route.name}
                          </span>
                          {editMode && (
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{route.from.name}</span>
                          <span>→</span>
                          <span>{route.to.name}</span>
                        </div>
                      </div>
                      {!editMode && (
                        <div className="text-right">
                          <div
                            className={`text-xs px-3 py-1 rounded-full border ${getCongestionColor(
                              route.currentCongestion
                            )}`}
                          >
                            {getCongestionText(route.currentCongestion)}
                          </div>
                        </div>
                      )}
                    </div>

                    {!editMode && (
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          지금 출발하면
                        </div>
                        <div className="text-lg font-semibold text-blue-600">
                          약 25분
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!editMode && (
              <button
                onClick={() => navigate('/search')}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
                새 경로 추가
              </button>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-around">
          <button
            onClick={() => navigate('/')}
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs">홈</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <Star className="w-6 h-6" />
            <span className="text-xs">즐겨찾기</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
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
          </button>
        </div>
      </div>
    </div>
  );
}
