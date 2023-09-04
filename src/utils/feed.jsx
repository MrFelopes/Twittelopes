import { getDownloadURL, getStorage, list, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react"
import { FlatList, Image } from "react-native";


export default function Feed(){
    const [imagesUrl, setImagesUrl] = useState(null)

    const storage = getStorage();
    useEffect(() => {
        setURLsToFilesInBucket();
    }, [])

    const setURLsToFilesInBucket = async () => {
        const imageRefs = await listAll(ref(storage));
        const urls = await Promise.all(imageRefs.items.map((imageRef) => getDownloadURL(imageRef)));
        setImagesUrl(urls);
    };
    
    return( 

        <FlatList 
            style={{flex: 1, flexDirection: 'row'}}
            data = {imagesUrl}
            keyExtractor={(item) => item}
            renderItem={({item}) => {
                return( 
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: imagesUrl}}
                    />
                )}}
        />

    )}