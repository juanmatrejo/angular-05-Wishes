import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
	providedIn: 'root'
})
export class WishesService {

	lists: List[] = [];

	constructor() {

		console.log('Service initialized.');

		// const list1: List = new List('Hacer el supermercado.');
		// const list2: List = new List('Visitar al dentista.');
		// const list3: List = new List('Aseo general semanal.');
		// const list4: List = new List('Hacer la lavandería.');

		// this.lists.push(list1, list2, list3, list4);

		this.loadData();

		console.log(this.lists);
	}

	createList(title: string) {

		const newLlist: List = new List(title);
		this.lists.push(newLlist);
		this.saveData();

		return newLlist.id;
	}

	loadList(id: number): List {

		return this.lists.filter(listData => {

			return listData.id === id
		})[0];
	}

	loadData() {

		const wishesData = localStorage.getItem('wishesData');

		if (wishesData == null) {
			this.lists = [];
		}
		else {
			this.lists = JSON.parse(wishesData);
		}
	}

	saveData() {

		localStorage.setItem('wishesData', JSON.stringify(this.lists));
	}
}
