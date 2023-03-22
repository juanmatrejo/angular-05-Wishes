import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
	selector: 'app-adding',
	templateUrl: './adding.page.html',
	styleUrls: ['./adding.page.scss'],
})
export class AddingPage implements OnInit {

	list: List;
	itemName: string = '';

	constructor(private whishesService: WishesService
		, private route: ActivatedRoute
		, private alertController: AlertController) {

		const id = this.route.snapshot.paramMap.get('id');
		console.log(id);

		this.list = whishesService.loadList(Number(id));
		console.log(this.list);
	}

	ngOnInit() {
	}

	addItem() {

		if (this.itemName.trim().length === 0) {
			return;
		}

		const newItem: ListItem = new ListItem(this.itemName.trim());
		this.list.items.push(newItem);

		this.whishesService.saveData();

		this.itemName = '';
		console.log(this.list);
	}

	checkChange(item: ListItem) {

		console.log(item);
		const pendings = this.list.items.filter(itemData => {

			return !itemData.completed;
		}).length;

		if (pendings === 0) {
			this.list.completed = true;
			this.list.endDate = new Date();
		}
		else {
			this.list.completed = false;
			this.list.endDate = null;
		}

		this.whishesService.saveData();
		console.log(this.list);
	}

	async deleteItem(idx: number) {

		const alert = await this.alertController.create({
			header: 'Delete Item?',
			buttons: [
				{
					text: 'Delete',
					handler: () => {
						this.list.items.splice(idx, 1);
						this.whishesService.saveData();
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
}
