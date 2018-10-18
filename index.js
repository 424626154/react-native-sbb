
import { NativeModules } from 'react-native';
import HttpUtil from './src/network/HttpUtil';

const { RNSbb } = NativeModules;

export default RNSbb;
export {
  HttpUtil
}
