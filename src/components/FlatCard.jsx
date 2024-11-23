import { StyleSheet, Text, View } from 'react-native'


const FlatCard = ({children,style}) => {
return (
    <View style={{...styles.cardContainer,...style}}>
        {children}
    </View>
)
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: "purple",
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {width: 3, height:5},
        elevation:10,
    }
})