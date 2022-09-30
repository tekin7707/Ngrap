import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Passenger } from '../models/passenger';
import { PassengerService } from '../Services/passenger.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'abe-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})


export class PassengersComponent implements OnInit, AfterViewInit {
  passengers: Passenger[] = [];
  passenger: Passenger = new Passenger();
  lists: any;
  displayedColumns: string[] = [ 'logo', 'name', 'website', 'slogan', 'head_quaters', 'country','established', 'passengercount','actions'];
  dataSource: MatTableDataSource<Passenger> = new MatTableDataSource<Passenger>([]);

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  passengerCount?: number;
  description?: string;
  constructor(private passengerService: PassengerService, public dialogService: MatDialog) {
    this.GetAllPassengers();
  }

  async ngOnInit(): Promise<void> {
  }

  ngAfterViewInit() {
  }

  openDialog(_id: number): void {
    this.passenger = this.passengers.find(x => x.id == _id)!;
    if (!this.passenger)
      return;
    this.passengerCount = this.passenger.passengercount;
    this.description= this.passenger.description;
    const dialogRef = this.dialogService.open(DialogEdit, {
      width: '600px',
      data: this.passenger
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.passengercount)
        this.passenger = result;
      else {
        this.passenger.passengercount = this.passengerCount;
        this.passenger.description =this.description;
      }
    });
  }

  GetAllPassengers() {
    var r = this.passengerService.GetPassengers().subscribe(resp => {
      this.lists = resp;
      this.passengers = this.lists;
      this.dataSource = new MatTableDataSource<Passenger>(this.lists);
      this.dataSource.paginator = this.paginator;
    });
  }
}


@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.html',
})
export class DialogEdit {
  constructor(
    public dialogRef: MatDialogRef<DialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: Passenger,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
