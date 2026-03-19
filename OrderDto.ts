{
  "type": "object",
  "required": [
    "subStore",
    "clientName",
    "shippingType",
    "orderedProducts"
  ],
  "properties": {
    "subStore": {
      "type": "string",
      "description": "Mongo ObjectId"
    },
    "locationId": {
      "type": "string"
    },
    "subLocationId": {
      "type": "string"
    },
    "stopDeskId": {
      "type": "string"
    },
    "clientName": {
      "type": "string"
    },
    "clientPhoneNumber": {
      "type": "string"
    },
    "clientSecondPhoneNumber": {
      "type": "string"
    },
    "clientCity": {
      "type": "string"
    },
    "clientFullAddress": {
      "type": "string"
    },
    "shippingType": {
      "type": "string",
      "enum": ["للمنزل", "لنقطة الإستلام"]
    },
    "isFreeShipping": {
      "type": "boolean"
    },
    "orderStatus": {
      "type": "string",
      "enum": [
        "جديد",
        "مكالمة 1",
        "مكالمة 2",
        "مكالمة 3",
        "مكالمة 4",
        "مكالمة 5",
        "مأكد",
        "ملغي",
        "مؤجل"
      ]
    },
    "shippingDetails": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["fieldName", "fieldValue", "fieldType", "fieldId"],
        "properties": {
          "fieldName": { "type": "string" },
          "fieldValue": { "type": "string" },
          "fieldType": {
            "type": "string",
            "enum": [
              "text",
              "textarea",
              "number-input",
              "hidden",
              "select",
              "phone-number",
              "locations",
              "subLocations",
              "client-name",
              "second-phone-number",
              "client-full-address"
            ]
          },
          "fieldId": { "type": "string" }
        }
      }
    },
    "orderedProducts": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["productId"],
        "properties": {
          "productId": {
            "type": "string",
            "description": "Mongo ObjectId"
          },
          "quentity": {
            "type": "number",
            "minimum": 1
          },
          "offerId": {
            "type": "string"
          },
          "propertiesSelected": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["parentPropertyId", "childPropertiesSelected"],
              "properties": {
                "parentPropertyId": {
                  "type": "string"
                },
                "childPropertiesSelected": {
                  "type": "array",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "required": ["childPropertyId"],
                    "properties": {
                      "childPropertyId": {
                        "type": "string"
                      },
                      "childPropertyQtty": {
                        "type": "number",
                        "minimum": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "colorsSelected": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["colorId"],
              "properties": {
                "colorId": {
                  "type": "string"
                },
                "colorQtty": {
                  "type": "number",
                  "minimum": 1
                }
              }
            }
          }
        }
      }
    }
  }
}
