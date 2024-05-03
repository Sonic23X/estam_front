import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SettingsService } from 'app/modules/admin/settings/settings.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';


@Component({
    selector       : 'settings-team',
    templateUrl    : './team.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, NgFor, NgIf, MatSelectModule, MatOptionModule, TitleCasePipe, FormsModule, ReactiveFormsModule],
})
export class SettingsTeamComponent implements OnInit
{
    members: any[];
    newMemberEmail: string;

    /**
     * Constructor
     */
    constructor(
        private _settingsService: SettingsService,
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
        // Subscribe to the settings
        this._settingsService.getTeam().subscribe((team) => {
            this.members = team.users;
        });
        // Setup the team members
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    newTeamMember(): void
    {
        var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!patron.test(this.newMemberEmail)) {
            this._fuseConfirmationService.open({
                title: 'Error',
                message: 'El email ingresado no es válido. Por favor, intenta de nuevo.',
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

        this._settingsService.newTeamMember({email: this.newMemberEmail}).subscribe(() => {
            this._fuseConfirmationService.open({
                title: 'Hecho',
                message: 'Miembro agregado correctamente.',
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
            this.members.push({
                avatar: 'assets/images/avatars/profile.jpg',
                name  : this.newMemberEmail,
                email : this.newMemberEmail,
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
