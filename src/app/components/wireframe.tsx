export default function Wireframe() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Wireframe</h1>
          <p className="text-sm text-gray-500">편한 지하철 앱 구조도 2024</p>
        </div>

        {/* Wireframe Grid */}
        <div className="relative">
          {/* SVG for connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {/* Home to Search */}
            <path
              d="M 200 150 L 350 150"
              stroke="#84cc16"
              strokeWidth="2"
              fill="none"
            />

            {/* Search to Results */}
            <path
              d="M 550 150 L 700 150"
              stroke="#84cc16"
              strokeWidth="2"
              fill="none"
            />

            {/* Results to Detail - Fastest */}
            <path
              d="M 900 120 L 1050 120"
              stroke="#84cc16"
              strokeWidth="2"
              fill="none"
            />

            {/* Results to Detail - Easy */}
            <path
              d="M 900 180 L 1050 180"
              stroke="#84cc16"
              strokeWidth="2"
              fill="none"
            />

            {/* Home to Favorites */}
            <path
              d="M 200 350 L 350 350"
              stroke="#84cc16"
              strokeWidth="2"
              fill="none"
            />

            {/* Home to Settings */}
            <path
              d="M 200 550 L 350 550"
              stroke="#84cc16"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* First Row */}
          <div className="grid grid-cols-5 gap-8 mb-8 relative" style={{ zIndex: 1 }}>
            {/* Home Screen */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Home</p>
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300 aspect-[9/16]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-6 h-1 bg-gray-400 rounded" />
                    <div className="w-6 h-1 bg-gray-400 rounded" />
                  </div>
                </div>

                {/* Title */}
                <div className="w-24 h-3 bg-gray-900 rounded mb-6" />

                {/* Search Bar */}
                <div className="bg-white rounded-lg p-3 mb-6 shadow-sm">
                  <div className="w-full h-2 bg-gray-300 rounded" />
                </div>

                {/* Favorites */}
                <div className="space-y-2 mb-6">
                  <div className="w-16 h-2 bg-gray-900 rounded mb-3" />
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="w-20 h-2 bg-gray-400 rounded mb-2" />
                    <div className="w-32 h-1.5 bg-gray-300 rounded" />
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="w-20 h-2 bg-gray-400 rounded mb-2" />
                    <div className="w-32 h-1.5 bg-gray-300 rounded" />
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-around bg-white rounded-lg p-2 shadow-sm">
                    <div className="w-6 h-6 bg-gray-900 rounded" />
                    <div className="w-6 h-6 bg-gray-300 rounded" />
                    <div className="w-6 h-6 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Route Search */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Route Search</p>
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300 aspect-[9/16]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-gray-900 rounded" />
                  <div className="w-20 h-2 bg-gray-900 rounded" />
                </div>

                {/* From Input */}
                <div className="bg-white rounded-lg p-4 mb-2">
                  <div className="w-12 h-1.5 bg-gray-400 rounded mb-2" />
                  <div className="w-full h-2.5 bg-gray-900 rounded" />
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-gray-400" />
                </div>

                {/* To Input */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="w-12 h-1.5 bg-gray-400 rounded mb-2" />
                  <div className="w-full h-2.5 bg-gray-900 rounded" />
                </div>

                {/* Time Options */}
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 bg-gray-900 rounded-lg h-8" />
                  <div className="flex-1 bg-gray-300 rounded-lg h-8" />
                </div>

                {/* Search Button */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gray-900 rounded-lg h-12" />
                </div>
              </div>
            </div>

            {/* Route Results - 3 Options */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Route Results</p>
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-lime-400 aspect-[9/16] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gray-900 rounded" />
                  <div>
                    <div className="w-24 h-1.5 bg-gray-400 rounded mb-1" />
                    <div className="w-16 h-1 bg-gray-300 rounded" />
                  </div>
                </div>

                {/* Option 1: Fastest */}
                <div className="bg-white rounded-xl p-3 mb-3 border-2 border-orange-400">
                  <div className="w-16 h-2 bg-orange-400 rounded-full mb-2" />
                  <div className="w-12 h-6 bg-gray-900 rounded mb-2" />
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                    <div className="w-20 h-1.5 bg-gray-200 rounded" />
                  </div>
                </div>

                {/* Option 2: Comfort */}
                <div className="bg-white rounded-xl p-3 mb-3 border-2 border-green-400 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold">
                    추천
                  </div>
                  <div className="w-16 h-2 bg-green-500 rounded-full mb-2" />
                  <div className="w-12 h-6 bg-gray-900 rounded mb-2" />
                  <div className="bg-green-50 rounded p-2 mb-2">
                    <div className="w-full h-1 bg-green-300 rounded" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                  </div>
                </div>

                {/* Option 3: Easy Transfer */}
                <div className="bg-white rounded-xl p-3 border-2 border-yellow-400">
                  <div className="w-16 h-2 bg-yellow-400 rounded-full mb-2" />
                  <div className="w-12 h-6 bg-gray-900 rounded mb-2" />
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                    <div className="w-20 h-1.5 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Route Detail */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Route Detail</p>
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300 aspect-[9/16]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gray-900 rounded" />
                  <div className="w-20 h-2 bg-gray-900 rounded" />
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg p-4 mb-4">
                  <div className="w-16 h-8 bg-white rounded mb-2" />
                  <div className="w-24 h-1.5 bg-white/70 rounded" />
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-4">
                  <div className="flex-1 bg-gray-900 rounded h-6" />
                  <div className="flex-1 bg-gray-300 rounded h-6" />
                  <div className="flex-1 bg-gray-300 rounded h-6" />
                </div>

                {/* Content - Comfort Analysis */}
                <div className="bg-white rounded-lg p-3 mb-3">
                  <div className="w-20 h-2 bg-gray-900 rounded mb-3" />
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-3" />
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-1.5 bg-gray-300 rounded" />
                      <div className="w-8 h-2 bg-gray-900 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-1.5 bg-gray-300 rounded" />
                      <div className="w-8 h-2 bg-gray-900 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-1.5 bg-gray-300 rounded" />
                      <div className="w-8 h-2 bg-gray-900 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty space */}
            <div></div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-5 gap-8 relative" style={{ zIndex: 1 }}>
            {/* Empty */}
            <div></div>

            {/* Empty */}
            <div></div>

            {/* Favorites */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Favorites</p>
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300 aspect-[9/16]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-900 rounded" />
                    <div className="w-20 h-2 bg-gray-900 rounded" />
                  </div>
                  <div className="w-10 h-2 bg-gray-400 rounded" />
                </div>

                {/* Favorite Items */}
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-16 h-2 bg-gray-900 rounded" />
                      <div className="w-6 h-6 bg-gray-300 rounded" />
                    </div>
                    <div className="w-24 h-1.5 bg-gray-400 rounded mb-1" />
                    <div className="w-12 h-1 bg-gray-300 rounded" />
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-16 h-2 bg-gray-900 rounded" />
                      <div className="w-6 h-6 bg-gray-300 rounded" />
                    </div>
                    <div className="w-24 h-1.5 bg-gray-400 rounded mb-1" />
                    <div className="w-12 h-1 bg-gray-300 rounded" />
                  </div>
                </div>

                {/* Add Button */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gray-300 rounded-lg h-10" />
                </div>
              </div>
            </div>

            {/* Settings / MY */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Settings (MY)</p>
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300 aspect-[9/16]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-gray-900 rounded" />
                  <div className="w-24 h-2 bg-gray-900 rounded" />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-lg p-3 mb-6">
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-blue-300 rounded" />
                    <div className="w-full h-1.5 bg-blue-300 rounded" />
                    <div className="w-20 h-1.5 bg-blue-300 rounded" />
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-6">
                  {/* Congestion */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-2 bg-gray-900 rounded" />
                      <div className="w-8 h-3 bg-gray-900 rounded" />
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded-full">
                      <div className="w-3/4 h-full bg-red-500 rounded-full" />
                    </div>
                  </div>

                  {/* Transfer */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-2 bg-gray-900 rounded" />
                      <div className="w-8 h-3 bg-gray-900 rounded" />
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded-full">
                      <div className="w-1/2 h-full bg-yellow-500 rounded-full" />
                    </div>
                  </div>

                  {/* Walking */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-2 bg-gray-900 rounded" />
                      <div className="w-8 h-3 bg-gray-900 rounded" />
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded-full">
                      <div className="w-2/3 h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <div className="flex-1 bg-gray-300 rounded-lg h-10" />
                  <div className="flex-1 bg-gray-900 rounded-lg h-10" />
                </div>
              </div>
            </div>

            {/* Empty */}
            <div></div>
          </div>

          {/* Connection Labels */}
          <div className="absolute" style={{ top: '135px', left: '270px', zIndex: 2 }}>
            <div className="text-[10px] text-lime-600 font-medium">Search</div>
          </div>
          <div className="absolute" style={{ top: '135px', left: '620px', zIndex: 2 }}>
            <div className="text-[10px] text-lime-600 font-medium">Results</div>
          </div>
          <div className="absolute" style={{ top: '105px', left: '970px', zIndex: 2 }}>
            <div className="text-[10px] text-lime-600 font-medium">Detail</div>
          </div>
          <div className="absolute" style={{ top: '335px', left: '270px', zIndex: 2 }}>
            <div className="text-[10px] text-lime-600 font-medium">View</div>
          </div>
          <div className="absolute" style={{ top: '535px', left: '270px', zIndex: 2 }}>
            <div className="text-[10px] text-lime-600 font-medium">Configure</div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex gap-6 justify-center text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-orange-400 rounded" />
            <span>⚡ 최단 시간</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-400 rounded" />
            <span>😌 시간부자 (추천)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-yellow-400 rounded" />
            <span>👣 최소 걸음</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-lime-500" />
            <span>User Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
