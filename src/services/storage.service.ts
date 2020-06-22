import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/shared/local_user";

@Injectable()
export class StorageService {


  getLocalUser(): LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if(user == null){
      return null;
    }else{
      return JSON.parse(user);
    }
  }

setLocalUser(localUser: LocalUser){
  if(localUser != null){
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
  } else {
    localStorage.removeItem(STORAGE_KEYS.localUser);
  }
}

getNavUsuario(): String[] {
  let navUser = localStorage.getItem(STORAGE_KEYS.navUser);
  if(navUser == null){
    return null;
  }else{
    return JSON.parse(navUser);
  }
}

setNavUsuario(navUsuario: String[]){
if(navUsuario != null){
  localStorage.setItem(STORAGE_KEYS.navUser, JSON.stringify(navUsuario));
} else {
  localStorage.removeItem(STORAGE_KEYS.localUser);
}
}


}