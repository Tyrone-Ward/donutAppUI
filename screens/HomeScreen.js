import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import donutData from '../assets/data/donutData'
import headerData from '../assets/data/headerData'

const windowWidth = Dimensions.get('window').width

const Item = ({ item, onPress, backgroundColor, textColor, opacity, borderWidth }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { alignItems: 'center', borderColor: 'tomato', borderWidth: 0 }]}>
    <View style={[{ borderRadius: 12, width: 54, height: 54, alignItems: 'center', justifyContent: 'center' }, backgroundColor, opacity, borderWidth]}>
      <Image source={item.icon} resizeMode={'cover'} style={[{ height: 36, width: 36, borderRadius: 1, borderColor: 'black' }]} />
    </View>
    <View>
      <Text style={[styles.title, textColor, opacity, { paddingTop: 18 }]}>{item.tabName}</Text>
    </View>
  </TouchableOpacity>
)

const MainContentItem = ({ item, color, accentColor }) => (
  <TouchableOpacity style={{ padding: 6 }}>
    <View style={[styles.mainContentIndividual, { overflow: 'hidden', backgroundColor: color, flexDirection: 'column', justifyContent: 'space-between' }]}>
      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ borderBottomLeftRadius: 18, overflow: 'hidden' }}>
          <Text
            style={{
              paddingLeft: 9,
              paddingTop: 4.5,
              color: 'black',
              width: 63,
              height: 36,
              backgroundColor: accentColor,
              borderWidth: 0,
              fontSize: 27
            }}
          >
            ${item.price}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image source={item.icon} style={{ height: 72, width: 72 }} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.flavor}</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: -27 }}>
        <Text>{item.storeName}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
        <Ionicons name="heart-outline" size={27} color="black" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>Add</Text>
      </View>
    </View>
  </TouchableOpacity>
)

const HomeScreen = () => {
  const headerHeight = useHeaderHeight()

  const [selectedId, setSelectedId] = useState(null)

  const renderItem = ({ item }) => {
    const backgroundColor = item.tabName === selectedId ? 'white' : 'lightgray'
    const color = item.tabName === selectedId ? 'black' : 'gray'
    const opacity = item.tabName === selectedId ? 1 : 0.3
    const borderWidth = item.tabName === selectedId ? 2 : 0

    return <Item item={item} onPress={() => setSelectedId(item.tabName)} backgroundColor={{ backgroundColor }} textColor={{ color }} opacity={{ opacity }} borderWidth={{ borderWidth }} />
  }

  const mainContentRenderer = ({ item }) => {
    const mainContentColor = item.color
    return <MainContentItem item={item} color={mainContentColor} accentColor={item.accent} />
  }

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcome}>
          I want to <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Eat</Text>
        </Text>
        <View>
          <FlatList data={headerData} renderItem={renderItem} showsHorizontalScrollIndicator={false} horizontal={true} keyExtractor={(item) => item.tabName} extraData={selectedId} />
        </View>
      </View>
      <View style={styles.mainContent}>
        <FlatList data={donutData} renderItem={mainContentRenderer} keyExtractor={(item) => item.flavor} numColumns={2} />
      </View>
      <View style={styles.shoppingCart}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 27, fontWeight: 'bold' }}>2 items | $45</Text>
          <Text>Delivery Charges Included</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 27, fontWeight: 'bold', textDecorationLine: 'underline' }}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    backgroundColor: 'white',
    flex: 0.99,
    paddingHorizontal: 18
  },
  welcome: {
    color: 'black',
    fontSize: 40
  },
  welcomeHeader: {
    flex: 0.2,
    borderWidth: 0,
    borderColor: 'tomato'
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 4
  },
  title: {
    fontSize: 18
  },
  mainContent: {
    flex: 0.7,
    paddingTop: 36,
    borderWidth: 0,
    borderColor: 'tomato'
  },
  mainContentIndividual: {
    height: 243,
    width: (windowWidth - 54) / 2,
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 18
  },
  shoppingCart: {
    paddingHorizontal: 18,
    marginTop: 18,
    flex: 0.15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'darkgray'
  }
})
