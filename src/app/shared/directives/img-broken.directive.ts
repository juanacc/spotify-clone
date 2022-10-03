import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]' //se le indica a la directiva que solo puede funcionar en tags img
})
export class ImgBrokenDirective {
  @Input() customImg:string = '';
  
  @HostListener('error') handlerError () : void {// Escucho al host y particularmente al evento error del host. En este caso, el host seria el tag img
    const elementNative = this.host.nativeElement;
    console.log('la imagen esta rota',this.host);
    elementNative.src = this.customImg || '../../../assets/images/img-not-found.png';
  }

  constructor(private host:ElementRef) { 
    console.log(host);
  }

}
