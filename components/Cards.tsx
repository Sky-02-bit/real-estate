
import { Image, Text, TouchableOpacity, View } from "react-native";
import icons from "../constants/icons";
import images from "../constants/images";

interface Props {
  item: any;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 190,
        height: 310,
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      {/* property image */}
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        resizeMode="cover"
        onLoad={() => console.log("FEATURED IMAGE LOADED:", item.image)}
        onError={(event) =>
          console.log("FEATURED IMAGE ERROR:", event.nativeEvent.error)
        }
      />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0 "
      />

      <View
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.95)",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 20,
        }}

      >
        <Image source={icons.star} style={{ width: 12, height: 12 }}
        />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          opacity: 0.8
        }}>
        <Text
          style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800", marginLeft: 7 }}
          numberOfLines={1}

        >
          {item.name}
        </Text>
        <Text
          style={{
            color: "#FFFFFF", fontSize: 14,
            marginLeft: 7
          }}
          numberOfLines={1}
        >
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800", marginLeft: 7 }}>
            ${item.price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity >
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 165,
        marginBottom: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 8,
        borderWidth: 0,
        borderColor: "#F0F0F0",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.95)",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 20,
          zIndex: 1,
        }}
      >
        <Image source={icons.star} style={{ width: 12, height: 12 }} />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>
      {/* fixing */}
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: 160,
          borderRadius: 8,
        }}
        resizeMode="cover"
        onLoad={() => console.log("CARD IMAGE LOADED:", item.image)}
        onError={(event) =>
          console.log("CARD IMAGE FAILED:", event.nativeEvent.error, item.image)
        }
      />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          {item.name}
        </Text>
        <Text className="text-xs font-rubik text-black-100">
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${item.price}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};