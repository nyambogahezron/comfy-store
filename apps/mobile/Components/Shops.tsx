import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { furnitureStores } from '@/assets/data/home';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';

export default function Shops() {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				padding: 15,
			}}
		>
			{furnitureStores.map((store, index) => (
				<Link href={'/details'} key={index} asChild>
					<TouchableOpacity>
						<View style={styles.categoryCard}>
							<Image source={store.img} style={styles.image} />
							<View style={styles.categoryBox}>
								<Text style={styles.categoryText}>{store.name}</Text>
								<Text style={{ color: Colors.green }}>
									{store.rating} {store.ratings}
								</Text>
								<Text style={{ color: Colors.medium }}>{store.distance}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</Link>
			))}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	categoryCard: {
		width: 300,
		height: 250,
		backgroundColor: '#fff',
		marginEnd: 10,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.06,
		borderRadius: 4,
	},
	categoryText: {
		paddingVertical: 5,
		fontSize: 14,
		fontWeight: 'bold',
	},
	image: {
		flex: 5,
		width: undefined,
		height: undefined,
	},
	categoryBox: {
		flex: 2,
		padding: 10,
	},
});
