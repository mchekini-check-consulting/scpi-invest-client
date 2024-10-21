import { Component, OnInit } from '@angular/core';
import { ChartModule } from "primeng/chart";
import { StatScpiService } from "../../../core/service/stat-scpi.service";
import { Statistique } from "../../../core/model/statistique.model";

@Component({
    selector: 'app-stat-chart',
    standalone: true,
    imports: [ChartModule],
    templateUrl: './stat-chart.component.html',
    styleUrls: ['./stat-chart.component.css']
})
export class StatChartComponent implements OnInit {
    public regionChartData: any;
    public sectorChartData: any;
    public evolutionChartData: any;
    public options: any;
    private colors: string[];

    constructor(private statScpiService: StatScpiService) {
        this.colors = [];
    }

    ngOnInit(): void {
        this.loadStatistics();

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color').trim();

        this.colors = [
            documentStyle.getPropertyValue('--blue-500').trim(),
            documentStyle.getPropertyValue('--yellow-500').trim(),
            documentStyle.getPropertyValue('--green-500').trim(),
            documentStyle.getPropertyValue('--red-500').trim(),
            documentStyle.getPropertyValue('--purple-500').trim(),
            documentStyle.getPropertyValue('--orange-500').trim(),
            documentStyle.getPropertyValue('--cyan-500').trim(),
            documentStyle.getPropertyValue('--pink-500').trim()
        ];

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem: any) => {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        };
    }

    private loadStatistics() {
        this.statScpiService.getStatistiques().subscribe(
            (data: Statistique) => {
                const repartitionGeographiqueMap = new Map<string, number>(
                    Object.entries(data.localizations)
                );
                const repartitionSectorielleMap = new Map<string, number>(
                    Object.entries(data.sectors)
                );

                const evolutionPrixPartMap = new Map<string, Map<string, number>>();
                for (const [scpiName, prices] of Object.entries(data.partPrices)) {
                    evolutionPrixPartMap.set(scpiName, new Map<string, number>(Object.entries(prices)));
                }

                this.prepareChartData(repartitionGeographiqueMap, 'region');
                this.prepareChartData(repartitionSectorielleMap, 'sector');
                this.prepareEvolutionChartData(evolutionPrixPartMap);
            },
            (error) => {
                console.error('Erreur lors du chargement des statistiques', error);
            }
        );
    }

    private prepareChartData(data: Map<string, number>, type: 'region' | 'sector') {
        const labels = Array.from(data.keys());
        const percentages = Array.from(data.values());

        const chartData = {
            labels: labels,
            datasets: [
                {
                    data: percentages,
                    backgroundColor: this.colors,
                    hoverBackgroundColor: this.colors.map(color => this.adjustColorBrightness(color, -20))
                }
            ]
        };

        if (type === 'region') {
            this.regionChartData = chartData;
        } else {
            this.sectorChartData = chartData;
        }
    }

    private prepareEvolutionChartData(data: Map<string, Map<string, number>>) {
        const years = new Set<string>();
        const datasets = Array.from(data.entries()).map(([scpiName, prices], index) => {
            prices.forEach((_, year) => years.add(year));

            const scpiPrices = Array.from(years).map(year => {
                const price = prices.get(year);
                return price !== undefined ? price : 0;
            });

            return {
                label: scpiName,
                data: scpiPrices,
                fill: false,
                borderColor: this.colors[index % this.colors.length],
                tension: 0.4
            };
        });

        this.evolutionChartData = {
            labels: Array.from(years),
            datasets: datasets
        };
    }

    private adjustColorBrightness(hex: string, percent: number): string {
        const num = parseInt(hex.slice(1), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;

        return '#' + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
    }
}
