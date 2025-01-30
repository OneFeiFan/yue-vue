export default class Artist {
    private _name: string;
    private _id: string;
    private _songsId: Array<string>;
    private _albumsId: Array<string>;
    private _cover: string;

    constructor(name: string, id: string, songsId: Array<string>, albumsId: Array<string>, cover: string) {
        this._name = name;
        this._id = id;
        this._songsId = songsId;
        this._albumsId = albumsId;
        this._cover = cover;
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public getId(): string {
        return this._id;
    }

    public setId(id: string): void {
        this._id = id;
    }

    public getSongsId(): Array<string> {
        return this._songsId;
    }

    public setSongsId(songsId: Array<string>): void {
        this._songsId = songsId;
    }

    public getAlbumsId(): Array<string> {
        return this._albumsId;
    }

    public setAlbumsId(albumId: Array<string>): void {
        this._albumsId = albumId;
    }

    public getCover(): string {
        return this._cover;
    }

    public setCover(cover: string): void {
        this._cover = cover;
    }
}