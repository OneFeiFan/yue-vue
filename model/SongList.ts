export default class SongList {
    private _id: string;
    private _name: string;
    private _cover: string;
    private _description: string;
    private _songsId: Array<string>;

    constructor(id: string, name: string, cover: string, description: string, songsId: Array<string>) {
        this._id = id;
        this._name = name;
        this._cover = cover;
        this._description = description;
        this._songsId = songsId;
    }

    // Getter for _id
    public getId(): string {
        return this._id;
    }

    // Setter for _id
    public setId(value: string) {
        this._id = value;
    }

    // Getter for _name
    public getName(): string {
        return this._name;
    }

    // Setter for _name
    public setName(name: string) {
        this._name = name;
    }

    // Getter for _cover
    public getCover(): string {
        return this._cover;
    }

    // Setter for _cover
    public setCover(cover: string) {
        this._cover = cover;
    }

    // Getter for _description
    public getDescription(): string {
        return this._description;
    }

    // Setter for _description
    public setDescription(description: string) {
        this._description = description;
    }

    // Getter for _songsId
    public getSongsId(): Array<string> {
        return this._songsId;
    }

    // Setter for _songsId
    public setSongsId(ids: Array<string>) {
        this._songsId = ids;
    }

    public addSongId(id: string) {
        this._songsId.push(id);
    }

    public removeSongId(id: string) {
        const index = this._songsId.indexOf(id);
        if (index > -1) {
            this._songsId.splice(index, 1);
        }
    }
}