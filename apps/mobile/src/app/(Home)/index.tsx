import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
	Dimensions,
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import ListCategories from "@/components/cards/ListCategories";
import PopularItemCard from "@/components/cards/PopularItemCard";
import ProductCard from "@/components/cards/productCard";
import { Colors } from "@/constants/Colors";
import { furniture } from "@/data/furniture";

const { width } = Dimensions.get("screen");

export default function HomeScreen() {
	return (
		<SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={style.headerTitle}>Best Furniture For Your Home.</Text>

				{/* Input and sort button container */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 20,
					}}
				>
					<View style={style.searchInputContainer}>
						<MaterialCommunityIcons name="magnify" color={Colors.grey} size={25} />
						<TextInput placeholder="Search" />
					</View>

					<View style={style.sortBtn}>
						<MaterialCommunityIcons name="tune" color={Colors.white} size={25} />
					</View>
				</View>

				<Text style={style.title}>Categories</Text>
				{/* Render categories */}
				<ListCategories />

				{/* Render To Furniture */}
				<Text style={style.title}>Top Furniture</Text>

				<FlatList
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingLeft: 20 }}
					data={furniture}
					horizontal
					renderItem={({ item }) => <ProductCard furniture={item} />}
				/>

				{/* Render To Popular */}
				<Text style={style.title}>Popular</Text>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingLeft: 20 }}
					data={furniture}
					renderItem={({ item }) => <PopularItemCard furniture={item} />}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	header: {
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	headerTitle: {
		fontSize: 23,
		fontWeight: "bold",
		width: "55%",
		lineHeight: 30,
		paddingHorizontal: 20,
	},
	searchInputContainer: {
		height: 50,
		backgroundColor: "#f7f7f7",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		borderRadius: 12,
	},
	sortBtn: {
		backgroundColor: Colors.primary,
		height: 50,
		width: 50,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 10,
	},

	title: { fontSize: 18, fontWeight: "bold", paddingHorizontal: 20 },

	popularItemCard: {
		height: 90,
		width: width - 100,
		backgroundColor: Colors.white,
		elevation: 10,
		marginVertical: 20,
		marginRight: 20,
		borderRadius: 10,
		flexDirection: "row",
	},
});
