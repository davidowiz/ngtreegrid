import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Configs } from 'projects/ngtreegrid/src/lib/models/Configs.model';

@Component({
  selector: '[db-tree-cell-actions]',
  templateUrl: './tree-cell-actions.component.html',
  styleUrls: ['./tree-cell-actions.component.scss']
})
export class TreeCellActionsComponent implements OnInit {
  @Input()
  processed_data: any;

  @Input()
  edit_tracker: any;

  @Input()
  configs: Configs;

  @Input()
  rowdelete: EventEmitter<any>;

  @Input()
  data: any;

  @Output() editcomplete: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  enableEdit(index) {
    this.edit_tracker[index] = true;
  }

  findRecordIndex(idx: number) {
    for (const index in this.processed_data) {
      if (this.processed_data[index].idx === idx) {
        return index;
      }
    }
  }

  deleteRecord(rec) {
    if (this.configs.actions.resolve_delete) {
      const promise = new Promise((resolve, reject) => {
        this.rowdelete.emit({
          data: rec,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.processed_data.splice(this.findRecordIndex(rec.idx), 1);
      }).catch((err) => {});
    } else {
      this.processed_data.splice(this.findRecordIndex(rec.idx), 1);
      this.rowdelete.emit(rec);
    }
  }

  saveRecord($event) {
    this.editcomplete.emit({event: $event, data: this.data});
  }

}
