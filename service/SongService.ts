import Song from '../model/Song'

export default class SongService {
    private _songs: Map<string|number, Song>

    constructor() {
        this._songs = new Map<string|number, Song>();
    }

    public addSong(song: Song): void {
        this._songs.set(song.getId(), song);
    }

    public addSongById(id: string|number, song: Song): void {
        this._songs.set(id, song);
    }

    public getSong(id: string): Song | undefined {
        return this._songs.get(id);
    }

    public getAllSongs(): Map<string|number, Song> {
        return this._songs;
    }

    public removeSong(song: Song): void {
        this._songs.delete(song.getId());
    }

    public removeSongById(id: string): void {
        this._songs.delete(id);
    }

}