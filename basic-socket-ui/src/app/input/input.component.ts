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
  user: string = ''
  username: string = ''

  private socket: Socket;

  constructor() {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });
    this.socket = io('http://localhost:4000');
  }

  ngOnInit(): void {
    this.pullValue().subscribe((payload) => {
      console.log(payload)
      this.list = payload;
    });
  }

  pullValue(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('msg', (payload: any) => {
        this.list.push(payload)
        observer.next(this.list);
        console.log(payload, this.list)
      });
      return () => this.socket.disconnect();
    });
  }

  onSubmit() {
    console.log(this.form.value.message, this.list);
    this.socket.emit('msg', { message: this.form.value.message, sent: this.user });
    this.form.reset();
  }

  selectUser(){
    this.user = this.username
    this.username = ''
  }
}
