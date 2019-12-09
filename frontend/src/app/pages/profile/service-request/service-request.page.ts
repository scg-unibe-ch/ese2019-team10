import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {appConstants} from '../../../constants/app.constants';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})

export class ServiceRequestPage implements OnInit {
  public requestData: any;
  public title: string;
  public reply: string;

  ngOnInit() {
    this.title = 'Service Requests';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,

  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.requestData) {
        this.requestData = JSON.parse(params.requestData);
        console.log(this.requestData);
      }
    });
  }

  confirmService(answer: boolean) {
    const confirmation = {
      eventId: this.requestData.eventId,
      serviceId: this.requestData.serviceId,
      reply: this.reply,
      booked: answer
    };
    console.log(confirmation);
    this.authService.confirmService(confirmation).subscribe((data: any) => {
        this.alertService.presentToast(data.msg).then(() => {
          this.router.navigate(['profile/services']).then();
        });
      }
    );
  }

}
