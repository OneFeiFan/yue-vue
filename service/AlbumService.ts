import Album from "../model/Album";

export default class AlbumService {
    private _albums: Map<string, Album>;

    constructor() {
        this._albums = new Map<string, Album>();
    }
    public addAlbum(album: Album): void {
        this._albums.set(album.getId(), album);
    }
    public addAlbumById(id: string, album: Album): void {
        this._albums.set(id, album);
    }
    public getAlbumById(id: string): Album | undefined {
        return this._albums.get(id);
    }
    public getAllAlbums(): Album[] {
        return Array.from(this._albums.values());
    }
    public removeAlbum(id: string): void {
        this._albums.delete(id);
    }
    public removeAlbumById(id: string): void {
        this._albums.delete(id);
    }

}