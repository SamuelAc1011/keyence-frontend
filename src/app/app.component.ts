import {Component} from '@angular/core';
import {User} from "./core/interfaces/user";
import {KeyenceApiService} from "./core/services/keyence-api.service";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [];

  constructor(private keyenceService: KeyenceApiService) {
    this.signIn();
    this.keyenceService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  signIn(): void {
    this.keyenceService.logIn('kirs@gmail.com', '12345678').subscribe(() => {
      this.keyenceService.getUsers().subscribe((users) => {
        this.users = users;
      });
    });
  }

  onDeleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const bstr = e.target.result;
  //     const wb = XLSX.read(bstr, { type: 'binary' });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     const data = XLSX.utils.sheet_to_json(ws, { raw: false });
  //     console.log(data); // Aquí obtienes los datos en formato JSON con valores de celda como cadenas de texto
  //   };
  //   reader.readAsBinaryString(file);
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type: 'binary'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {raw: false});
      console.log(data); // Aquí obtienes los datos en formato JSON con valores de celda como cadenas de texto

      // Enviar cada elemento de "data" al endpoint
      data.forEach((item: any) => {
        // Verificar si la fila actual tiene datos
        if (Object.values(item).some((val) => val !== '')) {
          const payload = {
            id: item['User ID'],
            name: item['User Name'],
            date: item['Date'],
            punchIn: item['Punch In'],
            punchOut: item['Punch Out'],
          };
          this.keyenceService.createUser(payload).subscribe(() => {
            this.keyenceService.getUsers().subscribe((users) => {
              this.users = users;
            });
          });
        }
      });

    };
    reader.readAsBinaryString(file);
  }


  onButtonClick(event: any) {
    const fileInput = event.target.querySelector('input');
    if (fileInput) {
      fileInput.click();
    }
  }

}
