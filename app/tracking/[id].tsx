import { useLocalSearchParams, useRouter } from "expo-router";
import { MapPin, X } from "lucide-react-native";
import React, { useState } from "react";
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

// 1. 패널이 숨겨진 만큼만 딱 올라오도록 수정
const PANEL_HIDDEN_HEIGHT = SCREEN_HEIGHT * 0.4;
const SNAP_POINTS = {
  MIN: 0,
  MAX: -PANEL_HIDDEN_HEIGHT, // 이제 바닥이 들리지 않습니다!
};

// 2. 실제 2호선 경로 데이터 (건대입구 -> 강남)
const LINE2_STATIONS = [
  "구의",
  "강변",
  "잠실나루",
  "잠실",
  "잠실새내",
  "종합운동장",
  "삼성",
  "선릉",
  "역삼",
];

export default function TrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentStation] = useState(params.startStation || "건대입구");

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
          var map = L.map('map', { zoomControl: false }).setView([37.5404, 127.0692], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
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

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.infoPanel, animatedSheetStyle]}>
          <View style={styles.handleBarContainer}>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.currentStatusBox}>
            <Text style={styles.statusLabel}>현재 위치</Text>
            <View style={styles.stationRow}>
              <Text style={styles.stationNameBig}>{currentStation}</Text>
              <Text style={styles.stationSuffix}>역 진입 중</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
            <Text style={styles.nextInfo}>다음역 성수까지 1분 30초</Text>
          </View>

          <View style={styles.routeListContainer}>
            <Text style={styles.listTitle}>남은 경로</Text>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {/* 출발역 */}
              <View style={styles.stepItem}>
                <View style={styles.stepLineContainer}>
                  <View style={styles.stepDotActive} />
                  <View style={styles.stepLine} />
                </View>
                <Text style={styles.stepTextActive}>
                  {currentStation} (현재)
                </Text>
              </View>

              {/* 중간역 리스트 자동 생성 */}
              {LINE2_STATIONS.map((station, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepLineContainer}>
                    <View style={styles.stepDot} />
                    <View style={styles.stepLine} />
                  </View>
                  <Text style={styles.stepText}>{station}</Text>
                </View>
              ))}

              {/* 도착역 */}
              <View style={styles.stepItem}>
                <View style={styles.stepLineContainer}>
                  <MapPin size={18} color="#DC2626" />
                </View>
                <Text style={styles.stepTextDest}>강남역 (도착)</Text>
              </View>
              <View style={{ height: 150 }} />
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
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 10,
  },
  infoPanel: {
    position: "absolute",
    bottom: -PANEL_HIDDEN_HEIGHT, // 숨겨진 높이만큼 배치
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.85,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 10,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  handleBarContainer: {
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 5,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 2.5,
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
  stationNameBig: { fontSize: 32, fontWeight: "800", color: "#111827" },
  stationSuffix: { fontSize: 18, color: "#4B5563", fontWeight: "600" },
  progressBar: {
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#2563EB" },
  nextInfo: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "700",
    textAlign: "right",
  },
  routeListContainer: { flex: 1 },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  scrollView: { flex: 1 },
  stepItem: { flexDirection: "row", alignItems: "flex-start", height: 55 },
  stepLineContainer: { width: 24, alignItems: "center", marginRight: 12 },
  stepDotActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2563EB",
    zIndex: 2,
    borderWidth: 3,
    borderColor: "#DBEAFE",
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5E7EB",
    zIndex: 2,
  },
  stepLine: {
    width: 2,
    backgroundColor: "#E5E7EB",
    height: "100%",
    position: "absolute",
    top: 12,
  },
  stepTextActive: { fontSize: 17, color: "#2563EB", fontWeight: "800" },
  stepText: { fontSize: 16, color: "#4B5563", fontWeight: "500" },
  stepTextDest: { fontSize: 17, color: "#DC2626", fontWeight: "800" },
});
