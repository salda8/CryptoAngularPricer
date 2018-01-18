import { Directive } from "@angular/core";

@Directive({
  selector: "button[appRedditWidget]",
  host: {
    "(click)": "onClick($event.target)"
  }
})
export class RedditWidgetDirective {
  element: HTMLScriptElement;

  onClick(btn) {

    this.element = document.createElement("script");
    this.element.type = "text/javascript";
    this.element.src = "https://www.reddit.com/r/ethereum.embed?limit=5";
    console.log(this.element);
    document.body.appendChild(this.element);

  }


  constructor() { }

  load() {
    // var scriptTag = document.createElement('script');
    // scriptTag.attr('charset', 'utf-8');
    // scriptTag.attr('src', 'http://static.polldaddy.com/p/0000000.js');


  }

}
