using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.Data.SqlClient;
using ExamenAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace ExamenAPI.Controllers
{
    [EnableCors("AllowAll")]
    public class UserController : Controller
    {
        SqlConnection con = new SqlConnection(Environment.GetEnvironmentVariable("DBConexion"));

        [HttpGet]
        [Route("List")]
        public IActionResult listarUsuarios()
        {
            

            using (con)
            {
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = new SqlCommand("GetUsuarios", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    List<Dictionary<string, object>> usuarios = new List<Dictionary<string, object>>();

                    foreach (DataRow row in dt.Rows)
                    {
                        Dictionary<string, object> usuario = new Dictionary<string, object>();

                        foreach (DataColumn column in dt.Columns)
                        {
                            usuario[column.ColumnName] = row[column.ColumnName];
                        }

                        usuarios.Add(usuario);
                    }

                    return Ok(usuarios);
                }
                else
                {
                    return NotFound("No data found");
                }
            }
        }
        [EnableCors("AllowAll")]
        [HttpPost]
        [Route("Save")]

        public dynamic SaveUsuarios([FromBody] User user)
        {
            using (con)
            {
                SqlDataAdapter da = new SqlDataAdapter();
                da.InsertCommand = new SqlCommand("PostUsuario", con);
                da.InsertCommand.CommandType = CommandType.StoredProcedure;
                da.InsertCommand.Parameters.AddWithValue("@Nombre", user.Nombre);
                da.InsertCommand.Parameters.AddWithValue("@Direccion", user.Direccion);
                da.InsertCommand.Parameters.AddWithValue("@Telefono", user.Telefono);
                da.InsertCommand.Parameters.AddWithValue("@CodigoPostal", user.CodigoPostal);
                da.InsertCommand.Parameters.AddWithValue("@TipoUsuario", user.TipoUsuario);
                da.InsertCommand.Parameters.AddWithValue("@EstadoId", user.EstadoId);
                da.InsertCommand.Parameters.AddWithValue("@CiudadId", user.CiudadId);
                da.InsertCommand.Parameters.AddWithValue("@Login", user.Login);
                da.InsertCommand.Parameters.AddWithValue("@Password", user.Password);

                con.Open();
                da.InsertCommand.ExecuteNonQuery();
                con.Close();
            }

            return new
            {
                success = true,
                message = "usuario registrado",
                result = user
            };
        }


        [HttpGet]
        [Route("UserId")]
        public IActionResult UserId(int Id)
        {
            using (con)
            {
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = new SqlCommand("UserId", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Id", Id);

                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    List<Dictionary<string, object>> usuarios = new List<Dictionary<string, object>>();

                    foreach (DataRow row in dt.Rows)
                    {
                        Dictionary<string, object> usuario = new Dictionary<string, object>();

                        foreach (DataColumn column in dt.Columns)
                        {
                            usuario[column.ColumnName] = row[column.ColumnName];
                        }

                        usuarios.Add(usuario);
                    }

                    return Ok(usuarios);
                }
                else
                {
                    return NotFound("No data found");
                }
            }
        }

        [HttpPut]
        [Route("Update")]
        public dynamic actualizarUsuario([FromBody] User usuario)
        {
            using (con)
            {
                SqlDataAdapter da = new SqlDataAdapter();
                da.UpdateCommand = new SqlCommand("UserUpdate", con);
                da.UpdateCommand.CommandType = CommandType.StoredProcedure;
                da.UpdateCommand.Parameters.AddWithValue("@UsuarioId", usuario.UsuarioId);
                da.UpdateCommand.Parameters.AddWithValue("@Nombre", usuario.Nombre);
                da.UpdateCommand.Parameters.AddWithValue("@Direccion", usuario.Direccion);
                da.UpdateCommand.Parameters.AddWithValue("@Telefono", usuario.Telefono);
                da.UpdateCommand.Parameters.AddWithValue("@CodigoPostal", usuario.CodigoPostal);
                da.UpdateCommand.Parameters.AddWithValue("@TipoUsuario", usuario.TipoUsuario);
                da.UpdateCommand.Parameters.AddWithValue("@EstadoId", usuario.EstadoId);
                da.UpdateCommand.Parameters.AddWithValue("@CiudadId", usuario.CiudadId);
                da.UpdateCommand.Parameters.AddWithValue("@Login", usuario.Login);
                da.UpdateCommand.Parameters.AddWithValue("@Password", usuario.Password);

                con.Open();
                da.UpdateCommand.ExecuteNonQuery();
                con.Close();
            }

            return new
            {
                success = true,
                message = "Usuario actualizado",
                result = usuario
            };
        }


        [HttpDelete]
        [Route("Delete")]
        public dynamic UserDelete(int UsuarioId)
        {
            using (con)
            {
                SqlDataAdapter da = new SqlDataAdapter();
                da.DeleteCommand = new SqlCommand("UserDelete", con);
                da.DeleteCommand.CommandType = CommandType.StoredProcedure;
                da.DeleteCommand.Parameters.AddWithValue("@UsuarioId", UsuarioId);

                con.Open();
                da.DeleteCommand.ExecuteNonQuery();
                con.Close();
            }

            return new
            {
                success = true,
                message = "Usuario eliminado",
            };
        }

        [HttpPost]
        [Route("Login")]
        public dynamic Login([FromBody] User loginData)
        {
            using (con)
            {
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = new SqlCommand("LoginAuth", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Login", loginData.Login);
                da.SelectCommand.Parameters.AddWithValue("@Password", loginData.Password);

                DataTable dt = new DataTable();
                con.Open();
                da.SelectCommand.ExecuteNonQuery();
                da.Fill(dt);
                con.Close();

                if (dt.Rows.Count > 0)
                {
                    return new
                    {
                        success = true,
                        message = "Login exitoso",
                        user = new
                        {
                            Login = dt.Rows[0]["Login"].ToString(),
                        }
                    };
                }
                else
                {
                    return new
                    {
                        success = false,
                        message = "Login fallido. Credenciales incorrectas."
                    };
                }
            }
        }



    }
}
