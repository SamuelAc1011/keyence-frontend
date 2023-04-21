import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../core/interfaces/user";
import {KeyenceApiService} from "../../core/services/keyence-api.service";

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() onDelete = new EventEmitter<string>();

  constructor(private keyenceService: KeyenceApiService) {
  }

  deleteRecord(id: string): void {
    this.keyenceService.deleteUser(id).subscribe(() => {
      this.onDelete.emit(id);
    });

  }
}
