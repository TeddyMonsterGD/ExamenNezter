import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Estado } from '../estado.model';
import { Ciudad } from '../ciudad.model';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})



export class UserFormComponent {

   user={
    Nombre: "",
    Direccion: "",
    Telefono: "",
    CodigoPostal: "",
    TipoUsuario: "",
    EstadoId: 0,
    CiudadId: 1,
    Login: "",
    password: ""
  }

  estados: Estado[] = [
    { EstadoId: 1, Nombre: 'Sonora' },
    { EstadoId: 2, Nombre: 'Nuevo León' }
  ];

  ciudades: Ciudad[] = [
    { CiudadId: 1, Nombre: 'Hermosillo', EstadoId: 1 },
    { CiudadId: 2, Nombre: 'Obregon', EstadoId: 1 },
    { CiudadId: 3, Nombre: 'Nogales', EstadoId: 1 },
    { CiudadId: 4, Nombre: 'Monterrey', EstadoId: 2 },
    { CiudadId: 5, Nombre: 'Santa Catarina', EstadoId: 2 }
  ];

  selectedEstadoId: number = 0;
  selectedCiudadId: number = 0;
  filteredCiudades: Ciudad[] = [];

  constructor(private userService: UserService) {}
    
  onEstadoChange() {
    this.user.EstadoId = +this.user.EstadoId;
    console.log('Estado seleccionado:', this.user.EstadoId);
    this.filteredCiudades = this.ciudades.filter(c => c.EstadoId === this.user.EstadoId);
    console.log('Ciudades filtradas:', this.filteredCiudades);
  }
  

  onSubmit(Nombre:string,Direccion:string,Telefono:string,CodigoPostal:string,TipoUsuario:string,EstadoId:number,CiudadId:number,login:string,Password:string) {
    const user={
      Nombre: Nombre,
      Direccion: Direccion,
      Telefono: Telefono,
      CodigoPostal: CodigoPostal,
      TipoUsuario: TipoUsuario,
      EstadoId: EstadoId,
      CiudadId: CiudadId,
      Login: login,
      Password: Password
    }

  console.log(user);

  this.userService.createUser(user).subscribe(
    response => {
      console.log('Usuario creado con éxito', response);
    },
    error => {
      console.error('Error al crear el usuario', error);
    }
  );
  
  this.user={
    Nombre: "",
    Direccion: "",
    Telefono: "",
    CodigoPostal: "",
    TipoUsuario: "",
    EstadoId: 0,
    CiudadId: 0,
    Login: "",
    password: ""
  }


  }
  
  
  
}
