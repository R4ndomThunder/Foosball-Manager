import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // This lets me use jquery
  constructor() { }

  ngOnInit() {
  }

  showModal(id): void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    this.hideModal();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

}
