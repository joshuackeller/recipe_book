// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT




export interface User {
    id: number,
    name: string,
    phone: string,
    accessCode?: AccessCode,
    recipes: Recipe[],
    tags: Tag[],
    groups: UserGroup[],
    createdAt: Date,
    updatedAt: Date,
}

export interface UserGroup {
    userId: number,
    user: User,
    groupId: number,
    group: Group,
    autoAddRecipes: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface Group {
    id: number,
    name: string,
    users: UserGroup[],
    invitations: GroupInvite[],
    createdAt: Date,
    updatedAt: Date,
}

export interface GroupInvite {
    id: number,
    phone: string,
    groupId: number,
    group: Group,
}

export interface AccessCode {
    code: number,
    attempts: number,
    userId: number,
    user: User,
    createdAt: Date,
}

export interface Recipe {
    id: number,
    name: string,
    html: string,
    userId: number,
    user: User,
    tags: Tag[],
    createdAt: Date,
    updatedAt: Date,
}

export interface Tag {
    id: number,
    name: string,
    userId: number,
    user: User,
    recipes: Recipe[],
}
