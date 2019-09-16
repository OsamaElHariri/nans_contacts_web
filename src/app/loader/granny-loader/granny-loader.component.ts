import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-granny-loader',
  templateUrl: './granny-loader.component.html',
  styleUrls: ['./granny-loader.component.scss']
})
export class GrannyLoaderComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() onPromptClicked: Function;
  @Input() promptText: string;

  loadingText: string = "Now where are my glasses...";

  ngOnInit(): void {
    const loadingTexts = [
      'Oh dear, my show is almost on...',
      'I need a cup of water...',
      'Now where are my glasses...',
      'Lovely day for a walk...'
    ];
    const textIndex = Math.floor(Math.random() * loadingTexts.length);
    this.loadingText = loadingTexts[textIndex];
  }


}
