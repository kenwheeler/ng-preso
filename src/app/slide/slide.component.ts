import {
  ChangeDetectorRef,
  Component,
  trigger,
  transition,
  style,
  animate
} from '@angular/core';

@Component({
  selector: 'app-slide',
  template: `
    <div *ngIf="active" [@enterAnimation]="reverse">
      <div style="display: block;">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./slide.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition('void => reverse', [
          style({ transform: 'translateX(50%) rotateY(70deg)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0) rotateY(0deg)', opacity: 1 }))
        ]),
        transition('reverse => void', [
          animate('500ms', style({ transform: 'translateX(-50%) rotateY(-70deg)', opacity: 0 }))
        ]),
        transition('void => forward', [
          style({ transform: 'translateX(-50%) rotateY(-70deg)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0) rotateY(0deg)', opacity: 1 }))
        ]),
        transition('forward => void', [
          animate('500ms', style({ transform: 'translateX(50%) rotateY(70deg)', opacity: 0 }))
        ]),
      ]
    )
  ]
})
export class SlideComponent {
  public changeDetectorRef: ChangeDetectorRef;
  public active: boolean;
  public reverse: string;
  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }
}
