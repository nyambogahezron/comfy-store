import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("screen");

export default function PopularItemCard({ furniture }: { furniture: any }) {
	return (
		<View style={style.popularItemCard}>
			<View style={style.iconContainer}>
				<MaterialCommunityIcons
					name="heart"
					color={furniture.liked ? Colors.red : Colors.primary}
				/>
			</View>
			<Image
				source={furniture.image}
				style={{
					width: 100,
					height: "100%",
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					marginRight: 10,
				}}
			/>
			<View style={{ paddingVertical: 15, justifyContent: "center" }}>
				<Text style={style.cardName}>{furniture.name}</Text>
				<View style={{ flexDirection: "row", marginTop: 10 }}>
					<Text style={style.price}>{furniture.price}</Text>
					<View style={{ flexDirection: "row", marginLeft: 10 }}>
						<MaterialCommunityIcons name="star" color={Colors.yellow} size={18} />
						<Text style={style.rating}>4.3</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
const style = StyleSheet.create({
	title: { fontSize: 18, fontWeight: "bold", paddingHorizontal: 20 },
	card: {
		height: 190,
		backgroundColor: Colors.white,
		elevation: 10,
		width: width / 2.5,
		marginRight: 20,
		padding: 10,
		marginVertical: 20,
		borderRadius: 10,
	},
	cardName: {
		marginTop: 10,
		fontSize: 12,
		color: Colors.primary,
		fontWeight: "bold",
	},
	price: { fontWeight: "bold", color: Colors.primary, fontSize: 12 },
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
	iconContainer: {
		height: 25,
		width: 25,
		backgroundColor: Colors.white,
		position: "absolute",
		elevation: 2,
		right: 15,
		top: 15,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	rating: {
		fontWeight: "bold",
		color: Colors.primary,
		fontSize: 12,
	},
});
