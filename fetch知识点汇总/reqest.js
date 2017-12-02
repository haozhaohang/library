import { notification } from 'antd';
import Loading from 'components/Loading';
import { LOGIN_URL } from 'constants/basic';
import * as http from './http';

const loading = Loading.newInstance();

async function request(method, url, params, opt = {}, httpOpt) {
    /**
     * needLoading 是否添加loading图片
     * checkAccount 验证未登陆是否跳登陆页面
     * showErrorMsg 是都显示通用错误提示
     */
    const {
        needLoading = true,
        checkAccount = true,
        showErrorMsg = true
    } = opt;

    if (needLoading) {
        loading.add();
    }

    let res;

    try {
        res = await http[method](url, params, httpOpt);
    } catch (e) {
        if (checkAccount && e.errno === 4 && e.data.errno === 10000) {
            location.href = LOGIN_URL;
        }

        if (showErrorMsg) {
            notification.error({
                message: '提示信息',
                description: e.errno === 4 ? e.data.msg : e.msg
            });
        }

        throw e;
    } finally {
        if (needLoading) {
            loading.remove();
        }
    }

    return res;
}

export function get(...arg) {
    return request('get', ...arg);
}

export function post(...arg) {
    return request('post', ...arg);
}
