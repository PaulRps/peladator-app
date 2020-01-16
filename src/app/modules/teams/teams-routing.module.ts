import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './page/teams.component';
import { NgModule } from '@angular/core';
import { TeamsSortedComponent } from './components/teams-sorted/teams-sorted.component';

const routes: Routes = [
    { path: '', component: TeamsComponent/* , children: [
        {path: 'sorted', component: TeamsSortedComponent}
    ] */}, // TODO: fix to use child path
    { path: 'teams/sorted', component: TeamsSortedComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamsRoutingModule { }
