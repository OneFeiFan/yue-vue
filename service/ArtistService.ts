import Artist from "../model/Artist";
export default class ArtistService {
    private artists: Map<string, Artist>;
    constructor() {
        this.artists = new Map();
    }
    public addArtist(artist: Artist): void {
        this.artists.set(artist.getId(), artist);
    }
    public addArtistById(id: string, artist: Artist): void {
        this.artists.set(id, artist);
    }
    public getArtist(id: string): Artist | undefined {
        return this.artists.get(id);
    }
    public getAllArtists(): Map<string,Artist> {
        return this.artists;
    }
    public removeArtist(artist: Artist): void {
        this.artists.delete(artist.getId());
    }
    public removeArtistById(id: string): void {
        this.artists.delete(id);
    }
}