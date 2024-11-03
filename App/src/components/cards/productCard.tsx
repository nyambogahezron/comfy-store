import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
const { width } = Dimensions.get('screen');

export default function ProductCard({ furniture }: { furniture: any }) {
  return (
    <Pressable onPress={() => {}}>
      <View style={style.card}>
        <View style={style.iconContainer}>
          <MaterialCommunityIcons
            name='heart'
            color={furniture.liked ? Colors.red : Colors.primary}
          />
        </View>
        <Image
          source={furniture.image}
          style={{ height: 120, width: '100%', borderRadius: 10 }}
        />

        <Text style={style.cardName}>{furniture.name}</Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={style.price}>{furniture.price}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name='star'
              color={Colors.yellow}
              size={18}
            />
            <Text style={style.rating}>4.3</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
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
    fontWeight: 'bold',
  },
  price: { fontWeight: 'bold', color: Colors.primary, fontSize: 12 },
  rating: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20 },
  iconContainer: {
    height: 25,
    width: 25,
    backgroundColor: Colors.white,
    position: 'absolute',
    elevation: 2,
    right: 15,
    top: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
