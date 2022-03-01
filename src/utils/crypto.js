
/*加密代码*/
import CryptoJS from 'crypto-js';
import qs from 'querystring';

const key = "h88SiwP21KW1guBlomAEaP4wLirmPwWv";  //十六位十六进制数作为密钥
const iv = 'VXDsz04UpWdN4OC3';   //十六位十六进制数作为密钥偏移量

//处理加密数据
/**
 * method:get post
 * params:类似get的请求参数
 * data:类似post的请求参数
 * type:decrypt 解密 encrypt 加密
 * url:类似get的请求路径 ?拼接
 */
export function handelEncryptedData({ method, url, params, data }, type) {
    //加密
    if (type == 'encrypt') {
        let encryptionData = ''
        //如果是get或者delete请求方式，加密方式不一样
        if (method == 'get' || method == 'delete') {
            if (params) {
                encryptionData = Encrypt(qs.stringify(params))
                url = `${url}?${encryptionData}`
                params = undefined
            }
            return { url, params }
        } else {
            // post put 请求方式加密
            encryptionData = Encrypt(JSON.stringify(data))
            data = encryptionData
            return { data }
        }
    } else {
        let decryptData = JSON.parse(Decrypt(arguments[0]))
        return decryptData
    }
}

//解密方法
export function Decrypt(text) {
    let baseResult = CryptoJS.enc.Base64.parse(text);   // Base64解密
    let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
    let decryptResult = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {    //  AES解密
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
    return resData;
}

//加密方法
export function Encrypt(text) {
    var srcs = CryptoJS.enc.Utf8.parse(text);
    var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
