import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Target, Calendar, Clock } from 'lucide-react';
import { stations } from '@/app/data/mockData';

export default function RouteSearch() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchMode, setSearchMode] = useState<'from' | 'to' | null>(null);
  const [timeMode, setTimeMode] = useState<'now' | 'scheduled'>('now');
  const [scheduledTime, setScheduledTime] = useState('');

  const filteredStations =
    searchMode === 'from'
      ? stations.filter((s) => s.name.includes(from))
      : stations.filter((s) => s.name.includes(to));

  const handleStationSelect = (stationName: string) => {
    if (searchMode === 'from') {
      setFrom(stationName);
      setSearchMode(null);
    } else if (searchMode === 'to') {
      setTo(stationName);
      setSearchMode(null);
    }
  };

  const handleSearch = () => {
    if (from && to) {
      navigate(`/route-results?from=${from}&to=${to}&time=${timeMode}`);
    }
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
          <h1 className="text-xl font-semibold">경로 검색</h1>
        </div>
      </div>

      {/* Search Inputs */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
          {/* From */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              출발역
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setSearchMode('from');
              }}
              onFocus={() => setSearchMode('from')}
              placeholder="출발역을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Separator */}
          <div className="flex justify-center">
            <div className="w-px h-6 bg-gray-300" />
          </div>

          {/* To */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              도착역
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setSearchMode('to');
              }}
              onFocus={() => setSearchMode('to')}
              placeholder="도착역을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Time Options */}
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setTimeMode('now')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                timeMode === 'now'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              지금 출발
            </button>
            <button
              onClick={() => setTimeMode('scheduled')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                timeMode === 'scheduled'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              시간 예약
            </button>
          </div>

          {timeMode === 'scheduled' && (
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Station Suggestions */}
        {searchMode && (
          <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => handleStationSelect(station.name)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-gray-900">
                    {station.name}
                  </div>
                  <div className="text-sm text-gray-500">{station.line}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!from || !to}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all ${
            from && to
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          경로 검색
        </button>
      </div>
    </div>
  );
}
