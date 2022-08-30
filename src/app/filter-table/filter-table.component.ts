import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AppointmentsService} from "../services/appointments.service";
import {Appointment} from "../models/appointment";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'date', 'time', "details", "delete"];
  dataSource = new MatTableDataSource<Appointment>([]);
  todayDataSource = new MatTableDataSource<Appointment>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router
  ) {
    this.appointmentService.getAppointments().pipe(take(1)).subscribe(appointments => {
      const today = new Date().toISOString().slice(0, 10);
      this.todayDataSource = new MatTableDataSource(appointments.filter(a => {
        return a.date == today && a.confirmed;
      } ))
      this.dataSource = new MatTableDataSource(appointments.filter(a => {
        return a.date >= today;
      }));
    })
  }

  ngOnInit(): void {
  }

  deleteApp(id: number) {
    if(confirm("Are you sure you want to delete this appointment?")) {
      this.appointmentService.deleteAppointment(id).pipe(take(1)).subscribe();
      window.location.reload();
    }
  }
}
