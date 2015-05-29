/* global define, describe, it, before */
///<reference path="../assets/scripts/_declare/jasmine.d.ts"/>
///<reference path="../assets/scripts/infrastructure/xml.ts"/>

'use strict';
define(['require', 'exports', 'model/DataService', 'jquery', 'infrastructure/xml'], function tests(require, exports, DataService) {
  var $ = require('jquery');
  var xml = require('infrastructure/xml');
  describe('DataService', function() {
    describe('getCustomers', function() {
      var service;
      beforeEach(function() {
        service = new DataService({
          getAllCustomers: 'tests/GetAllCustomers.xml'
        }, {
          send: $.ajax
        });
      });
      it('should return parsed as json', function(done) {
        service.getCustomers().then(function(data) {
          expect(data.length).toEqual(1);
          var customerJson = data[0];
          expect(customerJson).toEqual({
            accountNumber: '0',
            addressCity: null,
            addressCountry: null,
            addressStreet: null,
            firstName: 'Oskar',
            gender: 'Male',
            lastName: 'Gewalli',
            pictureUri: null
          });
          done();
        });
      });
    });
    describe('saveCustomer', function() {
      var service;
      var sent = [];
      beforeEach(function() {
        service = new DataService({
          saveCustomer: 'tests/SaveCustomer.xml'
        }, {
          send: function(data) {
            sent.push(data);
            //return {};
          }
        });
      });
      it('should send xml', function(done) {
        service.saveCustomer({
          accountNumber: '0',
          addressCity: null,
          addressCountry: null,
          addressStreet: null,
          firstName: 'Oskar',
          gender: 'Male',
          lastName: 'Gewalli',
          pictureUri: null
        });
        var expectedData = '<Customer><AccountNumber>0</AccountNumber><AddressCity i:nil="true"/><AddressCountry i:nil="true"/><AddressStreet i:nil="true"/><FirstName>Oskar</FirstName><Gender>Male</Gender><LastName>Gewalli</LastName><PictureUri i:nil="true"/></Customer>';
        expect(sent.length).toEqual(1);
        expect(xml.toString(sent[0].data)).toEqual(expectedData);
        done();
      });
    });
  });
});
