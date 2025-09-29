import { Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Categories from '../Components/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shops from '../Components/Shops';
import Colors from '@/constants/Colors';

const Page = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 105, marginTop: -10 }}
			>
				<Categories />
				<Text style={styles.header}>Featured furniture in your area</Text>
				<Shops />
				<Text style={styles.header}>Special deals near you</Text>
				<Shops />
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
		fontWeight: 'bold',
		marginTop: 16,
		marginBottom: 8,
		paddingHorizontal: 16,
	},
});

export default Page;
