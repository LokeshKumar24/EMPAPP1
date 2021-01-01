/*global QUnit*/

sap.ui.define([
	"EA/EmployeeApp2/controller/Login1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Login1 Controller");

	QUnit.test("I should test the Login1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
