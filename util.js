class CustomCache {
    constructor(cachePrefix, refresh, ttl) {
        this.refresh = refresh * 1000;
        this.ttl = ttl * 1000;
        this.cachePrefix = cachePrefix;

        setInterval(this.refreshCache.bind(this), this.refresh);
    }

    refreshCache() {
        if (localStorage.length === 0) {
            return;
        }

        const now = Date.now();
        const keysToBeDeleted = [];
        Object.keys(localStorage).forEach((key) => {
            if (!key.startsWith(this.cachePrefix)) {
                return;
            }

            const data = JSON.parse(localStorage.getItem(key));
            const dataDate = data.time;
            if ((now - dataDate) >= this.ttl) {
                keysToBeDeleted.push(key);
            }
         });

        keysToBeDeleted.forEach(key => {
            localStorage.removeItem(key);
        });
    }

    get(key) {
        const data = localStorage.getItem(key) ?? null;
        return data ? JSON.parse(data).val : null;
    }

    set(key, val) {
        if (!key.startsWith(this.cachePrefix)) {
            return;
        }

        localStorage.setItem(key, JSON.stringify({
            val: val,
            time: Date.now()
        }));
    }
}
