import SongList from "../model/SongList";


export default class SongListService {
    private list: Map<string, SongList>;

    constructor() {
        this.list = new Map<string, SongList>();
    }

    public addSongList(songList: SongList): void {
        this.list.set(songList.getId(), songList);
    }

    public getSongList(id: string): SongList | undefined {
        return this.list.get(id);
    }

    public getAllSongLists(): Map<string, SongList> {
        return this.list;
    }

    public addSongListById(id: string, songList: SongList): void {
        this.list.set(id, songList);
    }

    public removeSongListById(id: string): void {
        this.list.delete(id);
    }

    public removeSong(songlist: SongList): void {
        this.list.delete(songlist.getId());
    }
}