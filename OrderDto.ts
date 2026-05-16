    @IsMongoId()
    @IsOptional()
    locationId?: string;

    @IsOptional()
    @IsBoolean()
    isUncompletedOrder?:booelan // make sure to check this twice

    @IsString()
    @IsOptional()
    stopDeskId?: string;

    @IsString()
    @IsOptional()
    clientName?: string = "غير معروف";

    @IsString()
    @IsOptional()
    clientCity?: string;

    @IsMongoId()
    @IsOptional()
    subLocationId?: string;

    @IsString()
    @IsOptional()
    clientSecondPhoneNumber?: string;

    @IsString()
    @IsOptional()
    clientFullAddress?: string;

    @IsString()
    @IsOptional()
    clientPhoneNumber: string;

    @IsNotEmpty()
    @IsEnum(["للمنزل", "لنقطة الإستلام"])
    shippingType: "للمنزل" | "لنقطة الإستلام";

    @Exclude()
    orderStatus: "جديد";

    @IsString()
    @IsOptional()
    orderSourceUrl?: string;

    @IsArray()
    @IsOptional()
    shippingDetails: StoreOrderCart["shippingDetails"];

    @IsOptional()
    @IsString()
    coupon?: string;

    @IsArray()
    orderedProducts: {
        productId: string;
        validProduct: StoreProduct;
        totalProductPrice: number;
        totalProductFees?: number;
        quentity: number;
        propertiesSelected?: {
            parentPropertyId: string;
            childPropertiesSelected: {
                childPropertyId: string;
                childPropertyQtty?: number;
            }[];
        }[];
        colorsSelected?: {
            colorId: string;
            colorQtty?: number;
        }[];
        offerId?: string;
    }[];

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
