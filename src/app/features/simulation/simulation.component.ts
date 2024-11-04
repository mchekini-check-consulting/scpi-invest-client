import {Component, OnInit} from '@angular/core';
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from '@angular/common';
import {ScpiComponent} from "../scpi/scpi.component";
import {ScpiModel} from "../../core/model/scpi.model";
import {AddSimulationFormComponent} from "./add-simulation-form/add-simulation-form.component";
import {Localizations, ScpiDetailModel, Sectors} from "../../core/model/scpi-detail.model";
import {ScpiService} from "../../core/service/scpi.service";
import {Property, property_type, SimulatedScpiModel, userInvestmentInDto} from "../../core/model/scpi-simulated.model";
import {ScpiSimulationComponent} from "./scpi-simulation/scpi-simulation.component";
import {ChartModule} from "primeng/chart";
import {ScpiDetailComponent} from "../scpi/components/scpi-detail/scpi-detail.component";
import {ScpiDetailSimulationComponent} from "./scpi-detail-simulation/scpi-detail-simulation.component";
import {ScpiPerformanceSimulationComponent} from "./scpi-performance-simulation/scpi-performance-simulation.component";
import {Stripping} from "../../core/model/scpi-invest.model";
import {InvestService} from "../../core/service/invest.service";
import {TaxService} from "../../core/service/tax.service";
import {InputNumberModule} from "primeng/inputnumber";

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    ToggleButtonModule,
    FormsModule,
    SelectButtonModule,
    Button,
    DialogModule,
    InputTextModule,
    CommonModule,
    ScpiComponent,
    AddSimulationFormComponent,
    ScpiSimulationComponent,
    ChartModule,
    ScpiDetailComponent,
    ScpiDetailSimulationComponent,
    ScpiPerformanceSimulationComponent,
    InputNumberModule
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent implements OnInit {

  title: string = "TITRE";
  scpi: ScpiModel | undefined;
  scpiDetail: ScpiDetailModel | undefined;
  includeActualPort: boolean = false;
  EditDialogvisible: boolean = false;
  selectScpiDialogVisible: boolean = false;
  scpiSimulationFormDialogVisible: boolean = false;
  scpiSimulationFormDialogForModification: boolean = false;
  simulatedScpiList!: SimulatedScpiModel[][];
  investmentToModify!: SimulatedScpiModel | undefined;
  futureIncomesEveryYear!: Map<number, { accumulatedInvestment: number, accumulatedIncomes: number }>;
  futureIncomesEveryFiveYears!: Map<number, { incomes: number, revaluation: number, total: number }>

  totalValue!: number;
  totalMonthlyIncomes!: number;
  chartsName!: { name: string, totalInvest: number }[];
  valuePerCountryPercent!: Localizations;
  valuePerSectorPercent!: Sectors;
  totalCashback!: number;
  totalInvested!: number;
  tax!: number;
  monthlyIncomeAfterTax!: number;

  compoundInterestEnabled: boolean = false;
  revalorisationRate: number = 1.3;

  constructor(private scpiService: ScpiService, private investService: InvestService,
              private taxService: TaxService) {
  }

  ngOnInit(): void {
    this.simulatedScpiList = [];
    this.totalValue = 0;
    this.totalMonthlyIncomes = 0;
    this.chartsName = [];
    this.valuePerCountryPercent = {};
    this.valuePerSectorPercent = {};

  }

  showEditDialog() {
    this.EditDialogvisible = true;
  }

  showScpiDialog() {
    this.selectScpiDialogVisible = true;
  }

  closeScpiFormDialog(isOpen: boolean) {
    this.scpiSimulationFormDialogVisible = isOpen;
    this.scpiSimulationFormDialogForModification = false;
  }

  editTitle(event: Event) {
    const inputElement = (event.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
    this.title = inputElement.value;
    this.EditDialogvisible = false;
  }

  openAddDialogForm(scpi: ScpiModel) {
    this.scpi = scpi;
    this.selectScpiDialogVisible = false;
    this.scpiSimulationFormDialogVisible = true;
    this.scpiSimulationFormDialogForModification = false;
    this.getSpicDetail(scpi.id);

  }

  getSpicDetail(scpiId: number): void {
    this.scpiService.getScpiById(scpiId).subscribe(
      data => {
        this.scpiDetail = data;
      }
    )
  }

  getScpi(scpiId: number): void {

    this.scpiService.fetchScpiList().subscribe(
      data => {
        this.scpi = data.find(scpi => scpi.id === scpiId);

        // Utiliser ça pour afficher une image de la scpi en attendant d'avoir les images récupérés du back
        if (this.scpi) {
          this.scpi.image = '1';
        }
      }
    )
  }

  addSimulatedScpi(simulatedScpi: SimulatedScpiModel) {
    this.scpiSimulationFormDialogVisible = false;
    this.selectScpiDialogVisible = false;

    const index = this.simulatedScpiList.findIndex(scpiList =>
      scpiList.some(scpi => scpi.scpiId === simulatedScpi.scpiId)
    );

    if (index === -1) {
      this.simulatedScpiList.push([{...simulatedScpi}]);

    } else {
      const existingScpiIndex = this.simulatedScpiList[index].findIndex(scpi =>
        scpi.selectedProperty.propertyLabel === simulatedScpi.selectedProperty.propertyLabel &&
        scpi.simulated === simulatedScpi.simulated
      );


      if (existingScpiIndex === -1) {
        this.simulatedScpiList[index].push({...simulatedScpi});

      } else {
        const existingScpi = this.simulatedScpiList[index][existingScpiIndex];
        this.simulatedScpiList[index][existingScpiIndex] = {
          ...existingScpi,
          totalInvest: existingScpi.totalInvest + simulatedScpi.totalInvest,
          partNb: existingScpi.partNb + simulatedScpi.partNb,
          withdrawalValue: existingScpi.withdrawalValue + simulatedScpi.withdrawalValue,
          monthlyIncomes: existingScpi.monthlyIncomes + simulatedScpi.monthlyIncomes
        };
      }
    }

    this.updateAllCharts();

  }

  modifyInvestment($event: { oldInvestment: SimulatedScpiModel, newInvestment: SimulatedScpiModel }) {

    // On doit récupéré l'ancienne version de simulatedScpi et la nouvelle
    // si le type est le même => alors on ecrase l'ancienne version
    if ($event.oldInvestment.selectedProperty.type === $event.newInvestment.selectedProperty.type) {
      const rowIndex = this.simulatedScpiList.findIndex(row => row.some(scpi => scpi.scpiId === $event.newInvestment.scpiId));
      const colIndex = this.simulatedScpiList[rowIndex].findIndex(scpi => scpi.selectedProperty.type === $event.newInvestment.selectedProperty.type && scpi.simulated);
      this.simulatedScpiList[rowIndex][colIndex] = {...$event.newInvestment};
    } else {
      // s'il existe il faudra additionner la nouvelle valeur avec l'ancienne
      const rowIndex1 = this.simulatedScpiList.findIndex(row => row.some(scpi => scpi.scpiId === $event.newInvestment.scpiId));
      const colIndex1 = this.simulatedScpiList[rowIndex1].findIndex(scpi => scpi.selectedProperty.type === $event.newInvestment.selectedProperty.type && scpi.simulated);
      if (colIndex1 !== -1) {
        const existingScpi = this.simulatedScpiList[rowIndex1][colIndex1];
        this.simulatedScpiList[rowIndex1][colIndex1] = {
          ...existingScpi,
          totalInvest: existingScpi.totalInvest + $event.newInvestment.totalInvest,
          partNb: existingScpi.partNb + $event.newInvestment.partNb,
          withdrawalValue: existingScpi.withdrawalValue + $event.newInvestment.withdrawalValue,
          monthlyIncomes: existingScpi.monthlyIncomes + $event.newInvestment.monthlyIncomes
        };
      } else {
        // s'il existe pas alors il faut le déclarer
        this.simulatedScpiList[rowIndex1].push({...$event.newInvestment});
      }

      // si le type est différent => on supprime l'ancienne et on regarde si le nouveau type existe
      const rowIndex = this.simulatedScpiList.findIndex(row => row.some(scpi => scpi.scpiId === $event.oldInvestment.scpiId));
      const colIndex = this.simulatedScpiList[rowIndex].findIndex(scpi => scpi.selectedProperty.type === $event.oldInvestment.selectedProperty.type && scpi.simulated);
      let investmentToDelete = this.simulatedScpiList[rowIndex][colIndex];
      this.deleteScpiSimulation({
        id: investmentToDelete.scpiId,
        type: investmentToDelete.selectedProperty.type,
        simulated: investmentToDelete.simulated
      });
    }

    this.updateAllCharts();

    this.scpiSimulationFormDialogForModification = false;
    this.scpiSimulationFormDialogVisible = false;
    this.selectScpiDialogVisible = false;
  }

  deleteScpiSimulation(scpiSimulated: { id: number, type: property_type, simulated: boolean }) {
    this.simulatedScpiList = this.simulatedScpiList.map(scpiList =>
      scpiList.filter(scpi =>
        scpi.scpiId !== scpiSimulated.id ||
        scpi.selectedProperty.type !== scpiSimulated.type ||
        scpi.simulated !== scpiSimulated.simulated
      ))
      .filter(scpiList => scpiList.length > 0);

    this.updateAllCharts();
  }

  openModifyScpiDialog($event: { id: number; type: property_type }) {
    this.getSpicDetail($event.id);
    this.getScpi($event.id);

    this.investmentToModify = this.simulatedScpiList.flat().find(scpi => scpi.scpiId === $event.id && scpi.selectedProperty.type === $event.type);

    this.scpiSimulationFormDialogVisible = true;
    this.scpiSimulationFormDialogForModification = true;
  }

  updateAllCharts() {
    this.oneYearIncomesInterval();
    this.fiveYearsIncomesInterval();
    this.setChartByName();
    this.setGlobalVue();
    // this.setChartsByCountry();
    this.setChartsBySector();

    console.log(this.simulatedScpiList);
  }

  accumulatedIncomes(time: number): number {
    return this.simulatedScpiList.flat()
      .filter(scpi => (time - scpi.strip.time) > 0)
      .reduce((sum, scpi) => sum + ((time - scpi.strip.time) * 12 * scpi.monthlyIncomes), 0);
  }

  revaluationGain(time: number): number {
    return this.simulatedScpiList.flat()
      .filter(scpi => scpi.strip.percent < 100 && (time - scpi.strip.time) > 0)
      .reduce((sum, scpi) => sum + ((scpi.totalInvest * 100 / scpi.strip.percent) - scpi.totalInvest), 0);
  }

  fiveYearsIncomesInterval() {
    this.futureIncomesEveryFiveYears = new Map<number, { incomes: number, revaluation: number, total: number }>();

    for (let annee = 5; annee <= 25; annee += 5) {
      let incomes = this.accumulatedIncomes(annee);
      let revaluation = this.revaluationGain(annee);
      this.futureIncomesEveryFiveYears.set(annee, {
        incomes: incomes,
        revaluation: revaluation,
        total: incomes + revaluation
      })
    }
  }

  oneYearIncomesInterval() {

    if (!this.compoundInterestEnabled) {

      this.futureIncomesEveryYear = new Map<number, { accumulatedInvestment: number, accumulatedIncomes: number }>();
      let accumulatedInvestment = this.simulatedScpiList.flat().reduce((sum, scpi) => sum + scpi.totalInvest, 0);

      let revaluationGain = 0;
      for (let annee = 1; annee <= 25; annee++) {
        let scpi = this.simulatedScpiList.flat().find(s => s.strip.time + 1 === annee);
        if (scpi) {
          revaluationGain = (scpi.totalInvest * 100 / scpi.strip.percent) - scpi.totalInvest;
          accumulatedInvestment += revaluationGain;
        }
        this.futureIncomesEveryYear.set(annee, {
          accumulatedInvestment: accumulatedInvestment,
          accumulatedIncomes: this.accumulatedIncomes(annee)
        });
      }
    }
  }

  setGlobalVue(): void {

    let flatList = this.simulatedScpiList.flat();

    let globalSome = flatList.reduce((acc, scpi) => {
      acc.totalInvest += scpi.totalInvest;
      if (scpi.selectedProperty.type === property_type.PLEINE_PROPRIETE) {
        acc.monthlyIncomes += scpi.monthlyIncomes;
      }
      acc.totalCashback += scpi.cashback * scpi.totalInvest / 100;
      return acc;
    }, {totalInvest: 0, monthlyIncomes: 0, totalCashback: 0});

    //Vue Globale
    this.totalValue = globalSome.totalInvest;
    this.totalMonthlyIncomes = globalSome.monthlyIncomes;
    this.totalCashback = globalSome.totalCashback;
    this.totalInvested = this.totalValue - this.totalCashback;
    this.setChartsByCountry();
    this.calculateImpots();


  }

  private calculateImpots() {
    let percentFrance = this.valuePerCountryPercent['France'] != null ? this.valuePerCountryPercent['France'] : 0;
    let totalAnnualIncomes = this.totalMonthlyIncomes * 12;
    this.taxService.getTaxForCurrentSimulation({
      annualScpiIncome: totalAnnualIncomes,
      percentInvestmentInFrance: percentFrance
    }).subscribe(resp => {
      this.tax = resp.amount / 12;
      this.monthlyIncomeAfterTax = this.totalMonthlyIncomes - this.tax;
    })
  }

  toggleCompoundInterest(enabled: boolean) {
    this.compoundInterestEnabled = enabled;
  }

  setChartByName() {
    //Total value for each scpi (some when there is Nue and Pleine propriété)
    let totalValueForEachScpi = this.totalValueForEachScpi();

    let someOfAllInvests = totalValueForEachScpi.reduce((acc, inv) => acc += inv.totalInvest, 0);

    this.chartsName = totalValueForEachScpi.map(value => {
      value.totalInvest = value.totalInvest / someOfAllInvests * 100;
      return value;
    });
  }

  totalValueForEachScpi() {
    return this.simulatedScpiList.map(scpiSubList => {
      const name = scpiSubList[0].name;
      const localizations = scpiSubList[0].localizations;
      const sectors = scpiSubList[0].sectors;
      let totalInvest = scpiSubList.reduce((acc, scpi) => acc += scpi.totalInvest, 0);
      return {name, totalInvest, localizations, sectors};
    });
  }

  setChartsByCountry() {

    let res = this.totalValueForEachScpi();

    let valeurScpiParPays = res.map(value => {
      let newValue = {...value.localizations};
      for (const country in newValue) {
        newValue[country] = value.localizations[country] * value.totalInvest / 100;
      }
      return newValue;
    });

    let localizationSums: Localizations = {};

    valeurScpiParPays.forEach(item => {
      Object.entries(item).forEach(([country, value]) => {
        if (localizationSums[country]) {
          localizationSums[country] += value;
        } else {
          localizationSums[country] = value;
        }
      });
    });

    let localisationPercent: Localizations = {};
    for (let country in localizationSums) {
      localisationPercent[country] = (localizationSums[country] / this.totalValue) * 100;
    }

    this.valuePerCountryPercent = localisationPercent;
  }


  setChartsBySector() {

    let res = this.totalValueForEachScpi();

    let valeurScpiParSecteur = res.map(value => {
      let newValue = {...value.sectors};
      for (const sector in newValue) {
        newValue[sector] = value.sectors[sector] * value.totalInvest / 100;
      }
      return newValue;
    });

    let sectorSums: Sectors = {};

    valeurScpiParSecteur.forEach(item => {
      Object.entries(item).forEach(([sector, value]) => {
        if (sectorSums[sector]) {
          sectorSums[sector] += value;
        } else {
          sectorSums[sector] = value;
        }
      });
    });

    let sectorPercent: Sectors = {};
    for (let country in sectorSums) {
      sectorPercent[country] = (sectorSums[country] / this.totalValue) * 100;
    }

    this.valuePerSectorPercent = sectorPercent;
  }

  includeUserInvestment(includeActualPort: boolean) {
    if (includeActualPort) {
      this.investService.getInvestments().subscribe(data => {
        console.log("data.length", data.length);
        for (let scpi of data) {
          this.addSimulatedScpi(this.mapToSimulatedScpiModel(scpi));
        }
        ;
      });
    } else {
      this.investService.getInvestments().subscribe(data => {
        console.log("data.length", data.length);
        for (let scpi of data) {
          this.deleteScpiSimulation({id: scpi.scpiId, type: property_type.PLEINE_PROPRIETE, simulated: false})
          this.deleteScpiSimulation({id: scpi.scpiId, type: property_type.NUE_PROPRIETE, simulated: false})
          this.deleteScpiSimulation({id: scpi.scpiId, type: property_type.USUFRUIT, simulated: false})
        }
        ;
      });
    }
  }


  mapToSimulatedScpiModel(investmentInDto: userInvestmentInDto) {

    let stripping = [
      {time: 0, percent: 100, stipLabel: ''},
      {time: 3, percent: 90, stipLabel: '3 ans - 90%'},
      {time: 4, percent: 85, stipLabel: '4 ans - 85%'},
      {time: 5, percent: 80, stipLabel: '5 ans - 80%'},
      {time: 7, percent: 75, stipLabel: '7 ans - 75%'},
      {time: 10, percent: 70, stipLabel: '10 ans - 70%'},
      {time: 12, percent: 65, stipLabel: '12 ans - 65%'},
      {time: 15, percent: 60, stipLabel: '15 ans - 60%'},
      {time: 20, percent: 55, stipLabel: '20 ans - 55%'},
    ];

    let newProperty: Property;
    let newStrip: Stripping;

    if (investmentInDto.selectedProperty === "PLEINE_PROPRIETE") newProperty = {
      propertyLabel: "Pleine propriété (Standard)",
      type: property_type.PLEINE_PROPRIETE
    };
    else if (investmentInDto.selectedProperty === "NUE_PROPRIETE") newProperty = {
      propertyLabel: "Nue-propriété (avancée)",
      type: property_type.NUE_PROPRIETE
    };
    else newProperty = {propertyLabel: "Usufruit", type: property_type.USUFRUIT};


    if (investmentInDto.discountStripping) {
      let year = Object.keys(investmentInDto.discountStripping)[0];
      switch (Number(year)) {
        case 3:
          newStrip = stripping[1];
          break;
        case 4:
          newStrip = stripping[2];
          break;
        case 5:
          newStrip = stripping[3];
          break;
        case 7:
          newStrip = stripping[4];
          break;
        case 10:
          newStrip = stripping[5];
          break;
        case 12:
          newStrip = stripping[6];
          break;
        case 15:
          newStrip = stripping[7];
          break;
        case 20:
        default:
          newStrip = stripping[8];
          break;
      }
    } else {
      newStrip = stripping[0];
    }

    let simulatedInvestment: SimulatedScpiModel = {
      scpiId: investmentInDto.scpiId,
      name: investmentInDto.name,
      selectedProperty: newProperty,
      totalInvest: investmentInDto.totalInvest,
      partNb: investmentInDto.partNb,
      monthlyIncomes: investmentInDto.monthlyIncomes,
      withdrawalValue: investmentInDto.withdrawalValue,
      strip: newStrip,
      lastYearDistributionRate: investmentInDto.lastYearDistributionRate,
      localizations: investmentInDto.localizations,
      sectors: investmentInDto.sectors,
      cashback: investmentInDto.cashback,
      simulated: false
    };

    return simulatedInvestment;
  }


}
