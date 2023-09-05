import { getDownloadURL, getStorage, list, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react"
import { FlatList, Image } from "react-native";
import { View } from "react-native";


export default function Feed(){
    const [imagesUrl, setImagesUrl] = useState([])

    const storage = getStorage();
    useEffect(() => {
        setURLsToFilesInBucket();
    }, [])

    const setURLsToFilesInBucket = async () => {
        const imageRefs = await listAll(ref(storage, "images"));
        const urls = await Promise.all(imageRefs.items.map((imageRef) => getDownloadURL(imageRef)));
        setImagesUrl(urls);
    };
    
    return( 

        <View>
            {imagesUrl.map((url) => (
                <Image
                    style={{ width: 200, height: 200 }}
                    source={{
                    uri: url,
                    }}
                />
            ))}
        </View>
        

    )}