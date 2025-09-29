import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/Components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
	initialRouteName: 'index',
};

export default function RootLayoutNav() {
	const navigation = useNavigation();

	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
					<Stack>
						<Stack.Screen
							name='index'
							options={{
								header: () => <CustomHeader />,
							}}
						/>

						<Stack.Screen
							name='(auth)'
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='(modal)/filter'
							options={{
								presentation: 'modal',
								headerTitle: 'Filter',
								headerShadowVisible: false,
								headerStyle: {
									backgroundColor: Colors.lightGrey,
								},
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => {
											navigation.goBack();
										}}
									>
										<Ionicons
											name='close-outline'
											size={28}
											color={Colors.primary}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name='(modal)/location-search'
							options={{
								presentation: 'fullScreenModal',
								headerTitle: 'Select location',
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => {
											navigation.goBack();
										}}
									>
										<Ionicons
											name='close-outline'
											size={28}
											color={Colors.primary}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name='(modal)/dish'
							options={{
								presentation: 'modal',
								headerTitle: '',
								headerTransparent: true,

								headerLeft: () => (
									<TouchableOpacity
										style={{
											backgroundColor: '#fff',
											borderRadius: 20,
											padding: 6,
										}}
										onPress={() => {
											navigation.goBack();
										}}
									>
										<Ionicons
											name='close-outline'
											size={28}
											color={Colors.primary}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name='basket'
							options={{
								headerTitle: 'Shopping Cart',
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => {
											navigation.goBack();
										}}
									>
										<Ionicons
											name='arrow-back'
											size={28}
											color={Colors.primary}
										/>
									</TouchableOpacity>
								),
							}}
						/>
					</Stack>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
	);
}
