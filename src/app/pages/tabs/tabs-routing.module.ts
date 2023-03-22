import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'tab1',
				loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
			},
			{
				path: 'adding/:id',
				loadChildren: () => import('../../pages/adding/adding.module').then(m => m.AddingPageModule)
			},
			{
				path: 'tab2',
				loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
			},
			{
				path: '',
				redirectTo: '/tabs/tab1',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/tab1',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
