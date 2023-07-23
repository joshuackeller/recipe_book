// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT

export interface User {
  id: number;
  name: string;
  phone: string;
  accessCode?: AccessCode;
  recipes: Recipe[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessCode {
  code: number;
  attempts: number;
  userId: number;
  user: User;
  createdAt: Date;
}

export interface Recipe {
  id: number;
  name: string;
  html: string;
  userId: number;
  user: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: number;
  name: string;
  userId?: number;
  user?: User;
  recipe?: Recipe[];
}
