import {
  ChangeDetectorRef,
  Component,
  Input,
  trigger,
  transition,
  style,
  animate
} from '@angular/core';

@Component({
  selector: 'app-slide',
  template: `
    <div *ngIf="active" [@enterAnimation]="reverse"  [ngStyle]="{'color': color}">
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./slide.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition('void => reverse', [
          style({ transform: 'translateX(50%) rotateY(67deg)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0) rotateY(0deg)', opacity: 1 }))
        ]),
        transition('reverse => void', [
          animate('500ms', style({ transform: 'translateX(-50%) rotateY(-67deg)', opacity: 0 }))
        ]),
        transition('void => forward', [
          style({ transform: 'translateX(-50%) rotateY(-67deg)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0) rotateY(0deg)', opacity: 1 }))
        ]),
        transition('forward => void', [
          animate('500ms', style({ transform: 'translateX(50%) rotateY(67deg)', opacity: 0 }))
        ]),
      ]
    )
  ]
})
export class SlideComponent {
  @Input() bgColor = '';
  @Input() color = '';
  public changeDetectorRef: ChangeDetectorRef;
  public active: boolean;
  public reverse: string;
  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }
}
