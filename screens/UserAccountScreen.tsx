import { StyleSheet, Text, View } from "react-native";
import Account from "../assets/icons/account.svg";
import { useSelector } from "react-redux";
import { authStoreState } from "../store/authStore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserInfo } from "../http/queries";

export default function UserAccountScreen() {
  const authStore: authStoreState = useSelector(
    (state: { authStore: authStoreState }) => state.authStore
  );
  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ username: string }> = useQuery({
    queryKey: ["userInfo", authStore.userId],
    queryFn: () => getUserInfo(authStore.token, authStore.userId),
  });

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    content = (
      <View>
        <Text>Error: {(error as Error).message}</Text>
      </View>
    );
  }
  if (data) {
    content = (
      <View style={styles.container}>
        <View style={styles.infoConatainer}>
          <View style={styles.avatarContainer}>
            <Account fill={"#edf1f3"} />
          </View>
        </View>
        <Text style={styles.username}>{data.username}</Text>
      </View>
    );
  }

  return <>{content}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#1b2045",
  },
  infoConatainer: {
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "#434ea8",
    padding: 20,
    borderRadius: 100,
    height: 100,
    width: 100,
  },
  username: {
    color: "#edf1f3",
    fontSize: 20,
    fontWeight: "bold",
  },
});
