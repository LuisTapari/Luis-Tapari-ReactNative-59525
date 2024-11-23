import { StyleSheet, Text, View } from 'react-native'
import MontserratText from './MontserratText'

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Mundo Geek</Text>
            <MontserratText style={styles.subtitle}>Productos</MontserratText>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    title: {
        fontSize: 24,
        //fontWeight: 'bold',
        color: "yellow",
        fontFamily: 'PressStart2P'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 700,
        color: "white",
        //fontFamily:"PressStart2P"
    }
})