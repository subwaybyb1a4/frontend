import { useLocalSearchParams, useRouter } from "expo-router";
import { MapPin, Navigation, X } from "lucide-react-native";
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

const { width } = Dimensions.get("window");

export default function TrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); // 넘겨받은 경로 데이터

  // 가짜 진행 상황 (시간 지나면 다음 역으로 넘어가는 척)
  const [currentStation, setCurrentStation] = useState("건대입구");
  const [nextStation, setNextStation] = useState("성수");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. 지도 영역 (상단 60%) */}
      <View style={styles.mapContainer}>
        {/* 실제 지도가 들어갈 자리 (임시 디자인) */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapRoad} />
          <View style={styles.mapRoadVertical} />

          {/* 내 위치 마커 (지도 중앙) */}
          <View style={styles.myLocationMarker}>
            <View style={styles.markerCircle}>
              <Navigation size={24} color="white" fill="white" />
            </View>
            <View style={styles.markerPulse} />
          </View>

          <Text style={styles.mapText}>지도 뷰 (Map View)</Text>
        </View>

        {/* 안내 종료 버튼 (지도 위에 둥둥 떠있음) */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <X size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* 2. 하단 정보 패널 (하단 40%) */}
      <View style={styles.infoPanel}>
        {/* 핸들바 (위로 드래그 가능한 느낌) */}
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>

        {/* 2-1. 현재 위치 (어디 역인지) */}
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

        {/* 2-2. 남은 경로 리스트 */}
        <View style={styles.routeListContainer}>
          <Text style={styles.listTitle}>남은 경로</Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* 지나온 역 (흐리게) */}
            <View style={styles.stepItem}>
              <View style={styles.stepLineContainer}>
                <View
                  style={[styles.stepDot, { backgroundColor: "#E5E7EB" }]}
                />
                <View
                  style={[styles.stepLine, { backgroundColor: "#E5E7EB" }]}
                />
              </View>
              <Text
                style={[
                  styles.stepText,
                  { color: "#9CA3AF", textDecorationLine: "line-through" },
                ]}
              >
                구의역
              </Text>
            </View>

            {/* 현재 역 (강조) */}
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
                건대입구역 (현재)
              </Text>
            </View>

            {/* 다음 역들 */}
            <View style={styles.stepItem}>
              <View style={styles.stepLineContainer}>
                <View
                  style={[
                    styles.stepDot,
                    {
                      borderColor: "#2563EB",
                      borderWidth: 2,
                      backgroundColor: "white",
                    },
                  ]}
                />
                <View
                  style={[styles.stepLine, { backgroundColor: "#E5E7EB" }]}
                />
              </View>
              <Text style={styles.stepText}>성수역</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepLineContainer}>
                <View
                  style={[
                    styles.stepDot,
                    {
                      borderColor: "#9CA3AF",
                      borderWidth: 2,
                      backgroundColor: "white",
                    },
                  ]}
                />
                <View
                  style={[styles.stepLine, { backgroundColor: "#E5E7EB" }]}
                />
              </View>
              <Text style={styles.stepText}>뚝섬역</Text>
            </View>

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

            {/* 여백 확보용 */}
            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E7EB" }, // 지도 배경색 느낌

  // 1. 지도 영역
  mapContainer: { flex: 1.5, position: "relative" }, // 상단 비율 1.5
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mapText: { marginTop: 10, color: "#9CA3AF", fontWeight: "600" },
  // 지도 꾸미기용 (도로 느낌)
  mapRoad: {
    position: "absolute",
    width: "200%",
    height: 20,
    backgroundColor: "white",
    transform: [{ rotate: "-30deg" }],
  },
  mapRoadVertical: {
    position: "absolute",
    width: 20,
    height: "200%",
    backgroundColor: "white",
    left: "30%",
  },

  // 내 위치 마커
  myLocationMarker: { alignItems: "center", justifyContent: "center" },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // 2. 하단 정보 패널
  infoPanel: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  handleBarContainer: { alignItems: "center", marginBottom: 20 },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },

  // 2-1. 현재 위치 박스
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

  // 2-2. 남은 경로 리스트
  routeListContainer: { flex: 1 },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  scrollView: { flex: 1 },

  stepItem: { flexDirection: "row", alignItems: "flex-start", height: 44 }, // 각 스텝 높이
  stepLineContainer: { width: 20, alignItems: "center", marginRight: 12 },
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
