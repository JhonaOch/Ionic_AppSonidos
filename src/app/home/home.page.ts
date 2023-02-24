import { Component } from '@angular/core';

import { ANIMALES } from '../../assets/data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal) {
    console.log(animal);
    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(
      () => (animal.reproduciendo = false),
      animal.duracion * 1000
    );
  }


  private pausar_audio(animalSelecciona: Animal) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSelecciona.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrar_animal(index:number){

    this.animales.splice(index,1);

  }

  recargar($refresher:any){

    console.log('Inicio del refresh')

    setTimeout(() => {
        console.log('Termino del refresh');
        this.animales=ANIMALES.slice(0);
        $refresher.complete();
      },1500)
    }

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
      // The `from` and `to` properties contain the index of the item
      // when the drag started and ended, respectively
      console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

      // Finish the reorder and position the item in the DOM based on
      // where the gesture ended. This method can also be called directly
      // by the reorder group
      ev.detail.complete();
    }
}
