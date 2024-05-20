import { NgClass, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { QuotesService } from 'app/modules/admin/quotes/quotes.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { forEach } from 'lodash';

import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector       : 'preview-quote',
    templateUrl    : './preview.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
        FormsModule,
        TranslocoModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        CurrencyPipe,
        NgClass,
        NgFor,
        NgIf,

        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTabsModule,

        NgApexchartsModule
    ],
})

export class ResumeComponent implements OnInit
{
    basicChar: ApexOptions = {};
    basicCharData: any = [];

    baseChar: ApexOptions = { };
    baseCharData: any = [];

    puntaChar: ApexOptions = { };
    puntaCharData: any = [];

    data: any = {
        columns: [
            'month',
            'subtotal',
            'iva',
            'total'
        ],
        rows: [ ]
    };
    isLoaded: boolean = false;

    dataYear: any = {
        consumoBase: 0,
        consumoIntermedio: 0,
        consumoPunta: 0,
        kWanio: 0,
        kVrah: 0,
        factorPotencia: 0,
        demandaBase: 0,
        demandaIntermedia: 0,
        demandaPunta: 0,
        cobroSuministro: 0,
        cobroDistribucion: 0,
        cobroTransmision: 0,
        cobroCenace: 0,
        genB: 0,
        genI: 0,
        genP: 0,
        cobroCapacidad: 0,
        cobroSCnMEM: 0,
        cobroform: 0,
        cobroTension: 0,
        subtotal: 0,
        iva: 0,
        alumbrado: 0,
        total: 0
    };

    quote: any = null;

    /**
     * Constructor
     */
    constructor(
        private _quotesService: QuotesService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _route: ActivatedRoute
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
        const quoteId = this._route.snapshot.paramMap.get('id');
        if (quoteId != null && quoteId != undefined) {
            this._quotesService.getQuote(quoteId).subscribe((response) => {
                let monthlyConsumption = JSON.parse(response.quote.monthlyConsumption);
                this.quote = response.quote;
                let i = 0;
                forEach(monthlyConsumption, (value) => {
                    let data ={ };

                    let section = this.getKey(i, response.quote.tariff);

                    if (response.quote.tariff == 'PDBT') {
                        data = {
                            month: this.getMonth(i) + ' - ' + this.getMonth(++i),
                            subtotal: monthlyConsumption[section].subtotal,
                            iva: monthlyConsumption[section].iva,
                            total: monthlyConsumption[section].total
                        }
                    } else {
                        data = {
                            month: this.getMonth(i),
                            subtotal: monthlyConsumption[section].subtotal,
                            iva: monthlyConsumption[section].iva,
                            total: monthlyConsumption[section].total
                        }

                        this.baseCharData.push(monthlyConsumption[section].consumoBase);
                        this.puntaCharData.push(monthlyConsumption[section].consumoPunta);
                    }
                    this.basicCharData.push(monthlyConsumption[section].consumoIntermedio);
                    this.data.rows.push(data);
                    i++;
                });

                let yearConsumption = JSON.parse(response.quote.annualConsumption);

                this.dataYear = {
                    consumoBase: yearConsumption.consumoBase,
                    consumoIntermedio: yearConsumption.consumoIntermedio,
                    consumoPunta: yearConsumption.consumoPunta,
                    kWanio: yearConsumption.kWAnioMovil,
                    kVrah: yearConsumption.kVrah,
                    factorPotencia: yearConsumption.factorPotencia,
                    demandaBase: yearConsumption.demandaBase,
                    demandaIntermedia: yearConsumption.demandaIntermedia,
                    demandaPunta: yearConsumption.demandaPunta,
                    cobroSuministro: yearConsumption.suministro,
                    cobroDistribucion: yearConsumption.distribucion,
                    cobroTransmision: yearConsumption.transmision,
                    cobroCenace: yearConsumption.cenace,
                    genB: yearConsumption.generacionB,
                    genI: yearConsumption.generacionI,
                    genP: yearConsumption.generacionP,
                    cobroCapacidad: yearConsumption.capacidad,
                    cobroSCnMEM: yearConsumption.SCnMEM,
                    cobroform: yearConsumption.cobroform,
                    cobroTension: yearConsumption.bTension,
                    subtotal: yearConsumption.subtotal,
                    iva: yearConsumption.iva,
                    alumbrado: yearConsumption.aPublico,
                    total: yearConsumption.total
                };

                this.makeChars();

                this.isLoaded = true;
            });
        } else {
            this._fuseConfirmationService.open({
                title: 'Advertencia',
                message: 'No se encontro la cotización solicitada.',
                actions: {
                    confirm: {
                        label: 'Aceptar'
                    }
                }
            })
            this._router.navigate(['/quotes']);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    getMonth(n: Number): string
    {
        switch (n) {
            case 0:
                return 'Enero';
            case 1:
                return 'Febrero';
            case 2:
                return 'Marzo';
            case 3:
                return 'Abril';
            case 4:
                return 'Mayo';
            case 5:
                return 'Junio';
            case 6:
                return 'Julio';
            case 7:
                return 'Agosto';
            case 8:
                return 'Septiembre';
            case 9:
                return 'Octubre';
            case 10:
                return 'Noviembre';
            case 11:
                return 'Diciembre';
            default:
                return '';
        }
    }

    getKey(n: Number, type: string): string
    {
        switch (n) {
            case 0:
                return 'primero';
            case 1:
                return 'segundo';
            case 2:
                if (type == 'PDBT') {
                    return 'segundo';
                }
                return 'tercero';
            case 3:
                return 'cuarto';
            case 4:
                if (type == 'PDBT') {
                    return 'tercero';
                }
                return 'quinto';
            case 5:
                return 'sexto';
            case 6:
                if (type == 'PDBT') {
                    return 'cuarto';
                }
                return 'septimo';
            case 7:
                return 'octavo';
            case 8:
                if (type == 'PDBT') {
                    return 'quinto';
                }
                return 'noveno';
            case 9:
                return 'decimo';
            case 10:
                if (type == 'PDBT') {
                    return 'sexto';
                }
                return 'onceavo';
            case 11:
                return 'doceavo';
        }
    }

    makeChars(): void
    {
        let categories = [];
        if (this.quote.tariff == 'PDBT') {
            categories = [
                "Ene - Feb",
                "Mar - Abr",
                "May - Jun",
                "Jul - Ago",
                "Sep - Oct",
                "Nov - Dic"
            ];
        } else {
            categories = [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ];
        }

        this.basicChar = {
            series: [
                {
                    name: "kWh",
                    data: this.basicCharData
                }
                ],
                chart: {
                    height: 350,
                    type: "bar"
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: "top" // top, center, bottom
                        }
                    }
                },
                xaxis: {
                    categories: categories,
                    position: "top",
                    labels: {
                    offsetY: -18
                    },
                    axisBorder: {
                    show: false
                    },
                    axisTicks: {
                    show: false
                    },
                    crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5
                        }
                    }
                    },
                    tooltip: {
                    enabled: true,
                    offsetY: -35
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                    shade: "light",
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    }
                },
                yaxis: {
                    axisBorder: {
                    show: false
                    },
                    axisTicks: {
                    show: false
                    },
                    labels: {
                    show: false,
                    formatter: function(val) {
                        return val + "%";
                    }
                    }
                },
                title: {
                    text: "Consumo intermedio",
                    offsetY: 320,
                    align: "center",
                    style: {
                        color: "#444"
                    }
            }
        };

        if (this.quote.tariff != 'PDBT') {
            this.baseChar = {
                series: [
                    {
                        name: "kWh",
                        data: this.baseCharData
                    }
                ],
                chart: {
                    height: 350,
                    type: "bar"
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: "top" // top, center, bottom
                        }
                    }
                },
                xaxis: {
                    categories: categories,
                    position: "top",
                    labels: {
                    offsetY: -18
                    },
                    axisBorder: {
                    show: false
                    },
                    axisTicks: {
                    show: false
                    },
                    crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5
                        }
                    }
                    },
                    tooltip: {
                    enabled: true,
                    offsetY: -35
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                    shade: "light",
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    }
                },
                yaxis: {
                    axisBorder: {
                    show: false
                    },
                    axisTicks: {
                    show: false
                    },
                    labels: {
                    show: false,
                    formatter: function(val) {
                        return val + "%";
                    }
                    }
                },
                title: {
                    text: "Consumo base",
                    offsetY: 320,
                    align: "center",
                    style: {
                        color: "#444"
                    }
                }
            };

            this.puntaChar = {
                series: [
                    {
                        name: "kWh",
                        data: this.puntaCharData
                    }
                ],
                chart: {
                    height: 350,
                    type: "bar"
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: "top" // top, center, bottom
                        }
                    }
                },
                xaxis: {
                    categories: categories,
                    position: "top",
                    labels: {
                    offsetY: -18
                    },
                    axisBorder: {
                    show: false
                    },
                    axisTicks: {
                    show: false
                    },
                    crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5
                        }
                    }
                    },
                    tooltip: {
                    enabled: true,
                    offsetY: -35
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                    shade: "light",
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    }
                },
                yaxis: {
                    axisBorder: {
                    show: false
                    },
                    axisTicks: {
                    show: false
                    },
                    labels: {
                    show: false,
                    formatter: function(val) {
                        return val + "%";
                    }
                    }
                },
                title: {
                    text: "Consumo punta",
                    offsetY: 320,
                    align: "center",
                    style: {
                        color: "#444"
                    }
                }
            };
        }
    }
}
