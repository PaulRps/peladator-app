import { User } from './../../../../shared/models/user.model';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';
import { UserService } from '../../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleEnum } from 'src/app/shared/models/role.enum';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roles: RoleEnum[];
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogService: DialogService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    });
    this.userService.getFormData().subscribe(formData => {
      this.roles = formData.roles;
      if (this.data) {
        this.userForm.setValue({
          name: this.data.name,
          role: this.data.role,
          password: this.data.password,
        });
      }
    });
  }

  submit(isDelete: boolean) {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user = User.Build()
      .sName(this.f.name.value)
      .sPassword(this.f.password.value)
      .sRole(this.f.role.value);

    if (isDelete) {
      this.userService.delete(this.data.id).subscribe();
    } else if (this.data) {
      this.userService.update(user.sId(this.data.id)).subscribe();
    } else {
      this.userService.save(user).subscribe();
    }

    this.userForm.reset();
    this.dialogRef.close();
  }

  get f() {
    return this.userForm.controls;
  }

  close() {
    this.dialogRef.close();
  }
}
