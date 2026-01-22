import { useRouter } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Search,
  Target
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

// 가짜 데이터 (에러 방지용)
const stations = [
  { id: 1, name: "강남", line: "2호선" },
  { id: 2, name: "건대입구", line: "2호선" },
  { id: 3, name: "잠실", line: "2호선" },
  { id: 4, name: "홍대입구", line: "2호선" },
  { id: 5, name: "성수", line: "2호선" },
];

export default function SearchScreen() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchMode, setSearchMode] = useState<"from" | "to" | null>(null);

  // 검색 필터링
  const filteredStations =
    searchMode === "from"
      ? stations.filter((s) => s.name.includes(from))
      : stations.filter((s) => s.name.includes(to));

  const handleStationSelect = (stationName: string) => {
    if (searchMode === "from") {
      setFrom(stationName);
      setSearchMode(null);
    } else if (searchMode === "to") {
      setTo(stationName);
      setSearchMode(null);
    }
    Keyboard.dismiss();
  };

  const handleSearch = () => {
    if (from && to) {
      router.push({
        pathname: "/results",
        params: { from, to },
      });
    }
  };

  const handleDismiss = () => {
    if (from && to) {
      handleSearch();
    } else {
      Keyboard.dismiss();
      setSearchMode(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>경로 검색</Text>
      </View>

      <View style={styles.content}>
        {/* 입력창 카드 */}
        <View style={styles.inputCard}>
          {/* 출발역 */}
          <View style={styles.inputRow}>
            <View style={styles.iconContainer}>
              <MapPin size={18} color="#3B82F6" />
            </View>
            <TextInput
              value={from}
              onChangeText={(text) => {
                setFrom(text);
                setSearchMode("from");
              }}
              onFocus={() => setSearchMode("from")}
              onSubmitEditing={handleDismiss}
              returnKeyType="done"
              placeholder="출발역 입력"
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.divider} />

          {/* 도착역 */}
          <View style={styles.inputRow}>
            <View style={styles.iconContainer}>
              <Target size={18} color="#EF4444" />
            </View>
            <TextInput
              value={to}
              onChangeText={(text) => {
                setTo(text);
                setSearchMode("to");
              }}
              onFocus={() => setSearchMode("to")}
              onSubmitEditing={handleDismiss}
              returnKeyType="search"
              placeholder="도착역 입력"
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* 자동완성 목록 */}
        {searchMode && (
          <View style={styles.suggestionList}>
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <TouchableOpacity
                  key={station.id}
                  onPress={() => handleStationSelect(station.name)}
                  style={styles.suggestionItem}
                >
                  <Search
                    size={16}
                    color="#9CA3AF"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.stationName}>{station.name}</Text>
                  <Text style={styles.lineBadge}>{station.line}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* 하단 검색 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleSearch}
          disabled={!from || !to}
          style={[styles.searchButton, (!from || !to) && styles.disabledButton]}
        >
          <Text style={styles.searchButtonText}>경로 검색하기</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: { padding: 8, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  content: { flex: 1, padding: 20 },
  inputCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputRow: { flexDirection: "row", alignItems: "center", padding: 8 },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginRight: 12,
  },
  input: { flex: 1, fontSize: 16, color: "#111827", height: 40 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginLeft: 52 },
  suggestionList: {
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 4,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  stationName: { fontSize: 16, color: "#1F2937", flex: 1 },
  lineBadge: {
    fontSize: 12,
    color: "#15803D",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: "600",
  },
  emptyState: { padding: 20, alignItems: "center" },
  emptyText: { color: "#9CA3AF" },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  searchButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: { backgroundColor: "#E5E7EB", shadowOpacity: 0 },
  searchButtonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
