import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../server/student.service';

interface Student {
  id: number;
  name:String;
  average: number;
  alternant?: Boolean; //propriété optionnelle
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageTitle: String = 'Démo';
  students: Student[] = [];
  message: String = "";
  rawHtml: Boolean = false;

  constructor(private router: Router, private student_service: StudentService) { 
    this.getAllStudent();
  }

  async getAllStudent() {
    const response = await this.student_service.findAll();
    this.students = response;
    this.countAlternant();
  }

  onClick(studentId: number) {
    //utilisation du router
    this.router.navigate(['/student/'+studentId]);
  }

  onChange(studentName: String) {
    console.log(studentName);
    for(let i = 0; i < this.students.length; i++){
      if(studentName == this.students[i].name) {
        this.students[i].alternant = !this.students[i].alternant // true = false et false = true
        break; 
      }
    }
    this.countAlternant();
  }

  countAlternant() {
    let numAlternant = 0;
    this.students.forEach(student =>  {
      if(student.alternant) numAlternant++;
    });
    this.message = numAlternant+" étudiant(s) en alternance"; 
  }

}
