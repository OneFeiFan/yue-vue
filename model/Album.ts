export default class Album {
    private _id: string;
    private _name: string;
    private _artistId: Array<string>;
    private _year: number;
    private _genre: string; // 流派
    private _cover: string;
    private _songsId: Array<string>;

    constructor(id: string, name: string, artistId: Array<string>, year: number, genre: string, cover: string, songsId: Array<string>) {
        this._id = id;
        this._name = name;
        this._artistId = artistId;
        this._year = year;
        this._genre = genre;
        this._cover = cover;
        this._songsId = songsId;
    }

    // Getter and Setter for _id
    public getId(): string {
        return this._id;
    }

    public setId(value: string) {
        this._id = value;
    }

    // Getter and Setter for _name
    publicgetName(): string {
        return this._name;
    }

    public setName(value: string) {
        this._name = value;
    }

    // Getter and Setter for _artistId
    public getArtistId(): Array<string> {
        return this._artistId;
    }

    public setArtistId(value: Array<string>) {
        this._artistId = value;
    }

    // Getter and Setter for _year
    public getYear(): number {
        return this._year;
    }

    public setYear(value: number) {
        this._year = value;
    }

    // Getter and Setter for _genre
    public getGenre(): string {
        return this._genre;
    }

    public setGenre(value: string) {
        this._genre = value;
    }

    // Getter and Setter for _cover
    public getCover(): string {
        return this._cover;
    }

    public setCover(value: string) {
        this._cover = value;
    }

    // Getter and Setter for _songsId
    public getSongsId(): Array<string> {
        return this._songsId;
    }

    public setSongsId(value: Array<string>) {
        this._songsId = value;
    }
}
