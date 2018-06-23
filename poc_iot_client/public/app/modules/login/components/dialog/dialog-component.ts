import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
//TODO later need replaced by wulf component when wulf is ready.
@Component({
  selector: 'sc-dialog',
  templateUrl: './dialog-component.html',
  styleUrls: ['./dialog-component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public ngOnInit() { }

  public close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}