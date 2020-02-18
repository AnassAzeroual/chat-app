import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messageValue:string = ""
  id_discussion: string = ""
  my_id: string = ""
  ListeMessages: any;
  client_avatar:string = ""
  client_name:string = ""
  listUsers:any[] = [
    {id: 1 , name:"Anass Azeroual", img:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg", status: true},
    {id: 2 , name:"Yassine Faris", img:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg", status: false},
    {id: 3 , name:"Moumouni Nery", img:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg", status: true},
  ]
  selectedUserData: any = []
  constructor(
    private connect:ConnectService
    ) {
      this.id_discussion = sessionStorage.getItem("discussion");
      this.my_id = sessionStorage.getItem("user");

      this.connect.getMessages().subscribe(data=>
      {
        console.log(data);
        
        if(this.id_discussion)
        {          
          if(this.id_discussion==data.room && data.host_id == this.my_id)
          {
            var body =
            {
              id_discussion:    this.id_discussion,
              contenu_message:  data.message,
              expediteur:       data.user,
              host_id:          data.host_id,
              mon_id:           this.my_id,
              date_creation:    new Date().toISOString().slice(0, 23)
            }
            
            this.ListeMessages.push(body);

            console.log("this.ListeMessages");
            console.log(this.ListeMessages);
            
            if(window.location.href.slice(30, 34)=="chat")
            {
              setTimeout(() => {
                this.scroll();
              }, 300);
            }
          }
        }
        // this.GetMessagesNonLus();
      });// fin subscribe
  }

  ngOnInit() {
  }

  selectedUser(selectedUser) {
    this.ListeMessages = []
    // this.showBoxSend = true
    // this.isLoading = true

    //* collect object for create Conversation
    this.selectedUserData = {
      "local_id": sessionStorage.getItem("user"),
      "host_id": selectedUser.id,
      "discussion": this.id_discussion,
      "avatar": selectedUser.img,
      "nom_user": selectedUser.name,
    }
    console.log(this.selectedUserData);
    
    this.connect.joinRoom(
      {
        user:this.selectedUserData.local_id,
        host_id:this.selectedUserData.host_id,
        room:this.selectedUserData.discussion
      }
    );
    this.client_avatar = selectedUser.img;
    this.client_name = selectedUser.name;

    //* call service create Conversation
    setTimeout(() => {
      this.scroll();
    }, 500);
  }

  sendMessage()
  {
      let data =
      {
        room : this.id_discussion,
        user : sessionStorage.getItem("user"),
        host_id : this.selectedUserData.host_id,
        message : this.messageValue
      }

      let body =
      {
        id_discussion:    this.id_discussion,
        contenu_message:  data.message,
        expediteur:       data.user,
        host_id:          data.host_id,
        mon_id:           this.my_id,
        date_creation:    new Date().toISOString().slice(0, 23)
      }
            
      if (this.connect.sendMessage(data)) {
        this.ListeMessages.push(body);
        console.log("sended");
      } else {
        body.contenu_message = `${body.contenu_message}⛔`
        this.ListeMessages.push(body);
        console.log("Not sended");
      }
      this.messageValue = ""
  }

  scroll() {
    var element = document.getElementById("zoneChat");
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
  }

}
