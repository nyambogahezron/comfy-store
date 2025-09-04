import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";

type Categories = {
	name: string;
	iconName: string;
};

export default function ListCategories(): React.JSX.Element {
	const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
	const categoryItems: Categories[] = [
		{ name: "Chair", iconName: "seat-outline" },
		{ name: "Table", iconName: "table-furniture" },
		{ name: "Cupboard", iconName: "cupboard-outline" },
		{ name: "bed", iconName: "bed-queen-outline" },
	];

	return (
		<View style={style.categoriesContainer}>
			{categoryItems.map((item, index) => (
				<TouchableOpacity
					key={index}
					activeOpacity={0.8}
					onPress={() => setSelectedCategoryIndex(index)}
				>
					<View
						style={[
							style.categoryItemBtn,
							{
								backgroundColor: selectedCategoryIndex === index ? Colors.primary : "#f7f7f7",
							},
						]}
					>
						{/* <MaterialCommunityIcons
                name={item.iconName}
                size={20}
                color={
                  selectedCategoryIndex == index ? Colors.white : Colors.primary
                }
              /> */}
						<Text
							style={[
								style.categoryText,
								{
									color: selectedCategoryIndex === index ? Colors.white : Colors.primary,
								},
							]}
						>
							{item.name}
						</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
}

const style = StyleSheet.create({
	categoriesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	categoryItemBtn: {
		flexDirection: "row",
		backgroundColor: "#f7f7f7",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 7,
		alignItems: "center",
	},
	categoryText: {
		fontSize: 13,
		fontWeight: "bold",
		color: Colors.primary,
		marginLeft: 5,
	},
});
