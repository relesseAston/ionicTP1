import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../server/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  studentId: String = "";
  studentTab = [];
  messageAlternance : String = "je ne suis pas alternant";

  constructor(private route: ActivatedRoute, private router: Router, private student_service: StudentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.studentId = param.get('id');
    });
    this.getStudentId();
  }

  async getStudentId() {
    var id_student: number = +this.studentId;
    const response = await this.student_service.findById(id_student);
    var isAlternant = response['alternant'];
    if(isAlternant) this.messageAlternance = "je suis alternant";
    this.studentTab = [response];
    console.log(this.studentTab);
  }

  onClick(studentId: number) {
    //utilisation du router
    this.router.navigate(['/home']);
  }





}
