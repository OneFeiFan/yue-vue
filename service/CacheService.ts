import SongList from "../model/SongList";


export default class CacheService {
    public static cache: Map<string, any> = new Map();

    public static set(key: string, value: any): void {

        try {
            uni.setStorageSync(key, value);
            let temp = uni.getStorageSync(key)
            console.log(SongList.fromJson(temp))
        } catch (e) {
            // error
        }
    }
}