'use strict';
/**
 * HttpUtil
 * @flow
 */
// import {
//     NetInfo,
// } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// import AppConf from '../AppConf';

var HttpUtil = {};


// HttpUtil.BASE_URL = AppConf.IP+AppConf.HOST;
HttpUtil.BASE_URL  = ''
console.log('---http url :'+HttpUtil.BASE_URL);

HttpUtil.post = function(rep_url:string,body:any):Promise<Object> {
  //检测网络是否连接
  // NetInfo.isConnected.fetch().done((isConnected)=>{
  //   console.log('---检测网络是否连接---');
  //     console.log(isConnected);
  // });
  var baseurl = HttpUtil.BASE_URL;
  var url = baseurl+'/'+rep_url;
  console.log('---url:'+url)
  console.log('---request post url:'+rep_url+' body:'+body);
  var that = this;
  return new Promise(function (resolve, reject){
    try {
      fetch(url,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: body,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('---response post  url:'+rep_url+' data:');
          console.log(responseJson);
          resolve(responseJson);
        })
        .catch((error) => {
            reject(error)
        });
    } catch (e) {
        console.error(e);
    } finally {

    }
  })
}


HttpUtil.postBuffer = function(rep_url:string,body:any):Promise<Object> {
  //检测网络是否连接
  // NetInfo.isConnected.fetch().done((isConnected)=>{
  //   console.log('---检测网络是否连接---');
  //     console.log(isConnected);
  // });
  var baseurl = HttpUtil.BASE_URL;
  var url = baseurl+'/'+rep_url;
  console.log('---request post url:'+rep_url+' body:'+body);
  var that = this;
  return new Promise(function (resolve, reject){
    try {
      fetch(url,{
          method: 'POST',
          body: body,
        })
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          console.log('---response post  url:'+rep_url+' data:');
          console.log(buffer);
          resolve(buffer);
        })
        .catch((error) => {
            reject(error)
        });
    } catch (e) {
        console.error(e);
    } finally {

    }
  })
}

// HttpUtil.uploadImage =(params:any):Promise<void> => {
//     return new Promise(function (resolve:any, reject:any) {
//         var ary = params.path.split('/');
//         console.log('ary:' + ary);
//         let formData = new FormData();
//         let file = {uri: params.path, type: 'multipart/form-data', name: ary[ary.length-1]};
//         formData.append("file",file);
//         var upimage = 'pimage/upload';
//         var baseurl = HttpUtil.BASE_URL;
//         var url = baseurl+'/'+upimage;
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Encoding': 'identity'
//             },
//             body: JSON.stringify(formData),
//         }).then((response) => response.json())
//         .then((responseData)=> {
//             console.log('uploadImage', responseData);
//             resolve(responseData);
//         })
//         .catch((err)=> {
//             console.log('err', err);
//             reject(err);
//         });
//     });
// };

HttpUtil.uploadImageData = function(imagedata:any,zoom:number=8):Promise<Object>{
  return new Promise(function (resolve, reject) {
      console.log(imagedata);
      let uri = imagedata['path'];
      let mime = imagedata['mime'];
      let mimes = mime.split('/');
      let itype =  mimes.length > 0?mimes[mimes.length-1]:'jpg';
      let uris = uri.split('/');
      let name = uris.length > 0 ? uris[uris.length-1]:Date.now()+itype;
      // const formData = new FormData();
      // let file = {uri: uri, type: 'multipart/form-data', name: name};   //这里的key(uri和type和name)不能改变,
      // formData.append("file",file);
      var uploadimg = 'picture/uploadimg';
      var baseurl = HttpUtil.BASE_URL;
      var url = baseurl+'/'+uploadimg;
      // fetch(url, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type':'multipart/form-data',
      //     },
      //     body: formData,
      // }).then((response) => response.json())
      // .then((responseData)=> {
      //     console.log('uploadImage', responseData);
      //     resolve(responseData);
      // })
      // .catch((err)=> {
      //     console.log('err', err);
      //     reject(err);
      // });
      let PATH = uri;
     // 创建上传的请求头，使用fetch-blob必须要遵循name，data的格式，要不然就不成功。
     let body = [{
         name: 'file',
         filename: name,
         data: RNFetchBlob.wrap(PATH)
     },{
       name:'info',
       data:JSON.stringify({zoom:zoom})
     }];
     RNFetchBlob
         .fetch('POST',url,{
             // 上传图片要设置Header
             'Content-Type' : 'multipart/form-data',
             // 'zoom':zoom,
         },body)
         .uploadProgress((written, total) => {
             // 本地查找进度
         })
         .progress((received, total) => {
             let perent = received / total;
              // 上传进度打印
             console.log(perent);
         })
         .then((response)=> response.json())
         .then((responseData)=> {
             // 上传信息返回
             console.log('uploadImage', responseData);
             resolve(responseData);
         })
         .catch((error)=>{
             // 错误信息
             console.log('err', error);
             reject(error);
         });
     });
};


export default HttpUtil;
