import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LevelSelectionComponent } from './components/level-selection/level-selection.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScreenEightLevelEightComponent } from './components/levels/eight/screen-eight-level-eight/screen-eight-level-eight.component';
import { ScreenFiveLevelEightComponent } from './components/levels/eight/screen-five-level-eight/screen-five-level-eight.component';
import { ScreenFourLevelEightComponent } from './components/levels/eight/screen-four-level-eight/screen-four-level-eight.component';
import { ScreenNineLevelEightComponent } from './components/levels/eight/screen-nine-level-eight/screen-nine-level-eight.component';
import { ScreenOneLevelEightComponent } from './components/levels/eight/screen-one-level-eight/screen-one-level-eight.component';
import { ScreenSevenLevelEightComponent } from './components/levels/eight/screen-seven-level-eight/screen-seven-level-eight.component';
import { ScreenSixLevelEightComponent } from './components/levels/eight/screen-six-level-eight/screen-six-level-eight.component';
import { ScreenThreeLevelEightComponent } from './components/levels/eight/screen-three-level-eight/screen-three-level-eight.component';
import { ScreenTwoLevelEightComponent } from './components/levels/eight/screen-two-level-eight/screen-two-level-eight.component';
import { ScreenFourLevelFiveComponent } from './components/levels/five/screen-four-level-five/screen-four-level-five.component';
import { ScreenOneLevelFiveComponent } from './components/levels/five/screen-one-level-five/screen-one-level-five.component';
import { ScreenThreeLevelFiveComponent } from './components/levels/five/screen-three-level-five/screen-three-level-five.component';
import { ScreenTwoLevelFiveComponent } from './components/levels/five/screen-two-level-five/screen-two-level-five.component';
import { ScreenFourLevelFourComponent } from './components/levels/four/screen-four-level-four/screen-four-level-four.component';
import { ScreenOneLevelFourComponent } from './components/levels/four/screen-one-level-four/screen-one-level-four.component';
import { ScreenThreeLevelFourComponent } from './components/levels/four/screen-three-level-four/screen-three-level-four.component';
import { ScreenTwoLevelFourComponent } from './components/levels/four/screen-two-level-four/screen-two-level-four.component';
import { ScreenFourLevelOneComponent } from './components/levels/one/screen-four-level-one/screen-four-level-one.component';
import { ScreenOneLevelOneComponent } from './components/levels/one/screen-one-level-one/screen-one-level-one.component';
import { ScreenThreeLevelOneComponent } from './components/levels/one/screen-three-level-one/screen-three-level-one.component';
import { ScreenTwoLevelOneComponent } from './components/levels/one/screen-two-level-one/screen-two-level-one.component';
import { ScreenOneLevelSevenComponent } from './components/levels/seven/screen-one-level-seven/screen-one-level-seven.component';
import { ScreenThreeLevelSevenComponent } from './components/levels/seven/screen-three-level-seven/screen-three-level-seven.component';
import { ScreenTwoLevelSevenComponent } from './components/levels/seven/screen-two-level-seven/screen-two-level-seven.component';
import { ScreenFourLevelSixComponent } from './components/levels/six/screen-four-level-six/screen-four-level-six.component';
import { ScreenOneLevelSixComponent } from './components/levels/six/screen-one-level-six/screen-one-level-six.component';
import { ScreenThreeLevelSixComponent } from './components/levels/six/screen-three-level-six/screen-three-level-six.component';
import { ScreenTwoLevelSixComponent } from './components/levels/six/screen-two-level-six/screen-two-level-six.component';
import { ScreenFourLevelThreeComponent } from './components/levels/three/screen-four-level-three/screen-four-level-three.component';
import { ScreenOneLevelThreeComponent } from './components/levels/three/screen-one-level-three/screen-one-level-three.component';
import { ScreenThreeLevelThreeComponent } from './components/levels/three/screen-three-level-three/screen-three-level-three.component';
import { ScreenTwoLevelThreeComponent } from './components/levels/three/screen-two-level-three/screen-two-level-three.component';
import { ScreenFourLevelTwoComponent } from './components/levels/two/screen-four-level-two/screen-four-level-two.component';
import { ScreenOneLevelTwoComponent } from './components/levels/two/screen-one-level-two/screen-one-level-two.component';
import { ScreenThreeLevelTwoComponent } from './components/levels/two/screen-three-level-two/screen-three-level-two.component';
import { ScreenTwoLevelTwoComponent } from './components/levels/two/screen-two-level-two/screen-two-level-two.component';
import { EmailInputComponent } from './components/email-input/email-input.component';
import { UserFeedbackQuestionComponent } from './components/user-feedback-question/user-feedback-question.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: "email-input",  component: EmailInputComponent},
  {path: "user-feedback-question", component: UserFeedbackQuestionComponent},
  {path: 'fases', component: LevelSelectionComponent},
  {path: '', pathMatch: 'full', redirectTo: '/settings'},  
  {path: 'settings', component: SettingsComponent},  
  {path: 'settings/edit', component: SettingsComponent},  
  {path: 'fase-1-1', component: ScreenOneLevelOneComponent},
  {path: 'fase-1-2', component: ScreenTwoLevelOneComponent},
  {path: 'fase-1-3', component: ScreenThreeLevelOneComponent},
  {path: 'fase-1-4', component: ScreenFourLevelOneComponent},
  {path: 'fase-2-1', component: ScreenOneLevelTwoComponent},
  {path: 'fase-2-2', component: ScreenTwoLevelTwoComponent},
  {path: 'fase-2-3', component: ScreenThreeLevelTwoComponent},
  {path: 'fase-2-4', component: ScreenFourLevelTwoComponent},
  {path: 'fase-3-1', component: ScreenOneLevelThreeComponent},
  {path: 'fase-3-2', component: ScreenTwoLevelThreeComponent},
  {path: 'fase-3-3', component: ScreenThreeLevelThreeComponent},
  {path: 'fase-3-4', component: ScreenFourLevelThreeComponent},
  {path: 'fase-4-1', component: ScreenOneLevelFourComponent},
  {path: 'fase-4-2', component: ScreenTwoLevelFourComponent},
  {path: 'fase-4-3', component: ScreenThreeLevelFourComponent},
  {path: 'fase-4-4', component: ScreenFourLevelFourComponent},
  {path: 'fase-5-1', component: ScreenOneLevelFiveComponent},
  {path: 'fase-5-2', component: ScreenTwoLevelFiveComponent},
  {path: 'fase-5-3', component: ScreenThreeLevelFiveComponent},
  {path: 'fase-5-4', component: ScreenFourLevelFiveComponent},
  {path: 'fase-6-1', component: ScreenOneLevelSixComponent},
  {path: 'fase-6-2', component: ScreenTwoLevelSixComponent},
  {path: 'fase-6-3', component: ScreenThreeLevelSixComponent},
  {path: 'fase-6-4', component: ScreenFourLevelSixComponent},
  {path: 'fase-7-1', component: ScreenOneLevelSevenComponent},
  {path: 'fase-7-2', component: ScreenTwoLevelSevenComponent},
  {path: 'fase-7-3', component: ScreenThreeLevelSevenComponent},
  {path: 'fase-8-1', component: ScreenOneLevelEightComponent},
  {path: 'fase-8-2', component: ScreenTwoLevelEightComponent},
  {path: 'fase-8-3', component: ScreenThreeLevelEightComponent},
  {path: 'fase-8-4', component: ScreenFourLevelEightComponent},
  {path: 'fase-8-5', component: ScreenFiveLevelEightComponent},
  {path: 'fase-8-6', component: ScreenSixLevelEightComponent},
  {path: 'fase-8-7', component: ScreenSevenLevelEightComponent},
  {path: 'fase-8-8', component: ScreenEightLevelEightComponent},
  {path: 'fase-8-9', component: ScreenNineLevelEightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
