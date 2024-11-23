import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable,ActivityIndicator } from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search'
import { useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopService'

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [search, setSearch] = useState("")
    const category = useSelector(state => state.shopReducer.value.categorySelected)
    console.log("Category:", category)

    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category)

    useEffect(() => {
        setProductsFiltered(productsFilteredByCategory)
        if (search) {
            setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search])

    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate("Producto", item.id)}>
            <FlatCard style={styles.productContainer}>
                <View>
                    <Image
                        source={{ uri: item.mainImage }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                    <View style={styles.tags}>
                        <Text style={styles.tagText}>Tags :</Text>
                        <FlatList
                            style={styles.tags}
                            data={item.tags}
                            keyExtractor={(tag, index) => `${tag}-${index}`}
                            renderItem={({ item: tag }) => <Text style={styles.tagText}>{tag}</Text>}
                        />
                    </View>
                </View>
            </FlatCard>
        </Pressable>
    );
    
    console.log("Data fetched:", productsFilteredByCategory);
    console.log("Error:", error);
    console.log("Loading:", isLoading);
    
    return (
        <>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color={colors.verdeNeon} />
                    :
                    error
                        ?
                        <Text>Error al cargar las categorías</Text>
                        :
                        <>
                            <Pressable onPress={() => navigation.goBack()}><Icon style={styles.goBack} name="arrow-back-ios" size={24} /></Pressable>
                            <Search setSearch={setSearch} />
                            <FlatList
                                data={productsFiltered}
                                keyExtractor={item => item.id}
                                renderItem={renderProductItem}
                            />
                        </>
            }

        </>
    )
}
export default ProductsScreen
const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 10,
        alignItems: "center",
        gap: 10
    },
    productImage: {
        width: 100,
        height: 100
    },
    productDescription: {
        width: "80%",
        padding: 20,
        gap: 10
        //height:100,
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 18
    },
    shortDescription: {
    },
    tags: {
        flexDirection: 'row',
        gap: 5
    },
    tagText: {
        //fontFamily:"Montserrat",
        fontWeight: '600',
        fontSize: 12,
        color: colors.morado
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    discount: {
        backgroundColor: colors.naranjaBrillante,
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start'
    },
    discountText: {
        color: colors.blanco
    },
    noStockText: {
        color: 'red'
    },
    goBack: {
        padding: 10,
        color: colors.grisMedio
    }
})