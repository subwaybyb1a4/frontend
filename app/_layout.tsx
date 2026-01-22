/**
 * 루트 레이아웃
 */
import { Stack } from "expo-router";
// import "../global.css"; // 스타일 파일 불러오기

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* (tabs) 폴더를 메인 화면으로 지정 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* 검색 화면 등 다른 화면들은 Stack으로 쌓임 */}
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  );
}
