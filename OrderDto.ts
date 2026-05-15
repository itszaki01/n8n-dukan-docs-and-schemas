{
  "type": "object",
  "required": [
    "clientName",
    "shippingType",
    "orderedProducts"
  ],
  "properties": {
    "isUncompletedOrder": {
      "type": "boolean"
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
