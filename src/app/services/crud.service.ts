import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Tarea } from 'src/modelo/Tarea';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private path = '/objeto'

  referencia: AngularFirestoreCollection<any> 

  constructor(private db: AngularFirestore) {
    this.referencia = db.collection(this.path)

  }

  getTareas(){
    return this.referencia.valueChanges()
  }

  getTarea(nota: string){
    console.log('uid', nota)
    return this.db.doc(this.path + '/' + nota).valueChanges()
   }

  saveTarea(tarea: Tarea){
    const uid = this.db.createId()
    tarea.uid = uid
    this.referencia.doc(uid).set(Object.assign({}, tarea))
  }
  
  modifyTarea(id: string, tarea: Tarea): void{
    this.db.collection('objeto').doc(id).update(tarea)
   }

}
