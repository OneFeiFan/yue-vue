import SongList from "../model/SongList";
import CacheService from "./CacheService";

export default class SongListService {
    private list: Map<string, SongList>;

    constructor() {
        this.list = new Map<string, SongList>();
        const cache = CacheService.get("songlists");
        if (cache !== null) {
            try {
                const parsedCache = JSON.parse(cache);
                this.list = new Map(Object.keys(parsedCache).map(key => [key, SongList.fromJson(parsedCache[key])]));
                console.log(this.list);
            } catch (error) {
                console.error("Failed to parse cached songlists:", error);
            }
        }
    }

    public addSongList(songList: SongList): void {
        this.addSongListById(songList.getId(), songList);
    }

    public getSongList(id: string): SongList | undefined {
        return this.list.get(id);
    }

    public getAllSongList(): Map<string, SongList> {
        return this.list;
    }

    public addSongListById(id: string, songList: SongList): void {
        this.list.set(id, songList);
        this.updateCache();
    }

    public removeSongListById(id: string): void {
        this.list.delete(id);
        this.updateCache();
    }

    public removeSong(songlist: SongList): void {
        this.removeSongListById(songlist.getId());
    }

    private updateCache(): void {
        if (this.list.size === 0) {
            CacheService.set("songlists", "-1-1-1");
        } else {
            CacheService.set("songlists", this.toJson());
        }
    }

    public toJson(): string {
        const obj = Array.from(this.list, ([key, value]) => [key, value.toJson()]).reduce((acc: {
            [key: string]: string
        }, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        return JSON.stringify(obj);
    }
}
