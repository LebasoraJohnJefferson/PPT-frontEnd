export interface Auth{
    email:string
    password:string
}

export interface Auth2{
    username:string
    password:string
}

export interface Token{
    token:string
    [key:string]:string
}
