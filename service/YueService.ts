import SongService from './SongService';
import AlbumService from './AlbumService';
import ArtistService from './ArtistService';
import SongListService from './SongListService';
import NeteaseApi from "../model/NeteaseApi";
import CacheService from "./CacheService";
import "url-search-params-polyfill"
import URL from '../utils/url';

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

    public async getSongListByUrl(_url: string) {
        try {
            let url = new URL(_url);
            if ((url.host === 'music.163.com'||url.host === 'y.music.163.com') && (url.pathname === '/playlist'||url.pathname === '/m/playlist')) {

                let id: string = new URLSearchParams(url.search).get('id') as string;
                let result = await NeteaseApi.getSongList(id);
                this.songListService.addSongList(result);
                // CacheService.set('songList', result.toJson());
            }
        } catch (e) {
            console.log(e)
            console.log('请输入正确的网址,如https://xxx.com/playlist?id=2854089226')
        }

    }
}
