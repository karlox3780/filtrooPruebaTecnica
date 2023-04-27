import React, { useState, useEffect, useCallback } from "react";
import { FlatList, RefreshControl, ActivityIndicator, View } from "react-native";
import PicItem from "./PicItem.jsx";

const PicsList = () => {
    const [PicsList, setPicsList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPics = async () => {
        setLoading(true);
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=20`);
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            const pics = await response.json();
            setPicsList([...PicsList, ...pics]);
            setLoading(false);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setCurrentPage(0);
            setPicsList([]);
            fetchPics();
        }, 2000);
    }, [refreshing]);

    const renderLoader = () => {
        return (
            loading
                ?
                <View>
                    <ActivityIndicator size="large" color="#aaa" />
                </View>
                :
                null
        )
    }

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1)
    }

    useEffect(() => {
        fetchPics()
    }, [currentPage])

    return (
        PicsList ?
            <FlatList
                numColumns='2'
                horizontal={false}
                data={PicsList}
                renderItem={({ item: pic }) => (
                    <PicItem {...pic} />
                )}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}
                contentContainerStyle={{ padding: 20 }}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />
            :
            <View>
                <ActivityIndicator size="large" color="#aaa" />
            </View>
    )
}

export default PicsList;