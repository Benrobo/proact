
let loading = false

export default async function Fetch(url = "", config = {}) {
    config["headers"] = {
        "content-type": "application/json"
    }

    loading = true
    let res = await fetch(url, config);
    const data = await res.json();
    loading = false;
    return { res, data, loading }
}

