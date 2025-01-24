import { Component ,OnInit} from '@angular/core';
import { CompraService } from './compra.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule], // Importa RouterModule aquí
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {

  compras: any = [];
  pdfSrc: any | null = null;
  loading:boolean=false;
  constructor(private compraService: CompraService, config: NgbModalConfig,
    private modalService: NgbModal,
    public _DomSanitizationService: DomSanitizer
  ) { 

    _DomSanitizationService.bypassSecurityTrustUrl(this.pdfSrc)

  }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.loading=true;
    this.compraService.lista().subscribe(
      data => {
        this.compras = data;
        this.loading=false;

      },
      err => {
        this.loading=false;
        console.log(err);
      }
    );
  }

  facturar(content,idPago:number) {
    this.pdfSrc="";
    this.compraService.facturar(1,idPago).subscribe(data => {
      // obtener archivo
      let blob= this.convertirBase64ToBlob(data.file,data.type);
      this.pdfSrc = URL.createObjectURL(blob);
      this.openModal(content);
      this.cargarLista();
    }, error => {
      console.log(error);

    });

  }

  async reimprimirFactura(content,idFactura:number) {
      this.pdfSrc="";
      this.compraService.reimprimirFactura(idFactura).subscribe(data => {
      let blob= this.convertirBase64ToBlob(data.file,data.type);
      this.pdfSrc = URL.createObjectURL(blob);
      this.openModal(content);

    }, error => {
      console.log(error);

    });

  }

  
  openModal(content) {
    this.pdfSrc=this._DomSanitizationService.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.modalService.open(content, { size: 'xl',keyboard: false, backdrop: 'static', ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass" }).result.then((result) => {
    }, (reason) => {
      this.pdfSrc="";
    });
  }

  
   convertirBase64ToBlob(file: any,type:string) {
    const byteCharacters = atob(file);
    // Convierte la cadena en un array de bytes
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    // Crea un objeto Blob con el tipo MIME de PDF
    return new Blob([byteArray], { type:type });

  }

  
  
}