export interface User {
  UsuarioId: number;
  Nombre: string;
  Direccion: string;
  Telefono: string;
  CodigoPostal: string;
  TipoUsuario: string;
  EstadoId: number;
  CiudadId: number;
  Login: string;
  Password: string;

  EstadoNombre?: string;
  CiudadNombre?: string;
}
