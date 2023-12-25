import { NgModule } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { QuestionRoutingModule } from './question-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

@NgModule({
  declarations: [
    AddQuestionComponent,
    MultipleChoiceComponent,
    QuestionDetailsComponent
  ],
  imports: [
    SharedModuleModule,
    QuestionRoutingModule
  ],
})
export class QuestionModule {}
