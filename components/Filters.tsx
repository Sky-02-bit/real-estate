import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { categories } from "../constants/data";



const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");  // if not work set it to All
      router.setParams({ filter: "" }); // All
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          style={{
            marginRight: 12,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor:
              selectedCategory === item.category ? "#0061FF" : "#F5F5F5",
            borderWidth: selectedCategory === item.category ? 0 : 1,
            borderColor: "#E5E7EB",
          }}
        >
          <Text
            className={`text-sm ${selectedCategory === item.category
              ? "text-white font-rubik-bold mt-0.5"
              : "text-black-300 font-rubik"
              }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;