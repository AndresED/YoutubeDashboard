import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $:any;
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
}) 
export class ConfigurationComponent implements OnInit {
  titulo: string;
  descripcion: string;
  estado: string;
  listBroadcast:any[]=[];
  ingestionType:any;
  liveStreamId:any;
  formato: any;
  constructor(
    private apiService:ApiService,
  ) {}

  ngOnInit() {
    this.getListLiveStream();
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-ddThh:mm:ss'});
  }

  async register(){
    const requestBody = {
      cdn: {
        ingestionType: this.ingestionType,
        format: this.formato,
      },
      snippet: {
        title: this.titulo,
        description: this.descripcion,
      },
      status: {
        streamStatus: this.estado,
      }
    }
    const data = await this.apiService.createLiveStream({
      part: 'id,snippet,cdn,contentDetails,status',
      requestBody
    });
    this.getListLiveStream();
    this.cleanInputs();
  }
  async getListLiveStream(){
    this.listBroadcast = [];
    const aux = await this.apiService.listLiveStream();
    console.clear();
    const auxListBroadCast = aux.data.data.items;
    auxListBroadCast.map(
      (broadcast) => {
        console.log(broadcast);
        const data = {
          'id': broadcast.id,
          'title':broadcast.snippet.title,
          'description': broadcast.snippet.description,
          'servidor': broadcast.cdn.ingestionInfo.ingestionAddress,
          'media': broadcast.cdn.ingestionType,
          'formato': broadcast.cdn.format,
          'status': broadcast.status.privacyStatus,
          'key': broadcast.cdn.ingestionInfo.streamName,
        }
        this.listBroadcast.push(data);
      }
    )
  }
  setDataLiveStream(index){
    console.log(this.listBroadcast[index]);
    this.liveStreamId = this.listBroadcast[index].id;
    this.titulo = this.listBroadcast[index].title;
    this.descripcion = this.listBroadcast[index].description;
    this.estado = this.listBroadcast[index].status;
    this.ingestionType = this.listBroadcast[index].ingestionType;
    this.formato = this.listBroadcast[index].format;
    console.log(this.formato);
  }
  async updated(){
    const requestBody = {
      id: this.liveStreamId,
      cdn: {
        ingestionType: this.ingestionType,
        format: this.formato,
      },
      snippet: {
        title: this.titulo,
        description: this.descripcion,
      },
      status: {
        streamStatus: this.estado,
      }
    }
    const data = await this.apiService.updateLiveStream(this.liveStreamId,{
      part: 'id,snippet,contentDetails,status',
      requestBody
    });
    this.cleanInputs();
  }
  deleted(){
    this.apiService.deleteLiveStream(this.liveStreamId).then(
      (data)=>{
        console.log(data);
        this.getListLiveStream();
      }
    )
  }
  cleanInputs(){
    this.liveStreamId = null;
    this.titulo = null;
    this.descripcion = null;
    this.estado = null;
    this.ingestionType = null;
    this.formato = null;
  }
}
