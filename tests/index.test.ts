//FizzBuzz.test.ts
/// <reference types="jest" />

import { listItemFromTable, putItemFromTable, deleteItemFromTable } from '../src/mock-db';

const getResponseCB = (done: any, assertion: any)=>{
  return (err: any, data: any) => {
    try {
      if (err) {
        done(err);
      }
      else {
        assertion(data);
        done();
      }
    } catch (error) {
      done(error);
    }
  }
}

describe("sample db tests", ()=>{
	beforeAll(() => {
      const param1 = {
        Table: "SimpleTable",
        Item: {  
          "UserId": "1", 
          "UserName": "User1", 
          "Status": "PENDING"
        }
      }
      const param2 = {
        Table: "SimpleTable",
        Item: {  
          "UserId": "2", 
          "UserName": "User2", 
          "Status": "PAID",
          "Results": [{id: "2", data: "dummy data"}]
        }
      }
      putItemFromTable(param1, (err, data)=>{});
      putItemFromTable(param2,(err, data)=>{});
    });

    afterAll((done)=>{
      const param1 = {
        Table: "SimpleTable",
        Key:   "UserId",
        Value:  "1"
      }
      const param2 = {
        Table: "SimpleTable",
        Key:   "UserId",
        Value:  "2"
      }
      const param3 = {Table: "SimpleTable"};
      
      deleteItemFromTable(param1, (err, data)=>{});
      deleteItemFromTable(param2,(err, data)=>{});
    })


    describe("scanSimpleTable", ()=>{
      it("should return last 2 items from SimpleTable table", (done)=>{
        const assertion = (data)=>{
          const result = [
            {  
              "UserId": "1", 
              "UserName": "User1", 
              "Status": "PENDING"
            },
            {  
              "UserId": "2", 
              "UserName": "User2", 
              "Status": "PAID",
              "Results": [{id: "2",  data: "dummy data"}]
            }
          ];
          expect(data).toEqual(result);
        }
        const params = {Table: "SimpleTable"};
        const cb = getResponseCB(done, assertion)
        listItemFromTable(params, cb);
      })
    }) 
})
