import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
import FlatCard from '../components/FlatCard'
import { useEffect, useState } from 'react'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'

const CategoriesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        if (width > height) {
            setIsPortrait(false)
        } else {
            setIsPortrait(true)
        }
    },
        [width, height])

    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.title))
                navigation.navigate('Productos')
            }}>
                <FlatCard style={
                    index % 2 == 0
                        ?
                        { ...styles.categoryItemContainer, ...styles.row }
                        :
                        { ...styles.categoryItemContainer, ...styles.rowReverse }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width > 400 ? styles.categoryTitle : stylesSmall.categoryTitle}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }


    return (
        <>
            {
                isLoading
                ?
                <ActivityIndicator size="large" color={colors.DarkKhaki} />
                :
                error
                ?
                <Text>Error al cargar las categorías</Text>
                :
                <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
            />
            }
        </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 10,
        elevation: 5,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1, 
    },
    image: {
        width: 80, 
        height: 100,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: "center"
    },
});


