export default class Song {
    private _id: string;
    private _title: string;
    private _artistId: Array<string|number>;
    private _albumId: string; // 专辑
    private _genre: string; // 流派
    private _year: number;
    private _duration: number;
    private _url: string;
    private _cover: string;
    private _lyrics: string; // 歌词

    constructor(id: string, title: string, artistId: Array<string>, albumId: string, genre: string, year: number, duration: number, url: string, cover: string, lyrics: string) {
        this._id = id;
        this._title = title;
        this._artistId = artistId;
        this._albumId = albumId;
        this._genre = genre;
        this._year = year;
        this._duration = duration;
        this._url = url;
        this._cover = cover;
        this._lyrics = lyrics; // 初始化歌词字段
    }

    // Getter and Setter for _id
    public getId(): string {
        return this._id.toString();
    }

    public setId(id: string): void {
        this._id = id;
    }

    // Getter and Setter for _title
    public getTitle(): string {
        return this._title;
    }

    public setTitle(title: string): void {
        this._title = title;
    }

    // Getter and Setter for _artistId
    public getArtistId(): Array<string|number> {
        return this._artistId;
    }

    public setArtistId(artistId: Array<string|number>): void {
        this._artistId = artistId;
    }

    // Getter and Setter for _albumId
    public getAlbumId(): string {
        return this._albumId
    }

    public setAlbumId(albumId: string): void {
        this._albumId = albumId;
    }

    // Getter and Setter for _genre
    public getGenre(): string {
        return this._genre;
    }

    public setGenre(genre: string): void {
        this._genre = genre;
    }

    // Getter and Setter for _year
    public getYear(): number {
        return this._year;
    }

    public setYear(year: number): void {
        this._year = year;
    }

    // Getter and Setter for _duration
    public getDuration(): number {
        return this._duration;
    }

    public setDuration(duration: number): void {
        this._duration = duration;
    }

    // Getter and Setter for _url
    public getUrl(): string {
        return this._url;
    }

    public setUrl(url: string): void {
        this._url = url;
    }

    // Getter and Setter for _cover
    public getCover(): string {
        return this._cover;
    }

    public setCover(cover: string): void {
        this._cover = cover;
    }

    // Getter and Setter for _lyrics
    public getLyrics(): string {
        return this._lyrics;
    }

    public setLyrics(lyrics: string): void {
        this._lyrics = lyrics;
    }
}
