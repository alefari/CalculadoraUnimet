export interface Roles {
  usuario?: boolean;
  admin?: boolean;
}

export interface Usuario {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles: Roles;
}
