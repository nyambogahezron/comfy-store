import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack } from "expo-router";
import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: true,
					headerTitle: "",
					header: () => <CustomHeader />,
					statusBarColor: Colors.white,
					headerStyle: { backgroundColor: Colors.white },
					statusBarStyle: "dark",
				}}
			/>
			<Stack.Screen
				name="details"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}

const CustomHeader = (): React.JSX.Element => {
	return (
		<View style={style.header}>
			<MaterialCommunityIcons name="sort-variant" size={28} color={Colors.primary} />
			<MaterialCommunityIcons
				name="cart-outline"
				size={28}
				color={Colors.primary}
				style={{
					position: "relative",
					alignItems: "center",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<View style={style.badge}>
					<Text>5</Text>
				</View>
			</MaterialCommunityIcons>
		</View>
	);
};

const style = StyleSheet.create({
	header: {
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		top: 0,
		backgroundColor: Colors.white,
	},

	badge: {
		height: 20,
		width: 20,
		backgroundColor: Colors.primary,
		borderRadius: 50,
		fontSize: 8,
		color: Colors.yellow,
		position: "absolute",
		top: 0,
		right: 0,
	},
});
