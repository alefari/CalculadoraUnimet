export class Beca {
  public id?: string;
  public nombre?: string;
  public porcentajes?: any[];
  public aplicaInscripcion?: boolean;
  public aplicaSeguro?: boolean;
  public matMax?: number;
  public habilitado?: boolean;

  constructor(id: string, nombre: string, porcentajes: any[], aplicaInscripcion: boolean, aplicaSeguro: boolean, matMax: number, habilitado: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.porcentajes = porcentajes;
    this.aplicaInscripcion = aplicaInscripcion;
    this.aplicaSeguro = aplicaSeguro;
    this.matMax = matMax;
    this.habilitado = habilitado;
  }
}
