import { Injectable } from '@angular/core';

/**
 * User service HTTP. 
 * You are required to implement the following 3 methods/funtion. 
 * This is only a base structure, you may want to modify, add, remove stuff, or even restart from scratch. 
 */

export interface UserServiceI {
  login();
  register();
  activate();
}

@Injectable()
export class UserService implements UserServiceI {
  
  constructor() { }
  
  login() {
    // TODO: 
    throw new Error("Method not implemented.");
  }
  register() {
    // TODO: 
    throw new Error("Method not implemented.");
  }
  activate() {
    // TODO: 
    throw new Error("Method not implemented.");
  }
}
