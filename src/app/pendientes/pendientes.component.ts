import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import {PendienteService} from './pendiente.service';
import {Pendiente} from './pendiente';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})

export class PendientesComponent implements OnInit {
 pendientes: Pendiente[];
 pendiente:Pendiente;
 pantallaMostar:boolean;
 titulo:string;
 confirmar:boolean;
 btnAcepActu:string;
 contador:number;

  constructor(private pendienteService:PendienteService,
              private router:Router,
              private route:ActivatedRoute) {
    //Mostrar pantalla true =List y false = NewEdit
    this.confirmar=null;
  }
  ngOnInit() {
    this.mostrarList()
    this.getAllPendientes()
   }

  getAllPendientes(){
    this.pendienteService.getPendienteAll().subscribe(
      pendientes=>this.pendientes=pendientes
  /*   result=>{
      //  this.pendientes=result;
        alert(result);
       },
      error =>{
        var errorMensaje=<any>error;
        console.log(errorMensaje)
        alert("asdas->"+errorMensaje)
      }*/
    )
  }

  create(){
     this.pendienteService.create(this.pendiente).subscribe(
      json =>{
                this.getAllPendientes()
                 swal(`Nombre: ${json.pendiente.nombre}`,` ${json.mensaje}`,"success");
                   },
      error=>{
                console.log(<any>error)
      }
    )
  }
  cargarPendiente(id,btn){
      if(id){
        this.mostrarNewEdit(btn)
        this.pendienteService.getPendiente(id).subscribe(
          (pendiente) => this.pendiente = pendiente
        )
      }

  }
  update():void{
     this.pendienteService.update(this.pendiente).subscribe(
      json =>{
                this.getAllPendientes()
                this.mostrarList()
                 swal(`Nombre:${json.pendiente.nombre}`,`${json.mensaje}`,"success");
                   },
      error=>{
                console.log(<any>error)
      }
    )
  }

  delete(pendiente:Pendiente): void {
    this.pendienteService.delete(pendiente.id).subscribe(
      response =>{
        this.pendientes=this.pendientes.filter(pen=>pen!==pendiente)
        swal("Eliminado!",
             `Pendiente: ${pendiente.nombre} Eliminado con exito`,
            "success",
        );
        this.deleteCancelar()
      }
    )
  }
  mostrarNewEdit(btn){
    this.pendiente= new Pendiente(0,"","");
    this.pantallaMostar=false;
    this.btnAcepActu=btn;
    this.titulo='Nuevo';
  }
  mostrarList(){
    this.getAllPendientes()
    this.pantallaMostar=true;
    this.titulo='Lista de Pendientes';
     }

 deleteConfirmar(id){
   this.confirmar=id;
 }

 deleteCancelar(){
   this.confirmar=null;
 }
}
