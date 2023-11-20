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
  /**
   Nos devolvera el listado completo de la base de datos de nuestros documentos creados
   Todos los objetos como tarea que creamos
   */

  getTareas(){
    return this.referencia.valueChanges()
  }

  /**
  Guardamos con este metodo, creamos una constante uid y la igualaremos con db.createId() para identificarla
  tarea.uid donde sera igual a la constante
  y referencia.doc() donde mandamos uid que hemos creado dentro, y el set(para mandar el objeto que hemos creado)
  */
  saveTarea(tarea: Tarea){
    const uid = this.db.createId()
    tarea.uid = uid
    this.referencia.doc(uid).set(Object.assign({}, tarea))
  }
  /**
   Este modifyTarea, crearemos los argumentos id como string y tarea para la clase Tarea
   Tenemos el collection donde llamaremos al mi base de datos objeto, mandamos el id dentro del doc() que vendria a ser el uid de la tarea para identidicar el elemento
   que queremos editar, y .update(tarea) donde mandamos a la clase tarea para actualizar los datos de ese documento en la base de datos firebase 
   */
  modifyTarea(id: string, tarea: Tarea): void{
    this.db.collection('objeto').doc(id).update(tarea)
   }

}
