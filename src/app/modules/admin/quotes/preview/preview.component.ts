import { NgClass, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule  } from '@angular/forms';
import { Component, ViewEncapsulation, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { HomeService } from 'app/modules/admin/home/home.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
};

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
    ],
})

export class ResumeComponent implements OnInit, OnDestroy, AfterViewInit
{

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    data: any = {
        columns: [
            'month',
            'subtotal',
            'iva',
            'total'
        ],
        rows: [
            {
                month: 'Enero',
                subtotal: 100,
                iva: 21,
                total: 121
            },
            {
                month: 'Febrero',
                subtotal: 200,
                iva: 42,
                total: 242
            },
            {
                month: 'Marzo',
                subtotal: 300,
                iva: 63,
                total: 363
            },
            {
                month: 'Abril',
                subtotal: 400,
                iva: 84,
                total: 484
            },
            {
                month: 'Mayo',
                subtotal: 500,
                iva: 105,
                total: 605
            },
            {
                month: 'Junio',
                subtotal: 600,
                iva: 126,
                total: 726
            },
            {
                month: 'Julio',
                subtotal: 700,
                iva: 147,
                total: 847
            },
            {
                month: 'Agosto',
                subtotal: 800,
                iva: 168,
                total: 968
            },
            {
                month: 'Septiembre',
                subtotal: 900,
                iva: 189,
                total: 1089
            },
            {
                month: 'Octubre',
                subtotal: 1000,
                iva: 210,
                total: 1210
            },
            {
                month: 'Noviembre',
                subtotal: 1100,
                iva: 231,
                total: 1331
            },
            {
                month: 'Diciembre',
                subtotal: 1200,
                iva: 252,
                total: 1452
            }
        ]
    };


    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService
    )
    {
        this.chartOptions = {
            series: [
              {
                name: "Inflation",
                data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
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
            dataLabels: {
              enabled: true,
              formatter: function(val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: "12px",
                colors: ["#304758"]
              }
            },

            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ],
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
              text: "Monthly Inflation in Argentina, 2002",
              offsetY: 320,
              align: "center",
              style: {
                color: "#444"
              }
            }
          };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {

    }

    ngAfterViewInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
