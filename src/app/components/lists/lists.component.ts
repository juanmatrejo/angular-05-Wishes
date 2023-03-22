import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})

export class ListsComponent implements OnInit {

	@Input() completed: boolean = false;
	@ViewChild(IonList) ionicList!: IonList;

	constructor(public whishesService: WishesService
		, private router: Router
		, private alertController: AlertController) {

	}

	ngOnInit(): void { }

	// async addingList() {

	// 	// this.router.navigateByUrl('/tabs/tab1/adding');

	// 	const alert = await this.alertController.create({
	// 		header: 'New List',
	// 		inputs: [
	// 			{
	// 				name: 'title',
	// 				type: 'text',
	// 				placeholder: 'List Name'
	// 			}
	// 		],
	// 		buttons: [
	// 			{
	// 				text: 'Create',
	// 				handler: (data) => {

	// 					if (data.title.trim().length === 0) {
	// 						console.log('0');
	// 						return;
	// 					}

	// 					const id = this.whishesService.createList(data.title.trim());
	// 					console.log(id);
	// 					this.router.navigateByUrl(`/tabs/tab1/adding/${id}`);

	// 					console.log(data);
	// 				}
	// 			},
	// 			{
	// 				text: 'Cancel',
	// 				role: 'cancel',
	// 				handler: () => {
	// 					console.log('Canceled.');
	// 				}
	// 			}
	// 		]
	// 	});

	// 	alert.present();
	// }

	editList(list: List) {

		console.log(list);

		if (this.completed) {
			this.router.navigateByUrl(`/tabs/tab1/adding/${list.id}`);
		}
		else {
			this.router.navigateByUrl(`/tabs/tab2/adding/${list.id}`);
		}
	}

	async deleteList(id: number) {

		const alert = await this.alertController.create({
			header: 'Delete List?',
			buttons: [
				{
					text: 'Delete',
					handler: () => {

						this.whishesService.lists = this.whishesService.lists.filter(listData => {

							return listData.id !== id
						});
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

	async renameList(list: List) {

		const alert = await this.alertController.create({
			header: 'Rename List',
			inputs: [
				{
					name: 'title',
					type: 'text',
					value: list.title,
					placeholder: 'List Name'
				}
			],
			buttons: [
				{
					text: 'Save',
					handler: (data) => {

						if (data.title.trim().length === 0) {
							console.log('0');
							return;
						}

						list = this.whishesService.loadList(list.id);
						list.title = data.title.trim();

						this.whishesService.saveData();
						this.ionicList.closeSlidingItems();

						console.log(data);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						this.ionicList.closeSlidingItems();
						console.log('Canceled.');
					}
				}
			]
		});

		alert.present();
	}
}
