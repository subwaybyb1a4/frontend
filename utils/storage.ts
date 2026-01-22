import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "favorites_routes";

// 즐겨찾기 목록 불러오기
export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

// 즐겨찾기 추가하기
export const addFavorite = async (route: any) => {
  try {
    const current = await getFavorites();
    // 이미 있는지 확인 (중복 방지)
    const exists = current.find((r: any) => r.id === route.id);
    if (exists) return current; // 이미 있으면 그대로 리턴

    const updated = [...current, route];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return [];
  }
};

// 즐겨찾기 삭제하기
export const removeFavorite = async (routeId: string) => {
  try {
    const current = await getFavorites();
    const updated = current.filter((r: any) => r.id !== routeId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return [];
  }
};
