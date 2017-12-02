import 'whatwg-fetch';

const netErrorStatu = 1;    // 网络错误
const serverErrorStatu = 2;    // 服务器错误
const formatErrorStatu = 3;    // 数据格式错误
const logicErrorStatu = 4;    // 业务逻辑错误

const errorMsg = {
    [netErrorStatu]: '网络错误',
    [serverErrorStatu]: '服务器错误',
    [formatErrorStatu]: '数据格式错误',
    [logicErrorStatu]: '业务逻辑错误'
};

class CustomFetchError {
    constructor(errno, data) {
        this.errno = errno;
        this.msg = errorMsg[errno];
        this.data = data;
    }
}

export function buildQuery(data) {
    const toString = Object.prototype.toString;

    const res = Object.entries(data).reduce((pre, [key, value]) => {
        let newValue;

        if (Array.isArray(value) || toString.call(value) === '[object Object]') {
            newValue = JSON.stringify(value);
        } else {
            newValue = (value === null || value === undefined) ? '' : value;
        }

        pre.push(`${key}=${encodeURIComponent(newValue)}`);

        return pre;
    }, []);

    return res.join('&');
}

export async function request(input, opt) {
    // 设置请求默认带cookie
    const init = Object.assign({
        credentials: 'include'
    }, opt);

    let res;
    // 仅当网络故障时或请求被阻止时，才会标记为 rejec
    try {
        res = await fetch(input, init);
    } catch (e) {
        throw new CustomFetchError(netErrorStatu, e);
    }
    // 仅HTTP状态码为200-299是才会设置为true
    if (!res.ok) {
        throw new CustomFetchError(serverErrorStatu, res);
    }

    let data;
    // fetch()请求返回的response是Stream对象，调用response.json时由于异步读取流对象所以返回的是一个Promise对象    
    try {
        data = await res.json();
    } catch (e) {
        throw new CustomFetchError(formatErrorStatu, e);
    }
    // 根据和后台的约定设置的错误处理
    if (!data || data.errno !== 0) {
        throw new CustomFetchError(logicErrorStatu, data);
    }

    return data.data;
}

export function get(url, params = {}, opt = {}) {
    const init = Object.assign({
        method: 'GET'
    }, opt);

    // ajax cache
    Object.assign(params, {
        timestamp: new Date().getTime()
    });

    const paramsStr = buildQuery(params);

    const urlWithQuery = url + (paramsStr ? `?${paramsStr}` : '');

    return request(urlWithQuery, init);
}

export function post(url, params = {}, opt = {}) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const init = Object.assign({
        method: 'POST',
        body: buildQuery(params),
        headers
    }, opt);

    return request(url, init);
}

export default {
    request,
    get,
    post
};
