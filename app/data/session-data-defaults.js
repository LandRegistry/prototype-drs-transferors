/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  "title-number": "DN653151",
  "abr": "R377PWX",
  "sign-off-name": "HM Land Registry",
  "sign-off-phone": "0300 006 0411",
  "sign-off-office": "Plymouth",
  "property-desc": "112 Tehaford Road, BUDLE, NE69 6EU",
  "notice-expiry-day": "25",
  "notice-expiry-month": "11",
  "notice-expiry-year": "2020",
  "proprieter-1-name": "Dan Evans",
  "customer-name": "Scott & Partners",
  "customer-address": "123 Adelaide Street, LONDON",
  "customer-postcode": "SW12 6MP",
  "customer-ref": "RE-MORT/EVANS",
  "customer-phone": "020 123 789"


  // "correspondences": [
  //   {
  //     "id": "1",
  //     "summary": [
  //       { title:"Title number", value:"DN653151"},
  //       { title:"ABR", value: "R377PWX"}
  //     ]
  //     "needs": [
  //       { type:"Accommodation", risk: true},
  //       { type:"ETE", risk:true},
  //       { type:"Finance", risk: true},
  //       { type:"Relationships", risk:true},
  //       { type:"Alcohol misuse" },
  //       { type:"Emotional well-being" },
  //       { type:"Thinking and behaviour" }
  //     ]
  //   }
  // ]

}
