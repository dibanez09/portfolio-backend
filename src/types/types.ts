
export interface IError {
    message: string
}

export interface IUserData {
    authUser: IUser
    group: IGroup
    privileges: IPrivilege[]
}

export interface IUser {
    username: string
    password: string
}

export interface IGroup {
    id: number
    name: string
    level: number
}

export interface IPrivilege {
    id: number
    name: string
    tag: string
}