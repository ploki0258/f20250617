class Api {
    constructor(url) {
        this.url = url;
    }

    /**
     * 讀取資料
     * @param {*} params
     * @returns
     */
    async get(params = {}) {
        const url = new URL(this.url);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        let response = await fetch(url);
        return await response.json();
    }

    /**
     * 發送資料
     * @param {*} data
     * @returns
     */
    async post(data = {}) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        let response = await fetch(this.url, options);
        return await response.json();
    }

    /**
     * 新增資料
     * @param {*} data 資料
     * @returns
     */
    async create(data = {}) {
        return await this.post(data);
    }

    /**
     * 刪除資料
     * @param {*} uid 唯一ID
     * @returns
     */
    async delete(uid) {
        return await this.post({ uid, action: "delete" });
    }

    /**
     * 更新資料
     * @param {*} uid 唯一ID
     * @param {*} data 資料
     * @returns
     */
    async update(uid, data = {}) {
        return await this.post({ uid, data });
    }
}

export { Api };
