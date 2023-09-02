import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() estado: string = '';
  @Input() color: string = '';
}
