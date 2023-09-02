import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
}
