import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

export const routes: Routes = [
    { path: 'addQuestion', component: AddQuestionComponent },
    { path: 'questionDetails', component: QuestionDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionRoutingModule { }
