import { useLocalSearchParams, useRouter } from "expo-router";
import { MapPin, Navigation, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
   Dimensions,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
// 1. WebView 임포트
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

export default function TrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 1. 초기값을 params에서 받아오거나 기본값으로 설정
  const [currentStation, setCurrentStation] = useState(
    params.startStation || "건대입구",
  );
  const [nextStation, setNextStation] = useState(params.nextStation || "성수");
  const [progress, setProgress] = useState("60%"); // 진행바 상태 추가

  // 2. 실시간 시뮬레이션 효과 추가
  useEffect(() => {
    // 5초 뒤에 역 정보를 업데이트합니다.
    const timer = setTimeout(() => {
      setCurrentStation("성수");
      setNextStation("뚝섬");
      setProgress("20%"); // 다음 역으로 넘어갔으니 진행바 초기화 시뮬레이션
    }, 5000);

    return () => clearTimeout(timer); // 메모리 누수 방지
  }, []);

  // 2. 지도를 띄울 간단한 HTML 코드 (OpenStreetMap 사용)
  const mapHtml = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
          .leaflet-control-attribution { display: none; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // 건대입구역 좌표 설정
          var map = L.map('map', { zoomControl: false }).setView([37.5404, 127.0692], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. 지도 영역 (WebView로 실제 지도 구현).tsx] */}
      <View style={styles.mapContainer}>
        <WebView
          source={{ html: mapHtml }}
          style={StyleSheet.absoluteFillObject}
          scrollEnabled={false} // 지도 위에서 스크롤 방지 (선택 사항)
        />

        {/* 기존의 내 위치 마커를 지도 위에 겹쳐서 표시.tsx] */}
        <View
          style={[
            styles.myLocationMarker,
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              marginLeft: -24,
              marginTop: -24,
            },
          ]}
        >
          <View style={styles.markerCircle}>
            <Navigation size={24} color="white" fill="white" />
          </View>
          <View style={styles.markerPulse} />
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <X size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* 2. 하단 정보 패널 (기존 디자인 유지).tsx] */}
      <View style={styles.infoPanel}>
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>

        <View style={styles.currentStatusBox}>
          <Text style={styles.statusLabel}>현재 위치</Text>
          <View style={styles.stationRow}>
            <Text style={styles.stationNameBig}>{currentStation}</Text>
            <Text style={styles.stationSuffix}>역 진입 중...</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
          <Text style={styles.nextInfo}>다음역 {nextStation}까지 1분 30초</Text>
        </View>

        <View style={styles.routeListContainer}>
          <Text style={styles.listTitle}>남은 경로</Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* 현재 역 표시.tsx] */}
            <View style={styles.stepItem}>
              <View style={styles.stepLineContainer}>
                <View
                  style={[
                    styles.stepDot,
                    {
                      backgroundColor: "#2563EB",
                      width: 14,
                      height: 14,
                      left: -1,
                    },
                  ]}
                />
                <View
                  style={[styles.stepLine, { backgroundColor: "#2563EB" }]}
                />
              </View>
              <Text
                style={[
                  styles.stepText,
                  { color: "#2563EB", fontWeight: "700" },
                ]}
              >
                {currentStation}역 (현재)
              </Text>
            </View>

            {/* 도착역 표시.tsx] */}
            <View style={styles.stepItem}>
              <View style={styles.stepLineContainer}>
                <MapPin size={16} color="#DC2626" style={{ marginLeft: -2 }} />
              </View>
              <Text
                style={[
                  styles.stepText,
                  { color: "#DC2626", fontWeight: "700" },
                ]}
              >
                강남역 (도착)
              </Text>
            </View>
            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

// 기존 스타일 유지.tsx]
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  mapContainer: { flex: 1.5, position: "relative" },
  myLocationMarker: { zIndex: 5 },
  markerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  markerPulse: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    zIndex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    zIndex: 10,
  },
  infoPanel: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 10,
    elevation: 10,
  },
  handleBarContainer: { alignItems: "center", marginBottom: 20 },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
  currentStatusBox: { marginBottom: 24 },
  statusLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 4,
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 12,
  },
  stationNameBig: { fontSize: 28, fontWeight: "800", color: "#111827" },
  stationSuffix: { fontSize: 18, color: "#4B5563", fontWeight: "500" },
  progressBar: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#2563EB", borderRadius: 3 },
  nextInfo: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
    textAlign: "right",
  },
  routeListContainer: { flex: 1 },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  scrollView: { flex: 1 },
  stepItem: { flexDirection: "row", alignItems: "flex-start", height: 44 },
  stepLineContainer: { width: 20, alignItems: "center", marginRight: 12 },
  stepDot: { width: 10, height: 10, borderRadius: 5, zIndex: 2 },
  stepLine: {
    width: 2,
    backgroundColor: "#E5E7EB",
    height: "100%",
    position: "absolute",
    top: 10,
    zIndex: 1,
  },
  stepText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
    marginTop: -4,
  },
});
