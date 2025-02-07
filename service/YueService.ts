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
                let songsId_raw = result.getAllSongs();
                let songsId = songsId_raw.map(id => {
                    return id.split(":")[1];
                });
                this.getSongById(songsId);
            }
        } catch (e) {
            console.log(e)
            console.log('请输入正确的网址,如https://xxx.com/playlist?id=2854089226')
        }

    }

    public async getSongById(ids: Array<string>) {
        let missingIds: Array<string> = [];

        // 检查每个ID是否存在于songService中
        for (let id of ids) {
            if (!this.songService.hasSong(id)) {
                missingIds.push(id);
            }
        }

        // 从NeteaseApi获取不在缓存中的歌曲
        let missingSongs = await NeteaseApi.getSong(missingIds);

        // 将获取到的歌曲添加到songService
        for (let song of missingSongs) {
            this.songService.addSong(song);
        }

        // // 可选：如果需要获取所有歌曲（包括已存在的和新获取的）
        // let allSongs = await NeteaseApi.getSong(ids);
        // for (let song of allSongs) {
        //     this.songService.addSong(song);
        // }

        // console.log(songs)
    }


}
