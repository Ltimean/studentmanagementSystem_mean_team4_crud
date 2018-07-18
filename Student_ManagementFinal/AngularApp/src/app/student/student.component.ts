import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StudentService } from '../shared/student.service';
import { Student } from '../shared/student.model';

declare var M: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {
genderMethod=["Male","Female","Others"];
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshStudentList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.studentService.selectedStudent = {

      _id: "",
      rollNo : null, 
      name: "",
      branch: "",
      age:  null,
      gender: "",
      contactNo: null,
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.studentService.postStudent(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshStudentList();
        M.toast({ html: 'Saved successfully'});
      });
    }
    else {
      this.studentService.putStudent(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshStudentList();
        M.toast({ html: 'Updated successfully'});
      });
    }
  }

  refreshStudentList() {
    this.studentService.getStudentList().subscribe((res) => {
      this.studentService.students = res as Student[];
    });
  }

  onEdit(stu: Student) {
    this.studentService.selectedStudent = stu;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.studentService.deleteStudent(_id).subscribe((res) => {
        this.refreshStudentList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
