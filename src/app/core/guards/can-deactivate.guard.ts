// back-block.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface BackBlockable {
  canLeaveByBack(): boolean;
}

@Injectable({ providedIn: 'root' })
export class BackBlockGuard implements CanDeactivate<BackBlockable> {
  canDeactivate(component: BackBlockable): Observable<boolean> | boolean {
    return component.canLeaveByBack();
  }
}
