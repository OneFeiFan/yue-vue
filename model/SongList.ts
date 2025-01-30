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
    public setId(value: string): void {
        this._id = value;
    }

    // Getter for _name
    public getName(): string {
        return this._name;
    }

    // Setter for _name
    public setName(name: string): void {
        this._name = name;
    }

    // Getter for _cover
    public getCover(): string {
        return this._cover;
    }

    // Setter for _cover
    public setCover(cover: string): void {
        this._cover = cover;
    }

    // Getter for _description
    public getDescription(): string {
        return this._description;
    }

    // Setter for _description
    public setDescription(description: string): void {
        this._description = description;
    }

    // Getter for _songsId
    public getSongsId(): Array<string> {
        return this._songsId;
    }

    // Setter for _songsId
    public setSongsId(ids: Array<string>): void {
        this._songsId = ids;
    }

    public addSongId(id: string): void {
        this._songsId.push(id);
    }

    public getAllSongs(): Array<any> {
        return this._songsId.map(id => {
            return { id: id };
        });
    }

    public getSize(): number {
        return this._songsId.length;
    }

    public removeSongId(id: string): void {
        const index = this._songsId.indexOf(id);
        if (index > -1) {
            this._songsId.splice(index, 1);
        }
    }

    public toJson():string {
        return JSON.stringify(this);
    }

    public static fromJson(jsonData: string): SongList {
        const decodedData = JSON.parse(jsonData) as { _id: string, _name: string, _cover: string, _description: string, _songsId: Array<string>};
        return new SongList(decodedData._id, decodedData._name, decodedData._cover, decodedData._description, decodedData._songsId);
    }
}
