(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["monitor-monitor-module"],{

/***/ "./src/app/modules/monitor/monitor-bar/monitor-bar.component.html":
/*!************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-bar/monitor-bar.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  monitor-bar works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-bar/monitor-bar.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-bar/monitor-bar.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbW9uaXRvci9tb25pdG9yLWJhci9tb25pdG9yLWJhci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-bar/monitor-bar.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-bar/monitor-bar.component.ts ***!
  \**********************************************************************/
/*! exports provided: MonitorBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorBarComponent", function() { return MonitorBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MonitorBarComponent = /** @class */ (function () {
    function MonitorBarComponent() {
    }
    MonitorBarComponent.prototype.ngOnInit = function () {
    };
    MonitorBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-monitor-bar',
            template: __webpack_require__(/*! ./monitor-bar.component.html */ "./src/app/modules/monitor/monitor-bar/monitor-bar.component.html"),
            styles: [__webpack_require__(/*! ./monitor-bar.component.scss */ "./src/app/modules/monitor/monitor-bar/monitor-bar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MonitorBarComponent);
    return MonitorBarComponent;
}());



/***/ }),

/***/ "./src/app/modules/monitor/monitor-pie/monitor-pie.component.html":
/*!************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-pie/monitor-pie.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"monitor-pie\">\n\t<mat-card>\n\n\t\t<mat-card-content>\n\t\t\t<ng-container *ngIf=\"(pieData); else noData\">\n\t\t\t\t\t<ng-container *ngIf=\"(loadDate); else spinner\">\n\t\t\t\t</ng-container>\n\t\t</ng-container>\n\t\t\t<ng-template #spinner>\n\t\t\t\t<div class=\"h-100 w-100\" fxLayoutAlign=\"center center\">\n\t\t\t\t\t<mat-spinner diameter=\"50\" strokeWidth=\"5\"></mat-spinner>\n\t\t\t\t</div>\n\t\t\t</ng-template>\n\t\t\t<ng-template #noData1>\n\t\t\t\t<div class=\"no-data\">\n\t\t\t\t\t<span class=\"mat-body c54\">No data available. </span>\n\t\t\t\t</div>\n\t\t\t</ng-template>\n\t\t\t<ng-template #noData>\n\t\t\t\t<div class=\"chart\">\n\t\t\t\t\t<app-monitor-pie-chart></app-monitor-pie-chart>\n\t\t\t\t</div>\n\t\t\t</ng-template>\n\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-pie/monitor-pie.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-pie/monitor-pie.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbW9uaXRvci9tb25pdG9yLXBpZS9tb25pdG9yLXBpZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-pie/monitor-pie.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-pie/monitor-pie.component.ts ***!
  \**********************************************************************/
/*! exports provided: MonitorPieComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorPieComponent", function() { return MonitorPieComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MonitorPieComponent = /** @class */ (function () {
    function MonitorPieComponent() {
        this.pieData = false;
    }
    MonitorPieComponent.prototype.ngOnInit = function () {
    };
    MonitorPieComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-monitor-pie',
            template: __webpack_require__(/*! ./monitor-pie.component.html */ "./src/app/modules/monitor/monitor-pie/monitor-pie.component.html"),
            styles: [__webpack_require__(/*! ./monitor-pie.component.scss */ "./src/app/modules/monitor/monitor-pie/monitor-pie.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MonitorPieComponent);
    return MonitorPieComponent;
}());



/***/ }),

/***/ "./src/app/modules/monitor/monitor-real.component.html":
/*!*************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-real.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row \">\n\t<div class=\"col-4 mb-24\">\n\t\t<app-monitor-pie></app-monitor-pie>\n\t</div>\n\t<div class=\"col-8 mb-24\">\n\t\t<app-monitor-semipie></app-monitor-semipie>\n   </div>\n\n   <div class=\"col-4 mb-24\">\n\t\t<app-monitor-bar></app-monitor-bar>\n\t</div>\n\t\n\t<div class=\"col-8 mb-24\">\n\t\t<app-monitor-table></app-monitor-table>\n\t</div>\n\n\t<div class=\"col-12 mb-24\">\n\t\t<app-montior-heat></app-montior-heat>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-real.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-real.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbW9uaXRvci9tb25pdG9yLXJlYWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-real.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/modules/monitor/monitor-real.component.ts ***!
  \***********************************************************/
/*! exports provided: MonitorRealComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorRealComponent", function() { return MonitorRealComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MonitorRealComponent = /** @class */ (function () {
    function MonitorRealComponent() {
    }
    MonitorRealComponent.prototype.ngOnInit = function () {
    };
    MonitorRealComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-monitor-real',
            template: __webpack_require__(/*! ./monitor-real.component.html */ "./src/app/modules/monitor/monitor-real.component.html"),
            styles: [__webpack_require__(/*! ./monitor-real.component.scss */ "./src/app/modules/monitor/monitor-real.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MonitorRealComponent);
    return MonitorRealComponent;
}());



/***/ }),

/***/ "./src/app/modules/monitor/monitor-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/modules/monitor/monitor-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: MonitorRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorRoutingModule", function() { return MonitorRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _monitor_real_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./monitor-real.component */ "./src/app/modules/monitor/monitor-real.component.ts");




var routes = [
    { path: '', component: _monitor_real_component__WEBPACK_IMPORTED_MODULE_3__["MonitorRealComponent"] }
];
var MonitorRoutingModule = /** @class */ (function () {
    function MonitorRoutingModule() {
    }
    MonitorRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], MonitorRoutingModule);
    return MonitorRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"monitor-pie\">\n\t<mat-card>\n\t\t<mat-card-header>\n\t\t\t<mat-card-title>Monitor</mat-card-title>\n\t\n\t\t</mat-card-header>\n\t\t<mat-card-content>\n\t\t\n\t\t\t<ng-template #spinner>\n\t\t\t\t<div class=\"h-100 w-100\" fxLayoutAlign=\"center center\">\n\t\t\t\t\t<mat-spinner diameter=\"50\" strokeWidth=\"5\"></mat-spinner>\n\t\t\t\t</div>\n\t\t\t</ng-template>\n\t\t\t<ng-template #noFreqData>\n\t\t\t\t<div class=\"no-data\">\n\t\t\t\t\t<span class=\"mat-body c54\">No frequency data available for selected machine and starting time.Please\n\t\t\t\t\t\tselect\n\t\t\t\t\t\tdifferent machine and starting time.</span>\n\t\t\t\t</div>\n\t\t\t</ng-template>\n\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbW9uaXRvci9tb25pdG9yLXNlbWlwaWUvbW9uaXRvci1zZW1pcGllLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.ts ***!
  \******************************************************************************/
/*! exports provided: MonitorSemipieComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorSemipieComponent", function() { return MonitorSemipieComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MonitorSemipieComponent = /** @class */ (function () {
    function MonitorSemipieComponent() {
    }
    MonitorSemipieComponent.prototype.ngOnInit = function () {
    };
    MonitorSemipieComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-monitor-semipie',
            template: __webpack_require__(/*! ./monitor-semipie.component.html */ "./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.html"),
            styles: [__webpack_require__(/*! ./monitor-semipie.component.scss */ "./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MonitorSemipieComponent);
    return MonitorSemipieComponent;
}());



/***/ }),

/***/ "./src/app/modules/monitor/monitor-table/monitor-table.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-table/monitor-table.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  monitor-table works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-table/monitor-table.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-table/monitor-table.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbW9uaXRvci9tb25pdG9yLXRhYmxlL21vbml0b3ItdGFibGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/monitor/monitor-table/monitor-table.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/modules/monitor/monitor-table/monitor-table.component.ts ***!
  \**************************************************************************/
/*! exports provided: MonitorTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorTableComponent", function() { return MonitorTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MonitorTableComponent = /** @class */ (function () {
    function MonitorTableComponent() {
    }
    MonitorTableComponent.prototype.ngOnInit = function () {
    };
    MonitorTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-monitor-table',
            template: __webpack_require__(/*! ./monitor-table.component.html */ "./src/app/modules/monitor/monitor-table/monitor-table.component.html"),
            styles: [__webpack_require__(/*! ./monitor-table.component.scss */ "./src/app/modules/monitor/monitor-table/monitor-table.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MonitorTableComponent);
    return MonitorTableComponent;
}());



/***/ }),

/***/ "./src/app/modules/monitor/monitor.module.ts":
/*!***************************************************!*\
  !*** ./src/app/modules/monitor/monitor.module.ts ***!
  \***************************************************/
/*! exports provided: MonitorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorModule", function() { return MonitorModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _monitor_real_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./monitor-real.component */ "./src/app/modules/monitor/monitor-real.component.ts");
/* harmony import */ var _monitor_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./monitor-routing.module */ "./src/app/modules/monitor/monitor-routing.module.ts");
/* harmony import */ var _monitor_pie_monitor_pie_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./monitor-pie/monitor-pie.component */ "./src/app/modules/monitor/monitor-pie/monitor-pie.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-pick-datetime */ "./node_modules/ng-pick-datetime/picker.js");
/* harmony import */ var ng_pick_datetime_date_time_adapter_moment_adapter_moment_date_time_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module */ "./node_modules/ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module.js");
/* harmony import */ var _monitor_semipie_monitor_semipie_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./monitor-semipie/monitor-semipie.component */ "./src/app/modules/monitor/monitor-semipie/monitor-semipie.component.ts");
/* harmony import */ var _monitor_bar_monitor_bar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./monitor-bar/monitor-bar.component */ "./src/app/modules/monitor/monitor-bar/monitor-bar.component.ts");
/* harmony import */ var _monitor_table_monitor_table_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./monitor-table/monitor-table.component */ "./src/app/modules/monitor/monitor-table/monitor-table.component.ts");
/* harmony import */ var _montior_heat_montior_heat_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./montior-heat/montior-heat.component */ "./src/app/modules/monitor/montior-heat/montior-heat.component.ts");















var MonitorModule = /** @class */ (function () {
    function MonitorModule() {
    }
    MonitorModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _monitor_real_component__WEBPACK_IMPORTED_MODULE_3__["MonitorRealComponent"],
                _monitor_pie_monitor_pie_component__WEBPACK_IMPORTED_MODULE_5__["MonitorPieComponent"],
                _monitor_semipie_monitor_semipie_component__WEBPACK_IMPORTED_MODULE_11__["MonitorSemipieComponent"],
                _monitor_bar_monitor_bar_component__WEBPACK_IMPORTED_MODULE_12__["MonitorBarComponent"],
                _monitor_table_monitor_table_component__WEBPACK_IMPORTED_MODULE_13__["MonitorTableComponent"],
                _montior_heat_montior_heat_component__WEBPACK_IMPORTED_MODULE_14__["MontiorHeatComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _monitor_routing_module__WEBPACK_IMPORTED_MODULE_4__["MonitorRoutingModule"],
                /* Material modules */
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_7__["MatMomentDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__["A11yModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonToggleModule"],
                ng_pick_datetime__WEBPACK_IMPORTED_MODULE_9__["OwlDateTimeModule"],
                ng_pick_datetime__WEBPACK_IMPORTED_MODULE_9__["OwlNativeDateTimeModule"],
                ng_pick_datetime_date_time_adapter_moment_adapter_moment_date_time_module__WEBPACK_IMPORTED_MODULE_10__["OwlMomentDateTimeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSliderModule"]
            ]
        })
    ], MonitorModule);
    return MonitorModule;
}());



/***/ }),

/***/ "./src/app/modules/monitor/montior-heat/montior-heat.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/modules/monitor/montior-heat/montior-heat.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  montior-heat works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/monitor/montior-heat/montior-heat.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/modules/monitor/montior-heat/montior-heat.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbW9uaXRvci9tb250aW9yLWhlYXQvbW9udGlvci1oZWF0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/monitor/montior-heat/montior-heat.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/modules/monitor/montior-heat/montior-heat.component.ts ***!
  \************************************************************************/
/*! exports provided: MontiorHeatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MontiorHeatComponent", function() { return MontiorHeatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MontiorHeatComponent = /** @class */ (function () {
    function MontiorHeatComponent() {
    }
    MontiorHeatComponent.prototype.ngOnInit = function () {
    };
    MontiorHeatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-montior-heat',
            template: __webpack_require__(/*! ./montior-heat.component.html */ "./src/app/modules/monitor/montior-heat/montior-heat.component.html"),
            styles: [__webpack_require__(/*! ./montior-heat.component.scss */ "./src/app/modules/monitor/montior-heat/montior-heat.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MontiorHeatComponent);
    return MontiorHeatComponent;
}());



/***/ })

}]);
//# sourceMappingURL=monitor-monitor-module.js.map