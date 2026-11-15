import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card, FeaturedCard } from "../../../../components/Cards";
import Filters from "../../../../components/Filters";
import NoResults from "../../../../components/NoResults";
import Search from "../../../../components/Search";
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import { getLatestProperties, getProperties } from "../../../../lib/appwrite";
import { useGlobalContext } from "../../../../lib/global-provider";
import { useAppwrite } from "../../../../lib/useAppwrite";

const Home = () => {
  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{
    query?: string;
    filter?: string;
  }>();

  // Fetch latest properties for the Featured section.
  const {
    data: latestProperties,
    loading: latestPropertiesLoading,
  } = useAppwrite({
    fn: getLatestProperties,
  });

  // Fetch properties for the Recommendation section.
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <Button title="Seed" onPress={seed} /> */}

      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => handleCardPress(item.$id)}
          />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingBottom: 128 }}
        columnWrapperStyle={{
          gap: 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              className="mt-5 text-primary-300"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            {/* Header */}
            <View className="mt-5 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Image
                  source={images.avatar}
                  className="size-12 rounded-full"
                />

                <View className="ml-2 flex flex-col items-start justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>

                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>

              <Image source={icons.bell} className="size-6" />
            </View>

            {/* Search */}
            <Search />

            {/* Featured section */}
            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>

                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator
                  size="large"
                  className="mt-5 text-primary-300"
                />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                // FIX: Give the horizontal list a stable height and prevent
                // it from expanding inside the outer vertical FlatList.
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{
                    flexGrow: 0,
                    height: 340,
                  }}
                  contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 10,
                    gap: 20,
                  }}
                />
              )}
            </View>

            {/* Recommendation section */}
            <View className="mt-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>

                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
              {/* Gap between filters and property cards */}
              <View style={{ height: 18 }} />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;