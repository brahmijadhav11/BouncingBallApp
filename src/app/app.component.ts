import { Component, AfterContentInit, OnChanges, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterContentInit {

  cx = 2;
  cy = 2;
  vx = 2;
  vy = 5;
  radius = 6;
  gravity = 0.2;
  damping = 0.85;
  traction = 0.8;
  paused = false;
  rect: any;
  ball: any;
  width = 400;
  height = 300;

  ngAfterContentInit() {

    this.rect = d3.select('svg').insert("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "black");

    this.ball = d3.select('svg').insert("circle")
      .attr("cx", this.cx)
      .attr("cy", this.cy)
      .attr("r", this.radius)
      .attr("fill", "blue");
  }

  onStartClick() {
    setInterval(() => { this.drawBall(); }, 60);
  }

  drawBall() {
    this.ball.attr("cx", this.moveX()).attr("cy", this.moveY());
  }

  moveX() {
    if (this.cx + this.radius >= this.width) {
      this.vx = -this.vx * this.damping;
      this.cx = this.width - this.radius;
    } else if (this.cx - this.radius <= 0) {
      this.vx = -this.vx * this.damping;
      this.cx = this.radius;
    }
    this.cx += this.vx;
    return this.cx;
  }

  moveY() {
    if (this.cy + this.radius >= this.height) {
      this.vy = -this.vy * this.damping;
      this.cy = this.height - this.radius;
      this.vx *= this.traction;
    } else if (this.cy - this.radius <= 0) {
      this.vy = -this.vy * this.damping;
      this.cy = this.radius;
    }
    this.vy += this.gravity;
    this.cy += this.vy;
    return this.cy;
  }
}
