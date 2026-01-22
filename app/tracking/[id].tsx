import { useRouter } from "expo-router";
import { MapPin, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { WebView } from "react-native-webview";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const PANEL_HIDDEN_HEIGHT = SCREEN_HEIGHT * 0.4;
const SNAP_POINTS = { MIN: 0, MAX: -PANEL_HIDDEN_HEIGHT };

// 1. 전체 경로 데이터 통합 (출발부터 도착까지)
const FULL_ROUTE = [
  "건대입구",
  "구의",
  "강변",
  "잠실나루",
  "잠실",
  "잠실새내",
  "종합운동장",
  "삼성",
  "선릉",
  "역삼",
  "강남",
];

export default function TrackingScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  // 2. 현재 역의 위치를 관리하는 핵심 상태 (Index)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. [시뮬레이션] 5초마다 다음 역으로 이동
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < FULL_ROUTE.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 현재 및 다음 역 계산
  const currentStation = FULL_ROUTE[currentIndex];
  const nextStation = FULL_ROUTE[currentIndex + 1] || "목적지";
  const progress = (currentIndex / (FULL_ROUTE.length - 1)) * 100;

  // 바텀시트 애니메이션 로직
  const translateY = useSharedValue(0);
  const context = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      const nextY = context.value + event.translationY;
      translateY.value = Math.max(
        Math.min(nextY, SNAP_POINTS.MIN),
        SNAP_POINTS.MAX,
      );
    })
    .onEnd((event) => {
      if (event.velocityY < -500 || translateY.value < SNAP_POINTS.MAX / 2) {
        translateY.value = withSpring(SNAP_POINTS.MAX);
      } else {
        translateY.value = withSpring(SNAP_POINTS.MIN);
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const mapHtml = `
    <html>
      <body style="margin:0;"><div id="map" style="height:100vh; width:100vw;"></div>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          var map = L.map('map', { zoomControl: false }).setView([37.5404, 127.0692], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 지도 영역 */}
      <View style={styles.mapContainer}>
        <WebView
          source={{ html: mapHtml }}
          style={StyleSheet.absoluteFillObject}
          scrollEnabled={false}
        />
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <X size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* 정보 패널 (바텀시트) */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.infoPanel, animatedSheetStyle]}>
          <View style={styles.handleBarContainer}>
            <View style={styles.handleBar} />
          </View>

          {/* 상단 현재 상태 박스: 실시간 반영 */}
          <View style={styles.currentStatusBox}>
            <Text style={styles.statusLabel}>현재 실시간 위치</Text>
            <View style={styles.stationRow}>
              <Text style={styles.stationNameBig}>{currentStation}</Text>
              <Text style={styles.stationSuffix}>
                {currentIndex === FULL_ROUTE.length - 1 ? "도착" : "역 진입 중"}
              </Text>
            </View>

            {/* 실시간 진행 바 */}
            <View style={styles.progressBar}>
              <Animated.View
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>

            <View style={styles.nextInfoRow}>
              <Text style={styles.nextInfoText}>다음역: {nextStation}</Text>
              <Text style={styles.timeText}>약 2분 남음</Text>
            </View>
          </View>

          {/* 남은 경로 리스트: 실시간 하이라이트 */}
          <View style={styles.routeListContainer}>
            <Text style={styles.listTitle}>운행 경로</Text>
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
            >
              {FULL_ROUTE.map((station, index) => {
                const isCurrent = index === currentIndex;
                const isPassed = index < currentIndex;
                const isLast = index === FULL_ROUTE.length - 1;

                return (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.stepLineContainer}>
                      {/* 아이콘: 도착역은 핀, 나머지는 동그라미 */}
                      {isLast ? (
                        <MapPin
                          size={20}
                          color={isCurrent ? "#DC2626" : "#D1D5DB"}
                          fill={isCurrent ? "#DC2626" : "transparent"}
                        />
                      ) : (
                        <View
                          style={[
                            styles.stepDot,
                            isCurrent && styles.stepDotActive,
                            isPassed && styles.stepDotPassed,
                          ]}
                        />
                      )}
                      {/* 연결 선 */}
                      {!isLast && (
                        <View
                          style={[
                            styles.stepLine,
                            isPassed && styles.stepLinePassed,
                          ]}
                        />
                      )}
                    </View>

                    {/* 역 이름 텍스트: 상태에 따라 스타일 변경 */}
                    <Text
                      style={[
                        styles.stepText,
                        isCurrent && styles.stepTextActive,
                        isPassed && styles.stepTextPassed,
                      ]}
                    >
                      {station} {isCurrent ? "(현재)" : ""}
                    </Text>
                  </View>
                );
              })}
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  mapContainer: { flex: 1 },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  infoPanel: {
    position: "absolute",
    bottom: -PANEL_HIDDEN_HEIGHT,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.85,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    elevation: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  handleBarContainer: { alignItems: "center", paddingVertical: 12 },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
  },
  currentStatusBox: { marginBottom: 30 },
  statusLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 15,
  },
  stationNameBig: { fontSize: 36, fontWeight: "900", color: "#111827" },
  stationSuffix: { fontSize: 18, color: "#3B82F6", fontWeight: "700" },
  progressBar: {
    height: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#3B82F6" },
  nextInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextInfoText: { fontSize: 15, color: "#4B5563", fontWeight: "600" },
  timeText: { fontSize: 15, color: "#3B82F6", fontWeight: "700" },
  routeListContainer: { flex: 1 },
  listTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 20,
  },
  stepItem: { flexDirection: "row", alignItems: "flex-start", height: 60 },
  stepLineContainer: { width: 30, alignItems: "center", marginRight: 15 },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    zIndex: 2,
    marginTop: 4,
  },
  stepDotActive: {
    backgroundColor: "#3B82F6",
    borderWidth: 3,
    borderColor: "#DBEAFE",
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 2,
  },
  stepDotPassed: { backgroundColor: "#93C5FD" },
  stepLine: {
    width: 2,
    backgroundColor: "#F3F4F6",
    height: "100%",
    position: "absolute",
    top: 15,
  },
  stepLinePassed: { backgroundColor: "#DBEAFE" },
  stepText: { fontSize: 16, color: "#9CA3AF", fontWeight: "500" },
  stepTextActive: { fontSize: 18, color: "#1D4ED8", fontWeight: "800" },
  stepTextPassed: { color: "#4B5563", fontWeight: "600" },
});
