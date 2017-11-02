import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback/feedback.service';
import { Feedback } from '../models/feedback.model';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-feedback-session',
  templateUrl: './student-feedback-session.component.html',
  styleUrls: ['./student-feedback-session.component.css'],
  providers: [FeedbackService]
})
export class StudentFeedbackSessionComponent implements OnInit {

  currentDate : number;
  feedbackId : number;
  questions : Question[];
  answers : Answer[];
  anss : Answer;


  constructor(private feedbackService: FeedbackService,private route: ActivatedRoute) { 
    this.currentDate = Date.now();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.feedbackId = params['fId'];
    });
    this.getQuestions();
  }

  getQuestions(){
    this.feedbackService.getQuestions(this.feedbackId).subscribe(questions=>{
      this.questions = questions;
      console.log(this.questions);
    });
  }

  processFeedback(feed : NgForm){
   
    let answers : any [] = feed.value;
    let count = Object.keys(answers).length;
    let keys = Object.keys(answers);
    let q : Number;
    this.answers=[];
   
    for(let i=0;i<count;i++){
      let ans : Answer = {};
      q = Number(keys[i]);
      ans['qId'] = q;     
      ans.answer = answers[Number(keys[i])];
      console.log(ans);
      this.answers.push(ans);
    }

    console.log(this.answers);
    this.feedbackService.submitAnswers(this.answers).subscribe(()=>{
      swal(
        'Success!',
        'Feedback is successfully Submitted',
        'success'
      )
    })

  }

}

interface Question{
  qId : number;
  question : String;
}

interface Answer{
  qId ?: Number;
  answer ?: String;
}
