import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Machine } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { tap, take } from 'rxjs/operators';
import * as html2canvasWrong from 'html2canvas';
var html2canvas = html2canvasWrong as any as (element: HTMLElement, options?: Partial<html2canvasWrong.Options>) => Promise<HTMLCanvasElement>;
@Component({
  selector: 'app-optimize',
  templateUrl: './optimize.component.html',
  styleUrls: ['./optimize.component.scss']
})
export class OptimizeComponent implements OnInit {

  @ViewChild('printDataRef') printDataRef: ElementRef<HTMLElement>;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  machineBlocks: string[] = ['Machine 1', 'Machine 2'];

  public machines: Machine[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this._fetchMachines();
  }

  /**
   * Fetch all equipments.
   *
   * @private
   */
  private _fetchMachines(): void {
    this.dataService.fetchAllMachines().pipe(
      tap((machines: Machine[]) => this.machines = machines),
      take(1)
    ).subscribe();
  }

  printData(id?: string): void {
    // var printContents = document.getElementById(id).innerHTML;
    // var originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;

    html2canvas(this.printDataRef.nativeElement, { scale: window.devicePixelRatio }).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }

}
