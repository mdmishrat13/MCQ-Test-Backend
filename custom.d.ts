type YouserTypes= {
    name:string,email:string,password:string
}
declare namespace Express {
    export interface Request {
      user?: YouserTypes; 
    }
  }