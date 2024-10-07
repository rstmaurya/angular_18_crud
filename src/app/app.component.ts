import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  empObj :EmployeeModel =new EmployeeModel();
  empList :EmployeeModel[]=[]
  
  empForm :FormGroup =new FormGroup({});
  constructor(){

    this.createForm()
    const oldData =localStorage.getItem("EmpData");
    if(oldData !== null){
      const parseData=JSON.parse(oldData);
      this.empList=parseData;
  }
}
  createForm(){
    this.empForm =new FormGroup({
      empId :new FormControl(this.empObj.empId),
      name :new FormControl(this.empObj.name),
      city :new FormControl(this.empObj.city),
      address :new FormControl(this.empObj.address),
      contactNo :new FormControl(this.empObj.contactNo),
      emailId :new FormControl(this.empObj.emailId),
      pinCode :new FormControl(this.empObj.pinCode),
      state :new FormControl(this.empObj.state),
    })
  }

  onSave(){
    debugger;
    const oldData =localStorage.getItem("EmpData");
    if(oldData !== null){
      const parseData=JSON.parse(oldData);
      this.empForm.controls['empId'].setValue(parseData.length +1)
      this.empList.unshift(this.empForm.value)

    }else{
      this.empList.unshift(this.empForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.empList))

    this.empObj =new EmployeeModel();
   this.createForm();
  }

  onEdit(item:EmployeeModel){
    this.empObj =item;
    this.createForm();

  }

  onUpdate(){
  const record =this.empList.find(m=>m.empId==this.empForm.controls['empId'].value)
   if(record !=undefined){
    record.address=this.empForm.controls['address'].value
    record.name=this.empForm.controls['name'].value
    record.contactNo=this.empForm.controls['contactNo'].value
    record.emailId=this.empForm.controls['emailId'].value
    record.city=this.empForm.controls['city'].value
    record.state=this.empForm.controls['state'].value
   }
   localStorage.setItem("EmpData",JSON.stringify(this.empList))
   this.empObj =new EmployeeModel();
   this.createForm();

  }

  onDelete(id:number){
      const isDelete =confirm('Are u want to delete ?')
      if(isDelete){
        const index=this.empList.findIndex(m=>m.empId ==id)
        this.empList.splice(index,1)
        localStorage.setItem("EmpData",JSON.stringify(this.empList))

      }
  }
  
}
