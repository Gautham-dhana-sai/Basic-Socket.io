import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// const { io } = require('socket.io-client');
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  message: string = '';
  list: any = [];
  form: FormGroup;
  private socket: Socket;

  constructor() {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });
    this.socket = io('http://localhost:4000');
  }

  ngOnInit(): void {
    this.pullValue().subscribe((payload) => {
      this.list = [...this.list, payload.message];
    });
  }

  pullValue(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('msg', (payload) => {
        observer.next(payload);
      });
      return () => this.socket.disconnect();
    });
  }

  onSubmit() {
    console.log(this.form.value.message, this.list);
    this.socket.emit('msg', { message: this.form.value.message });
    this.form.reset();
  }
}
