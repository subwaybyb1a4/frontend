import { Tabs } from "expo-router";
import { Home, Settings, Star } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563EB", // 활성 색상: 파랑
        tabBarInactiveTintColor: "#9CA3AF", // 비활성 색상: 회색
        headerShown: false,

        // ✨ 여기가 핵심! 탭바 스타일 수정 ✨
        tabBarStyle: {
          height: 65, // 높이를 조금 더 키워서 여유 공간 확보
          paddingBottom: 10, // 아래쪽 여백 추가
          paddingTop: 10, // 위쪽 여백 추가
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 10, // 안드로이드 그림자
          shadowColor: "#000", // iOS 그림자
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        // ✨ 아이콘과 글자 사이 간격 벌리기 ✨
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4, // 아이콘과의 간격 (이걸로 조절합니다!)
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "즐겨찾기",
          tabBarIcon: ({ color }) => <Star size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />

      {/* 마이페이지 숨김 */}
      <Tabs.Screen
        name="mypage"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
