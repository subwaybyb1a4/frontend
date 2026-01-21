import { useRouter } from "expo-router";
import { ChevronRight, Edit, Plus, Star, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. 가짜 데이터 (에러 방지용)
const initialRoutes = [
  {
    id: "1",
    name: "출근길 (최적)",
    from: "건대입구",
    to: "강남",
    congestion: "low",
  },
  {
    id: "2",
    name: "학교 가는 길",
    from: "잠실",
    to: "건대입구",
    congestion: "medium",
  },
];

// 2. 헬퍼 함수
const getCongestionInfo = (level: string) => {
  switch (level) {
    case "low":
      return { text: "여유", color: "#15803D", bg: "#DCFCE7" };
    case "medium":
      return { text: "보통", color: "#A16207", bg: "#FEF9C3" };
    case "high":
      return { text: "혼잡", color: "#B91C1C", bg: "#FEE2E2" };
    default:
      return { text: "정보없음", color: "#4B5563", bg: "#F3F4F6" };
  }
};

export default function FavoritesScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState(initialRoutes);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = (id: string) => {
    Alert.alert("삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => setRoutes(routes.filter((r) => r.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>즐겨찾기</Text>
        <TouchableOpacity
          onPress={() => setEditMode(!editMode)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {editMode ? "완료" : "편집"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {routes.length === 0 ? (
          // 즐겨찾기 없을 때
          <View style={styles.emptyContainer}>
            <Star size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>즐겨찾기가 비어있습니다</Text>
            <Text style={styles.emptySubtitle}>
              자주 이용하는 경로를 추가해보세요
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/search")}
              style={styles.addButtonPrimary}
            >
              <Plus size={20} color="white" />
              <Text style={styles.addButtonPrimaryText}>경로 추가하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // 즐겨찾기 리스트
          <View style={styles.listContainer}>
            {routes.map((route) => {
              const congestion = getCongestionInfo(route.congestion);
              return (
                <View key={route.id} style={styles.card}>
                  {/* 삭제 버튼 (편집 모드) */}
                  {editMode && (
                    <TouchableOpacity
                      onPress={() => handleDelete(route.id)}
                      style={styles.deleteButton}
                    >
                      <Trash2 size={20} color="#DC2626" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    disabled={editMode}
                    activeOpacity={0.7}
                    onPress={() =>
                      router.push({
                        pathname: "/results",
                        params: { from: route.from, to: route.to },
                      })
                    }
                  >
                    <View style={styles.cardHeader}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.titleRow}>
                          <Star
                            size={18}
                            color="#F59E0B"
                            fill="#F59E0B"
                            style={{ marginRight: 6 }}
                          />
                          <Text style={styles.cardTitle}>{route.name}</Text>
                          {editMode && (
                            <Edit
                              size={14}
                              color="#9CA3AF"
                              style={{ marginLeft: 6 }}
                            />
                          )}
                        </View>
                        <View style={styles.routeRow}>
                          <Text style={styles.stationText}>{route.from}</Text>
                          <ChevronRight size={14} color="#9CA3AF" />
                          <Text style={styles.stationText}>{route.to}</Text>
                        </View>
                      </View>

                      {/* 혼잡도 뱃지 (편집 모드 아닐 때만) */}
                      {!editMode && (
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: congestion.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.badgeText,
                              { color: congestion.color },
                            ]}
                          >
                            {congestion.text}
                          </Text>
                        </View>
                      )}
                    </View>

                    {!editMode && (
                      <View style={styles.cardFooter}>
                        <Text style={styles.footerLabel}>지금 출발하면</Text>
                        <Text style={styles.footerValue}>약 25분</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}

            {/* 하단 추가 버튼 */}
            {!editMode && (
              <TouchableOpacity
                onPress={() => router.push("/search")}
                style={styles.addButtonSecondary}
              >
                <Plus size={20} color="#374151" />
                <Text style={styles.addButtonSecondaryText}>새 경로 추가</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#111827" },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
  },
  editButtonText: { color: "#2563EB", fontWeight: "600", fontSize: 14 },
  content: { flex: 1, padding: 20 },
  emptyContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: { color: "#6B7280", marginBottom: 24, textAlign: "center" },
  addButtonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addButtonPrimaryText: { color: "white", fontWeight: "700", fontSize: 16 },
  listContainer: { gap: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    zIndex: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  routeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  stationText: { fontSize: 14, color: "#6B7280" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: "700" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F9FAFB",
  },
  footerLabel: { fontSize: 14, color: "#6B7280" },
  footerValue: { fontSize: 16, fontWeight: "700", color: "#2563EB" },
  addButtonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
  },
  addButtonSecondaryText: { color: "#374151", fontWeight: "600", fontSize: 16 },
});
