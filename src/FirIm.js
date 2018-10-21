'use strict';
/**
 * FirIm
 * @flow
 */
import{
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
var FirIm = {};

FirIm.IOS_ID = '';
FirIm.ANDROID_ID = '';
FirIm.API_TOKEN = '';
/**
 * 初始化配置参数
 * @param  {[type]} ios_id     [description]
 * @param  {[type]} android_id [description]
 * @param  {[type]} api_id     [description]
 * @return {[type]}            [description]
 */
FirIm.init = function(ios_id:string,android_id:string,api_id:string){
  FirIm.IOS_ID = ios_id;
  FirIm.ANDROID_ID = android_id;
  FirIm.API_TOKEN = api_id;
}
/**
 * 校验
 * @return {[type]} [description]
 */
FirIm.check = function():boolean{
  if(FirIm.IOS_ID&&FirIm.ANDROID_ID&&FirIm.API_TOKEN){
    return true;
  }else{
    return false;
  }
}
/**
 * 版本查询
 * http://api.fir.im/apps/latest/xxx?api_token=xxx
 */
FirIm.queryVersion = function():Promise<any> {
  return new Promise(function (resolve, reject) {
    if(!FirIm.check()){
      console.error('---fir.im 请初始化配置参数');
      reject('请初始化配置参数');
      return;
    }
    let base_url = 'http://api.fir.im/apps/latest';
    let id = '';
    if(Platform.OS  === 'ios'){
      id = FirIm.IOS_ID;
    }
    if(Platform.OS === 'android'){
      id = FirIm.ANDROID_ID;
    }
    if(!id){
      console.error('---fir.im 获取ID失败');
      reject('获取ID失败');
      return;
    }
    let url = base_url+'/'+id;
    let params = {
      api_token:FirIm.API_TOKEN
    }
    console.log('---queryVersion url:',url)
    FirIm.get(url,params).then((res)=>{
        resolve(res);
    }).catch(err=>{
        reject(err);
    });
  });
}

FirIm.get = function(url:string,params:any):Promise<void> {
     return new Promise(function (resolve, reject) {
       if(!FirIm.check()){
         console.error('---fir.im 请初始化配置参数');
         reject('请初始化配置参数');
         return;
       }
         if (params) {
             let paramsArray = [];
             //拼接参数
             Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
             if (url.search(/\?/) === -1) {
                 url += '?' + paramsArray.join('&')
             } else {
                 url += '&' + paramsArray.join('&')
             }
         }
         fetch(url).then((response) => response.json())
         .then((responseData)=> {
             console.log('---fir.im responseData:', responseData);
             resolve(responseData);
         })
         .catch((err)=> {
             console.log('---fir.im  err:', err);
             reject(err);
         });
     });
 }

export default FirIm;
