import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {appConstants} from '../../../constants/app.constants';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.page.html',
  styleUrls: ['./event-request.page.scss'],
})
export class EventRequestPage implements OnInit {
  public requestData = null;
  public title: string;

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

  ngOnInit() {
    this.title = 'Your Request';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
  }

  deleteRequest() {
    const confirmation = {
      eventId: this.requestData.eventId,
      serviceId: this.requestData.serviceId
    };
    console.log(confirmation);
    this.authService.confirmService(confirmation).subscribe((data: any) => {
        this.alertService.presentToast(data.msg).then(() => {
          this.router.navigate(['profile/events']).then();
        });
      }
    );
  }

}
