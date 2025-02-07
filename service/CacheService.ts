

export default class CacheService {
    public static cache: Map<string, any> = new Map();
    public static pendingCache: Set<string> = new Set();
    private static clock: Array<{ key: string, used: boolean }> = [];
    private static timeoutId: number;
    private static maxCacheSize: number = 100;

    public static set(key: string, value: any): void {
        // 如果cache已满，使用时钟页面置换算法移除一个键值对
        if (CacheService.cache.size >= CacheService.maxCacheSize) {
            CacheService.removeUsingClock();
        }
        // console.log(`Cache set, key: ${key}, value: ${value}, size: ${CacheService.cache.size}`);
        // 首先写入cache
        CacheService.cache.set(key, value);

        // 将key标记为待写入本地存储
        CacheService.pendingCache.add(key);

        // 将key添加到clock数组中
        CacheService.clock.push({ key: key, used: true });

        // 清除之前的定时器
        if (CacheService.timeoutId) {
            clearTimeout(CacheService.timeoutId);
        }

        // 设置新的定时器
        CacheService.timeoutId = setTimeout(() => {
            CacheService.flushPendingCache();
        }, 1000);
    }

    public static get(key: string): any {
        // 首先尝试从cache中获取
        if (CacheService.cache.has(key)) {
            // 标记该键为已使用
            CacheService.markUsed(key);
            return CacheService.cache.get(key);
        }

        try {
            // 如果cache中没有，则从uni存储中获取
            let temp = uni.getStorageSync(key);
            if(temp === ''||temp === null){
                return null;
            }
            // 将获取到的数据存入cache
            CacheService.cache.set(key, temp);
            // 标记该键为已使用
            CacheService.markUsed(key);
            return temp;
        } catch (e) {
            throw e;
        }
    }

    private static flushPendingCache(): void {
        // 合并pendingCache到本地存储
        while (CacheService.pendingCache.size > 0) {
            const key = CacheService.pendingCache.values().next().value as string;
            CacheService.pendingCache.delete(key);
            // console.log(`Flushing cache for key: ${key}`);
            try {
                // 从cache中获取最新数据
                let newData = CacheService.cache.get(key) || {};
                // console.log(`Flushing cache for key: ${key}, newData: ${newData}`);
                if (newData === "-1-1-1") {
                    // 如果新数据是"-1-1-1"，则删除本地存储中的该项
                    uni.removeStorageSync(key);
                } else {
                    // // 从本地存储中获取现有数据
                    // let existingData = uni.getStorageSync(key) || {};
                    // // 合并现有数据和新数据
                    // let mergedData = { ...existingData, ...newData };
                    // 将合并后的数据写入本地存储
                    uni.setStorageSync(key, newData);
                    // console.log(uni.getStorageSync(key))
                }
            } catch (e) {
                console.error(`Failed to flush cache for key: ${key}`, e);
            }
        }
    }

    private static removeUsingClock(): void {
        while (true) {
            const entry = CacheService.clock.shift();
            if (entry) {
                if (entry.used) {
                    // 如果被标记为已使用，则重置used标志并放回clock数组末尾
                    entry.used = false;
                    CacheService.clock.push(entry);
                } else {
                    // 如果未被标记为已使用，则移除该键值对
                    CacheService.cache.delete(entry.key);
                    break;
                }
            }
        }
    }

    private static markUsed(key: string): void {
        // 找到key并标记为已使用
        for (let entry of CacheService.clock) {
            if (entry.key === key) {
                entry.used = true;
                break;
            }
        }
    }
}
