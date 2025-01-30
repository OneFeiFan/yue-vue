import NCM, {SongDetail, SongDetailArtist} from 'NeteaseCloudMusicApi'
import SongList from './SongList';
import Song from './Song';

interface NCMSongList {
    id: string;
    name: string;
    coverImgUrl: string;
    description: string;
}

interface NCMSongPrivilege {
    id: string;
}

interface NCMSongPrivileges extends Array<NCMSongPrivilege> {
}

interface SongListDetail {
    id: string;
    name: string;
    cover: string;
    description: string;
}

interface NCMUser {
    id: string;
    name: string;
}

export default class NeteaseApi {

    private static async getSongListDetail(id: string): Promise<SongListDetail> {
        try {
            const res = await NCM.playlist_detail({id: id});
            if (res.status === 200) {
                const {id, name, coverImgUrl, description} = res.body.playlist as NCMSongList;
                return {
                    "id": "NCM:" + id,
                    "name": "网易云：" + name,
                    "cover": coverImgUrl,
                    "description": description || "",
                };
            } else {
                throw new Error("Failed to get song list detail.");
            }
        } catch (err) {
            throw new Error(`Error in getSongListDetail with id ${id}: ${err}`);
        }
    }


    private static async getSongListSongs(id: string): Promise<Array<string>> {
        try {
            const res = await NCM.playlist_track_all({id: id});
            if (res.status !== 200) {
                throw new Error("Failed to get song list songs");
            }
            const songPrivileges: NCMSongPrivileges = res.body.privileges as NCMSongPrivileges;
            return songPrivileges.map(song => "NCM:" + song.id);
        } catch (err) {
            throw err
        }
    }

    public static async getSongList(id: string): Promise<SongList> {
        try {
            // 并发请求歌单详情和歌曲列表
            const [songListDetail, songsId] = await Promise.all([
                NeteaseApi.getSongListDetail(id),
                NeteaseApi.getSongListSongs(id)
            ]);
            return new SongList(songListDetail.id, songListDetail.name, songListDetail.cover, songListDetail.description, songsId);
        } catch (err) {
            // 增加了更详细的错误处理信息
            throw new Error(`Error fetching song list with id ${id}\n${err}`);
        }
    }

    public static async getSong(id: Array<string>): Promise<Array<Song>> {
        if (id.length === 0) {
            throw new Error("No song IDs provided");
        }
        const ids = id.join(",");
        try {
            const res = await NCM.song_detail({ids});
            if (res.status !== 200) {
                throw new Error("Failed to get song detail.");
            }
            const songs: Array<SongDetail> = res.body.songs as Array<SongDetail>;
            const songsArray: Array<Song> = songs.map(song => {
                const {id, name, ar, al, dt, publishTime} = song;
                const artistIds = ar.map(item => "NCM" + item.id);
                const albumId = "NCM:" + al.id;
                return new Song(
                    "NCM:" + id,
                    name,
                    artistIds,
                    albumId,
                    '', // 流派/曲风
                    publishTime,
                    dt,
                    '', // URL
                    al.picUrl,
                    '' // 歌词
                );
            });
            return songsArray || new Array<Song>();
        } catch (err) {
            throw new Error(`Error fetching song details with IDs ${ids}\n${err}`);
        }
    }

    public static async getSongUrl(id: string): Promise<string | null> {
        let res;
        //#ifdef H5
        const answer = {status: 500, body: {}, cookie: []}
        res = await new Promise((resolve, reject) => {
            uni.request({
                url: `http://localhost:3000/song/download/url?id=${id}`,
                method: 'GET',
                responseType: 'arraybuffer',
                success: function (result) {
                    const body = result.data as ArrayBuffer;
                    answer.status = result.statusCode;
                    const utf8decoder = new TextDecoder("utf-8");
                    answer.body = JSON.parse(utf8decoder.decode(body));
                    resolve(answer);
                },
                fail: function (res) {
                    reject(res);
                }
            });
        });
        //#endif
        //#ifdef APP-PLUS
        res = await NCM.song_download_url({id});
        //#endif
        try {
            if (res.status !== 200) {
                throw new Error("Failed to get song URL.");
            }
            // @ts-ignore
            let url: string = res.body.data.url as string;

            if (url !== null && url !== '') {
                return url;
            }
            return null;
        } catch (err) {
            throw new Error(`Error fetching song URL with ID ${id}\n${err}`);
        }
    }

}
