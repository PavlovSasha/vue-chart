import Chart from 'chart.js';

Chart.elements.Arc.prototype.draw = function () {
  const ctx = this._chart.ctx;
  const vm = this._view;
  const sA = vm.startAngle;
  const eA = vm.endAngle;
  const cst = vm.borderColor !== 'transparent' ? vm.borderWidth : 0;

  ctx.beginPath();

  if (this._index === 0) {
    debugger;
  }

  ctx.arc(vm.x, vm.y, vm.outerRadius + cst / 2, sA, eA);
  ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

  ctx.closePath();
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = vm.borderWidth;

  ctx.fillStyle = vm.backgroundColor;

  ctx.fill();
  ctx.lineJoin = 'bevel';
};
