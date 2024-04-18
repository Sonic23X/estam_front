import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsService } from 'app/modules/admin/settings/settings.service';
import { User } from 'app/core/user/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatButtonModule],
})
export class SettingsSecurityComponent implements OnInit
{
    securityForm: UntypedFormGroup;
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _settingsService: SettingsService,
        private _userService: UserService,
        private _fuseConfirmationService: FuseConfirmationService,
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
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) =>
            {
                this.user = user;
            });

        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : [''],
            newPassword      : [''],
            twoStep          : [true],
            askPasswordChange: [false],
        });
    }

    submit(): void
    {
        if (this.securityForm.get('currentPassword').value != this.securityForm.get('newPassword').value) {
            this._fuseConfirmationService.open({
                title: 'Error',
                message: 'Las contraseñas no coinciden. Por favor, intenta de nuevo.',
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

        this._settingsService.changePassword(this.securityForm.value, this.user.id)
            .subscribe(() =>
                {
                    this._fuseConfirmationService.open({
                        title: 'Hecho',
                        message: 'Contraseña actualizada correctamente.',
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
    }
}
