import { v4 as uuidv4 } from 'uuid';

function getUserTempId(){
  //生成用户临时ID
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  if(!userTempId){//如果获取不到，那就没有生成过临时ID
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  return userTempId
}
export {
  getUserTempId
}