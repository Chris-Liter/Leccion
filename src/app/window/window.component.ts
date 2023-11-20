import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/modelo/Tarea';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit{

  //Clase tarea inicializada
  tarea: Tarea = new Tarea();
  //Arreglo de tarea donde se van a mostrar los datos de la base de datos
  tareas: Tarea[] = []
  
  constructor(private db: CrudService){
    
  }

  /*
   Este metodo onInit se inicializara despues de cargar el proyecto, y segun mi investigacion, es muy bueno utilizarlo para cargar datos, servicios entre otros
   este getTareas es un metodo del servicio, el suscribe lo usaremos, creamos un dato 'data' y este sera igual a this.tareas, y porque?, porque tareas es un
   vector que hemos creado al inicio del codigo, un vector, donde se mostraran en ventana los elementos de la base de datos
  */
  ngOnInit(): void {
    this.db.getTareas().subscribe((data: any) => {
      this.tareas = data;
    });
  }
  
  /**
   Este selected nos sirve para obtener el objeto de la tarea, al presionar en una de las tareas del listado, los campos del formulario
   se llenan con los datos de la tarea seleccionada, para asi este poderlo editar
   */
  selected(tarea: Tarea): void{
    this.tarea = tarea
  }
/**
 Para guardar solo llamamos a saveTarea creado en el servicio, donde mandamos la clase tarea que sera creada en el formulario
 */
  save(){
    
      this.db.saveTarea(this.tarea)
      this.tarea = new Tarea()
  }
  /**
    Editar crea una constante para guardar el uid de la tarea
    El condicional valida si existe y llamamos a la funcion modifyTarea, donde mandamos el id que creamos como constante y el this.tarea, como la clase
  */
  edit(): void{
    const id = this.tarea.uid
    if(id){
      this.db.modifyTarea(id, this.tarea)
      this.tarea = new Tarea()
    }
  }
}
