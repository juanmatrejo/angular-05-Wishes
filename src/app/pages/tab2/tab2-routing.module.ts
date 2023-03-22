import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
	{
		path: '',
		component: Tab2Page,
	},
	{
		path: 'adding/:id',
		loadChildren: () => import('../../pages/adding/adding.module').then(m => m.AddingPageModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class Tab2PageRoutingModule { }
