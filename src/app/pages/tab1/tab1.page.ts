import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

	pendings: string = 'pendings';

	constructor(public whishesService: WishesService
		, private router: Router
		, private alertController: AlertController) {

	}

	async addingList() {

		// this.router.navigateByUrl('/tabs/tab1/adding');

		const alert = await this.alertController.create({
			header: 'New List',
			inputs: [
				{
					name: 'title',
					type: 'text',
					placeholder: 'List Name'
				}
			],
			buttons: [
				{
					text: 'Create',
					handler: (data) => {

						if (data.title.trim().length === 0) {
							console.log('0');
							return;
						}

						const id = this.whishesService.createList(data.title.trim());
						console.log(id);
						this.router.navigateByUrl(`/tabs/tab1/adding/${id}`);

						console.log(data);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Canceled.');
					}
				}
			]
		});

		alert.present();
	}

	// editList(list: List) {

	// 	console.log(list);
	// 	this.router.navigateByUrl(`/tabs/tab1/adding/${list.id}`);
	// }
}
