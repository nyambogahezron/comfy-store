import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Categories from "../Components/Categories";
import Restaurants from "../Components/Restaurants";

const Page = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingBottom: 105, marginTop: -10 }}>
				<Categories />
				<Text style={styles.header}>Top picks in your neighborhood</Text>
				<Restaurants />
				<Text style={styles.header}>Offers near you</Text>
				<Restaurants />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		top: 110,
		backgroundColor: Colors.lightGrey,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 16,
		marginBottom: 8,
		paddingHorizontal: 16,
	},
});

export default Page;
