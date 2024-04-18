import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SettingsService } from 'app/modules/admin/settings/settings.service';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule],
})
export class SettingsAccountComponent implements OnInit
{
    @ViewChild('updateUser') updateUserNgForm: NgForm;
    accountForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    user: User;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _settingsService: SettingsService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the user
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) =>
            {
                this.user = user;

                // Create the form
                this.accountForm = this._formBuilder.group({
                    name    : [this.user.name, Validators.required],
                    last_name: [this.user.last_name,],
                    second_last_name: [this.user.second_last_name],
                    email   : [this.user.email,],
                    telephone   : [this.user.phone,],
                });
            });
    }

    submit(): void
    {
        if (this.accountForm.invalid)
        {
            this._fuseConfirmationService.open({
                title: 'Error',
                message: 'Resive los campos marcados en rojo.',
                actions: {
                    confirm: {
                        label: 'Entendido'
                    },
                    cancel: {
                        show: false
                    }
                }
            });
            return;
        }

        this._settingsService.updateAccount(this.accountForm.value, this.user.id)
            .subscribe(() =>
            {
                this._fuseConfirmationService.open({
                    title: 'Hecho',
                    message: 'Los cambios han sido guardados.',
                    icon: {
                        show: true,
                        name: 'check',
                        color: 'success'
                    },
                    actions: {
                        confirm: {
                            label: 'Entendido',
                            color: 'primary'
                        },
                        cancel: {
                            show: false
                        }
                    }
                });
            }, () => {
                this._fuseConfirmationService.open({
                    title: 'Error',
                    message: 'Ha ocurrido un error, por favor intenta de nuevo.',
                    actions: {
                        confirm: {
                            label: 'Entendido'
                        },
                        cancel: {
                            show: false
                        }
                    }
                });
            });


        // Do something
    }
}
