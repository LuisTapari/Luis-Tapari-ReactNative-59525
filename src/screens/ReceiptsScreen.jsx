import { StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetReceiptsQuery } from '../services/receiptsService';
import { useState, useEffect } from 'react';

const ReceiptsScreen = () => {
    const { data: receipts, error, isLoading } = useGetReceiptsQuery();

    const receiptArray = receipts
        ? Object.entries(receipts)
            .map(([id, receipt]) => ({ id, ...receipt }))
            .sort((a, b) => b.createdAt - a.createdAt) // Ordenar por fecha de creación (más recientes primero)
        : [];

    const [visibleReceipts, setVisibleReceipts] = useState(receiptArray);
    const [hiddenPrices, setHiddenPrices] = useState({}); // Estado para ocultar precios por ID

    useEffect(() => {
        setVisibleReceipts(receiptArray);
    }, [receipts]);

    const toggleHidePrice = (id) => {
        setHiddenPrices((prevHidden) => ({
            ...prevHidden,
            [id]: !prevHidden[id], // Alternar el estado de ocultar/mostrar para este ID
        }));
    };

    const renderReceiptItem = ({ item, index }) => {
        const total = item.total || 0; // Usar directamente el valor del total
        const receiptName = `Recibo #${receiptArray.length - index}`; // Asignar el número en orden inverso

        const isPriceHidden = hiddenPrices[item.id]; // Verificar si el precio está oculto

        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        return (
            <FlatCard style={styles.receiptContainer}>
                <Text style={styles.title}>{receiptName}</Text>
                <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs.</Text>
                <Text style={styles.total}>
                    Total: {isPriceHidden ? "******" : total}
                </Text>
                <Icon
                    name={isPriceHidden ? "visibility" : "visibility-off"}
                    size={24}
                    color={colors.grisOscuro}
                    style={styles.viewIcon}
                    onPress={() => toggleHidePrice(item.id)}
                />
            </FlatCard>
        );
    };

    if (isLoading) return <ActivityIndicator size="large" color={colors.DarkKhaki} />;
    if (error) return <Text>Error al cargar los recibos</Text>;

    return (
        <FlatList
            data={visibleReceipts}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem}
        />
    );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
    receiptContainer: {
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        gap: 10,
    },
    title: {
        fontWeight: '700'
    },
    total: {
        fontSize: 16,
        fontWeight: '700'
    },
    viewIcon: {
        alignSelf: 'flex-end'
    }
});
