import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any;
@Component({
  selector: 'app-transmision',
  templateUrl: './transmision.component.html',
  styleUrls: ['./transmision.component.scss']
})
export class TransmisionComponent implements OnInit {
  fecha: string;
  titulo: string;
  descripcion: string;
  tags: string;
  estado: string;
  listBroadcast:any[]=[];
  broadcastId: any;
  constructor(
    private apiService:ApiService,
  ) {}

  ngOnInit() {
    this.getListBroadcast();
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-ddThh:mm:ss'});
  }

  async register(){
    const requestBody = {
      snippet: {
        scheduledStartTime: $(".dateI").val()+".000Z",
        title: this.titulo,
        description: this.descripcion,
        isDefaultBroadcast: false
      }, 
      status: {
        privacyStatus: this.estado,
      },
      etag: this.tags,
    }
    const data = await this.apiService.createBroadcast({
      part: 'id,snippet,contentDetails,status',
      requestBody
    });
    this.getListBroadcast();
    this.cleanInputs();
  }
  async getListBroadcast(){
    this.listBroadcast = [];
    const aux = await this.apiService.listBroadcast('all','all');
    console.clear();
    const auxListBroadCast = aux.data.data.items;
    auxListBroadCast.map(
      (broadcast) => {
        console.log(broadcast);
        const data = {
          'id': broadcast.id,
          'title':broadcast.snippet.title,
          'description': broadcast.snippet.description,
          'scheduledStartTime': broadcast.snippet.scheduledStartTime,
          'thumbnails': broadcast.snippet.thumbnails,
          'status': broadcast.status.privacyStatus,
          'tags': broadcast.etag,
          'url': `https://www.youtube.com/embed/${broadcast.id}`
        }
        this.listBroadcast.push(data);
      }
    )
  }
  setDataBroadCast(index){
    this.broadcastId = this.listBroadcast[index].id;
    this.titulo = this.listBroadcast[index].title;
    this.descripcion = this.listBroadcast[index].description;
    this.fecha = this.listBroadcast[index].scheduledStartTime;
    this.estado = this.listBroadcast[index].status;
    this.tags = this.listBroadcast[index].tags;
  }
  async updated(){
    const requestBody = {
      snippet: {
        id:this.broadcastId,
        scheduledStartTime: $(".dateI").val(),
        title: this.titulo,
        description: this.descripcion,
        isDefaultBroadcast: false
      }, 
      status: {
        privacyStatus: this.estado,
      },
      etag: this.tags,
    }
    const data = await this.apiService.createBroadcast({
      part: 'id,snippet,contentDetails,status',
      requestBody
    });
    this.cleanInputs();
  }
  deleted(){
    this.apiService.deleteBroadcast(this.broadcastId).then(
      (data)=>{
        console.log(data);
        this.getListBroadcast();
      }
    )
  }
  cleanInputs(){
    this.titulo = null;
    this.descripcion = null;
    this.fecha = null;
    this.estado = null;
    this.tags = null;
  }
}
