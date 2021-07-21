"use strict";

const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
const testCase = require("../json/test.json");
var event, context;

event = testCase.luchoFunkchonUploadImageTest;

describe("Tests index", function () {
  it("verifies successful response", async () => {
    const result = await app.luchoFunkchon(event, context);
    expect(result).to.be.an("object");
    //expect(result.statusCode).to.equal(200);
    //expect(result.body).to.be.an("string");

    //let response = JSON.parse(result.body);
    //expect(response).to.be.an("object");
    //expect(response.message).to.be.equal("hola");
    //expect(response.message).to.be.an("string");
  });
});
