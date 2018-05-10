import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-help',
	templateUrl: './help.component.html',
	styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

	public helpOption: string;

	constructor( private route: ActivatedRoute ) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.helpOption = params.get('id');
		});
	}

}
