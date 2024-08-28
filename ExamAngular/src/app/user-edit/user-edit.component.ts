import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service'; // Ajusta la ruta según tu estructura
import { User } from '../user.model'; // Ajusta la ruta según tu estructura
import { Estado } from '../estado.model';
import { Ciudad } from '../ciudad.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  usuarioid: number = 0;
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  codigoPostal: string = '';
  tipoUsuario: string = '';
  estadoId: number = 0;
  ciudadId: number = 0;
  login: string = '';
  password: string = '';

  userForm: FormGroup;

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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      UsuarioId: [''], 
      Nombre: [''],
      Direccion: [''],
      Telefono: [''],
      CodigoPostal: [''],
      TipoUsuario: [''],
      EstadoId: [''],
      CiudadId: [''],
      Login: [''],
      Password: ['']
    });
  }

  ngOnInit() {
    this.loadUser();
    
  }

  loadUser() {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    if (userId) {
      this.userService.getUserById(userId).subscribe((response: User[]) => {
        const user = response[0]; 
        console.log(user); 
        this.usuarioid = userId;
        this.nombre = user.Nombre;
        this.direccion = user.Direccion;
        this.telefono = user.Telefono;
        this.codigoPostal = user.CodigoPostal;
        this.tipoUsuario = user.TipoUsuario;
        this.estadoId = user.EstadoId;
        this.ciudadId = user.CiudadId;
        this.login = user.Login;
        this.password = user.Password;
        this.userForm.get('EstadoId')?.valueChanges.subscribe(value => this.onEstadoChange());

        this.userForm.patchValue(user);
      });
    }
  }

  onEstadoChange() {

    const userId = +this.route.snapshot.paramMap.get('id')!;
    const userCE={
      UsuarioId: userId ,
      EstadoId: this.estadoId,
      CiudadId: this.ciudadId,
    }
    console.log(this.estadoId)
    console.log(this.ciudadId)
    userCE.EstadoId = +userCE.EstadoId;
    console.log('Estado seleccionado:', userCE.EstadoId);
    this.filteredCiudades = this.ciudades.filter(c => c.EstadoId === userCE.EstadoId);
    console.log('Ciudades filtradas:', this.filteredCiudades);
  }

  onSubmit() {
    if (this.userForm.valid) {

      const userId = +this.route.snapshot.paramMap.get('id')!;
      const newuser={
        UsuarioId: userId ,
        Nombre: this.nombre,
        Direccion: this.direccion,
        Telefono: this.telefono,
        CodigoPostal: this.codigoPostal,
        TipoUsuario: this.tipoUsuario,
        EstadoId: this.estadoId,
        CiudadId: this.ciudadId,
        Login: this.login,
        Password: this.password
      }
      console.log(newuser);
      this.userService.updateUser(newuser).subscribe(() => {
        this.router.navigate(['/menu/user-list']);
      });
    }
  }
}
