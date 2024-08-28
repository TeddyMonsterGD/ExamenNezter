// src/app/user-list/user-list.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { response } from 'express';
import { Estado } from '../estado.model';
import { Ciudad } from '../ciudad.model';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  p: number = 1;

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


  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data.map(user => ({
        ...user,
        EstadoNombre: this.getEstadoNombre(user.EstadoId),
        CiudadNombre: this.getCiudadNombre(user.CiudadId)
      }));
      console.log(this.users); // Verifica los usuarios transformados
    });
  }


  // ngOnInit() {
  //   this.userService.getUsers().subscribe((data: any[]) => {
  //     this.users = data;
  //     console.log(data);
  //   });
  // }
  

  deleteUser(userId: number) {
    this.userService.deletePost(userId).subscribe(
      response => {
        console.log(userId);
        console.log('Usuario Eliminado', response);
        this.userService.getUsers().subscribe((data: any[]) => {
          this.users = data;
        });
        
      }
    )
  }

  getEstadoNombre(estadoId: number): string {
    const estado = this.estados.find(e => e.EstadoId === estadoId);
    return estado ? estado.Nombre : 'Desconocido';
  }

  getCiudadNombre(ciudadId: number): string {
    const ciudad = this.ciudades.find(c => c.CiudadId === ciudadId);
    return ciudad ? ciudad.Nombre : 'Desconocida';
  }

  
}
