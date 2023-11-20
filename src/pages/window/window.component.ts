import { Component } from '@angular/core';
import { Tarea } from 'src/modelo/Tarea';
import { CrudService } from '../../app/services/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent {

  tarea: Tarea = new Tarea();
  tareas: Tarea[] = []
  
  constructor(private db: CrudService, private fire: ActivatedRoute){
    this.fire.params.subscribe(params => {
      console.log(params)
      if(params['nota']){
        this.loadPersona(params['nota'])
      }
    })
  }

  ngOnInit(): void {
    this.db.getTareas().subscribe((data: any) => {
      this.tareas = data;
    });
  }

  loadPersona(uid: string){
    this.db.getTarea(uid).subscribe(data => {
      console.log(data)
      this.tarea = <any>data
    })
  }
  
  selected(tarea: Tarea): void{
    this.tarea = tarea
  }

  save(){
    
      this.db.saveTarea(this.tarea)
      this.tarea = new Tarea()
  }
  edit(): void{
    const id = this.tarea.uid
    if(id){
      this.db.modifyTarea(id, this.tarea)
    }
  }
}
