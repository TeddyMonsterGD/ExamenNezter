namespace ExamenAPI.Models
{
    public class User
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string CodigoPostal { get; set; }
        public string TipoUsuario { get; set; }
        public int EstadoId { get; set; }
        public int CiudadId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
