import { Component, VERSION } from '@angular/core';
import * as speakeasy from "speakeasy";
import QRCode from 'qrcode';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  name = '';
  name2 = "";

  // secret = 'pokhara';
  secret = {ascii: "Mks",
  base32: "JVVXG",
  hex: "4d6b73",
  otpauth_url: "otpauth://totp/SecretKey?secret=JVVXG"};
  status=false;

  mysecret;

  secretkey = "pokhara";

  constructor(){
  }

  getCode(){
    let totp = speakeasy.totp({
      secret: this.secretkey,
      encoding: "ascii"
    });
    return totp;
  }

  ngOnInit(){
    console.log(this.getCode());
    console.log(speakeasy.generateSecret());
    
    //this.mysecret = speakeasy.generateSecret({length:3}); 
    //, label: 'MY Secret'

    console.log(this.secretkey);
    var url = speakeasy.otpauthURL({ secret: this.secretkey, label: "DKPaSS"});
    console.log(url);
    this.drawQr(url);

    setInterval(()=>{
      this.name2 = this.getCode();
    },1000);
  }

  drawQr(url){
    QRCode.toDataURL(url, function(err, data_url) {
      // console.log(data_url);
      // Display this data URL to the user in an <img> tag
      // Example:
      document.querySelector("#img").innerHTML = '<img src="' + data_url + '">';
    });
  }

  verify(){
    // console.log(this.mysecret);
    // console.log(speakeasy.totp.verify({secret: this.secret.ascii, encoding: 'ascii',token: this.name.toString()}));
    let status = speakeasy.totp.verify({secret: this.secretkey, encoding: 'ascii',token: this.name.toString()});
  console.log(status);
  this.status = status;
  }
}
