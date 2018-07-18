import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Student } from './student.model';

@Injectable()
export class StudentService {
  selectedStudent: Student;
  students: Student[];
  readonly baseURL = 'http://localhost:3000/student';

  constructor(private http: HttpClient) { }

  postStudent(stu: Student) {
    return this.http.post(this.baseURL, stu);
  }

  getStudentList() {
    return this.http.get(this.baseURL);
  }

  putStudent(stu: Student) {
    return this.http.put(this.baseURL + `/${stu._id}`, stu);
  }

  deleteStudent(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
