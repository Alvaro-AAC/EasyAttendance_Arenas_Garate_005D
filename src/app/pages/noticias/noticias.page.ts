import { Component, OnInit } from '@angular/core';

interface TweetCard {
  fecha: string;
  user: string;
  userHref: string;
  content: string;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  public tweetCards: TweetCard[] = [
    {
      fecha: 'August 25, 2022',
      user: '&mdash; Duoc UC (@DuocUC)',
      userHref: 'https://twitter.com/DuocUC/',
      content: `¡Celebremos 5 años de charlas gastronómicas con un nuevo Cheftalks!🙌Este 31 de agosto a las 11:00hrs.
      Diego Vega, chef del reconocido hotel The Singular Patagonia, nos
      contará todo sobre su recorrido en el mundo de la gastronomía👨‍🍳Inscríbete aquí👉
      <a href="https://t.co/Ma9zvctzre">https://t.co/Ma9zvctzre</a>`
    },
    {
      fecha: 'August 18, 2022',
      user: '&mdash; Duoc UC (@DuocUC)',
      userHref: 'https://twitter.com/DuocUC/',
      content: `¡Nuestra actualización de planes de estudio no para!⚡
      Revisa la alianza entre Duoc UC y PDI y la forma en que nos colaborarán en la
      actualización de mallas curriculares de la Escuela de Informática y Telecomunicaciones🔒
      Entra aquí👉 <a href="https://t.co/ppnJFBeMSj">https://t.co/ppnJFBeMSj</a>`
    },
    {
      fecha: 'August 16, 2022',
      user: '&mdash; Duoc UC (@DuocUC)',
      userHref: 'https://twitter.com/DuocUC/',
      content: `CMPC - Duoc UC Campus Nacimiento llega a la
      <a href="https://twitter.com/hashtag/Regi%C3%B3nBiobio?src=hash&amp;ref_src=twsrc%5Etfw">
      #RegiónBiobio</a> para generar un aporte a la industria, descentralizando
       la oferta de educacional y siendo un lugar de encuentro para toda la comunidad🤝
       <br>Conoce más sobre nuestra sede del futuro <br>aquí👉
      <a href="https://t.co/BhtdEfqRr9">https://t.co/BhtdEfqRr9</a>`
    },
    {
      fecha: 'August 10, 2022',
      user: '&mdash; Duoc UC (@DuocUC)',
      userHref: 'https://twitter.com/DuocUC/',
      content: `Los chicos de Publicidad en Duoc UC Sede Viña del Mar lo están
      dando todo ⚡ Estamos muy felices por Eliseo, Valeria y Diego que resultaron
      <a href="https://twitter.com/hashtag/Ganadores?src=hash&amp;ref_src=twsrc%5Etfw">#Ganadores</a>
      del certamen <a href="https://twitter.com/EffieAwards?ref_src=twsrc%5Etfw">@EffieAwards</a>
      versión <a href="https://twitter.com/hashtag/estudiantes?src=hash&amp;ref_src=twsrc%5Etfw">
      #estudiantes</a>😍 Conócelos entrando aquí👉 <a href="https://t.co/oFyvSatPuO">
      https://t.co/oFyvSatPuO</a>`
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}
