import SongService from './SongService';
import AlbumService from './AlbumService';
import ArtistService from './ArtistService';
import SongListService from './SongListService';

export default class YueService {
    private songService: SongService;
    private albumService: AlbumService;
    private artistService: ArtistService;
    private songListService: SongListService;

    constructor() {
        this.songService = new SongService();
        this.albumService = new AlbumService();
        this.artistService = new ArtistService();
        this.songListService = new SongListService();
    }

    getSongService(): SongService {
        return this.songService;
    }

    getAlbumService(): AlbumService {
        return this.albumService;
    }

    getArtistService(): ArtistService {
        return this.artistService;
    }

    getSongListService(): SongListService {
        return this.songListService;
    }
}