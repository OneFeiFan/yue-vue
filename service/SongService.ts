import Song from '../model/Song'
import CacheService from "./CacheService";;

export default class SongService {
    private _songs: Map<string|number, Song>

    constructor() {
        this._songs = new Map<string|number, Song>();
        const cache = CacheService.get("songs");
        if (cache !== null) {
            try {
                const parsedCache = JSON.parse(cache);
                this._songs = new Map(Object.keys(parsedCache).map(key => [key, Song.fromJson(parsedCache[key])]));
                console.log(this._songs);
            } catch (error) {
                console.error("Failed to parse cached songlists:", error);
            }
        }
    }
    private updateCache(): void {
        if (this._songs.size === 0) {
            CacheService.set("songs", "-1-1-1");
        } else {
            CacheService.set("songs", this.toJson());
        }
    }
    public addSong(song: Song): void {
        this.addSongById(song.getId(), song);
    }

    public addSongById(id: string|number, song: Song): void {
        this._songs.set(id, song);
        this.updateCache();
    }

    public getSongById(id: string): Song | undefined {
        return this._songs.get(id);
    }

    public getAllSongs(): Map<string|number, Song> {
        return this._songs;
    }

    public removeSong(song: Song): void {
        this.removeSongById(song.getId());
    }

    public removeSongById(id: string): void {
        this._songs.delete(id);
        this.updateCache();
    }
    public hasSong(id: string): boolean {
        return this._songs.has(id);
    }
    public toJson(): string {
        console.log("SongService.toJson()");
        const obj = Array.from(this._songs, ([key, value]) => [key.toString(), value.toJson()]).reduce((acc: {
            [key: string]: string
        }, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        return JSON.stringify(obj);
    }
}
