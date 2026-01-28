//Front End Interface
export interface IOrderDto {
    locationId?: string;

    clientCity?: string;

    subLocationId?: string;

    storeName: string;

    clientPhoneNumber?: string;

    clientSecondPhoneNumber?: string;

    clientFullAddress?: string;

    clientName?: string;

    totalCartPrice: number;

    totalProductsPrice: number;

    allowCustomTotalProductsPrice: boolean;

    allowCustomShippingPrice: boolean;

    shippingPrice: number;

    stopDeskId?: string;

    isFromSubStore: boolean;

    shippingDetails: {
        fieldName: string;
        fieldValue: string;
        fieldType: IStoreSettingsDto["orderFormInputs"][number]["inputType"];
        fieldId: string;
    }[];

    subStore: string;

    shippingType: "للمنزل" | "لنقطة الإستلام"

    note?: string;

    orderTracking?: string;

    deliveryStatus: string | "قيد المعالجة" | "قيد التجهيز" | "قيد التوصيل" | "مستلم" | "مسترجع" | "نفذ المخزون" | "مستبدل"

    orderStatus: string | "جديد" | "مكالمة 1" | "مكالمة 2" | "مكالمة 3" | "مكالمة 4" | "مكالمة 5" | "مكالمة 6" | "مأكد" |"مكرر" | "ملغي" | "مؤجل"

    coupon?: string;

    orderedProducts: {
        productId: string;
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
}

//Nest Js DTO
export class CreateStoreOrderCartDto {
    @Exclude()
    cartUID: string;

    @IsMongoId()
    @IsOptional()
    locationId?: string;

    @IsString()
    @IsOptional()
    stopDeskId: string;

    @IsMongoId()
    @IsNotEmpty()
    subStore: string;

    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsString()
    @IsOptional()
    totalProductsPrice: number;

    @IsArray()
    @IsOptional()
    shippingDetails: StoreOrderCart["shippingDetails"];

    @IsBoolean()
    @IsOptional()
    allowCustomTotalProductsPrice: boolean;

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
    shippingType: "للمنزل" | "لنقطة الإستلام" 

    @IsOptional()
    @IsBoolean()
    isFreeShipping?: boolean;

    @IsOptional()
    @IsEnum(["جديد", "مكالمة 1", "مكالمة 2", "مكالمة 3", "مكالمة 4", "مكالمة 5", "مأكد", "ملغي", "مؤجل"])
    orderStatus: StoreOrderCart['orderStatus']

    @Exclude()
    coupon?: string;

    @IsArray()
    orderedProducts: {
        totalProductPrice: number;
        totalProductFees?: number;
        productId: string;
        validProduct: StoreProduct;
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
}

//Mongoose Schema
export class StoreOrderCart {
    @Prop({ required: true })
    cartUID: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company: string;

    @Prop()
    orderNumber: string;

    @Prop({ default: false })
    isConfirmationServiceFeesPaid?: boolean;

    @Prop({ default: false })
    isAgencyConfirmationServiceFeesPaid?: boolean;

    @Prop({ default: false })
    isShippedViaApi?: boolean;

    @Prop({ default: false })
    itsFeesCoveredByCompany?: boolean;

    @Prop({ default: false })
    isFeesPaidByCompany?: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreLocation.name })
    locationId?: string | StoreLocation | null;

    @Prop()
    clientSubLocation?: string;

    @Prop({ required: true })
    storeName: string;

    @Prop()
    clientPhoneNumber: string;

    @Prop()
    clientSecondPhoneNumber?: string;

    @Prop()
    clientFullAddress?: string;

    @Prop()
    clientName: string;

    @Prop()
    clientCity?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreLocationSub.name })
    subLocationId?: StoreLocationSub | null | string;

    @Prop()
    orderTracking?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserStore.name })
    assignToStoreCallMember: UserStoreDocument | null | string;

    @Prop({ required: true })
    totalCartPrice: number;

    @Prop({ required: true })
    totalProductsPrice: number;

    @Prop({ default: false })
    allowCustomTotalProductsPrice: boolean;

    @Prop({ default: false })
    allowCustomShippingPrice: boolean;

    @Prop({ required: true })
    shippingPrice: number;

    @Prop({ required: true })
    totalProductsFees: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreLocationStopDesk.name })
    stopDeskId?: string;

    @Prop()
    isNewClient: boolean;

    @Prop()
    isDangerClient: boolean;

    @Prop()
    totalPreviousOrders: number;

    @Prop({
        type: {
            confrirmedOrders: Number,
            cancledOrders: Number,
            returnedOrders: Number,
            delivredOrders: Number,
        },
    })
    previousOrdersAnlytics: {
        confrirmedOrders: number;
        cancledOrders: number;
        returnedOrders: number;
        delivredOrders: number;
    };

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Store.name, required: true })
    store: string;

    @Prop({ required: true })
    isFromSubStore: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Store.name, required: true })
    subStore: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Store.name, })
    forwardToStore?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreShippingComapany.name })
    shippedByCompany?: StoreShippingComapanyDocument | string;

    @Prop({ type: String, enum: ["للمنزل", "لنقطة الإستلام"], required: true })
    shippingType: "للمنزل" | "لنقطة الإستلام";

    @Prop()
    note?: string;

    @Prop({
        type: String,
        default: "قيد المعالجة",
        required: true,
    })
    deliveryStatus: string | "قيد المعالجة" | "قيد التجهيز" | "قيد التوصيل" | "مستلم" | "مسترجع" | "نفذ المخزون" | "مستبدل";

    @Prop({
        type: String,
        required: true,
    })
    orderStatus: string | "جديد" | "مكالمة 1" | "مكالمة 2" | "مكالمة 3" | "مكالمة 4" | "مكالمة 5" | "مأكد" | "مكرر" | "ملغي" | "مؤجل";

    @Prop({
        type: [
            {
                fieldName: String,
                fieldValue: String,
                fieldType: {
                    type: String,
                    enum: [
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
                        "client-full-address",
                    ],
                },
                fieldId: String,
            },
        ],
    })
    shippingDetails: {
        fieldName: string;
        fieldValue: string;
        fieldType:
        | "text"
        | "textarea"
        | "number-input"
        | "hidden"
        | "select"
        | "phone-number"
        | "locations"
        | "subLocations"
        | "client-name"
        | "second-phone-number"
        | "client-full-address";
        fieldId: string;
    }[];

    @Prop()
    coupon?: string;

    @Prop()
    isUncompletedOrder?: boolean;

    @Prop()
    itHasAnOrderAfter?: boolean;

    @Prop({
        type: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: StoreProduct.name, required: true },
                totalProductPrice: { type: Number, required: true },
                totalProductFees: { type: Number, default: 0 },
                quentity: { type: Number, default: 1, min: [1, "أقل كمية للطب هي 1"] },
                propertiesSelected: [
                    {
                        parentPropertyId: String,
                        childPropertiesSelected: [{ childPropertyId: String, childPropertyQtty: { type: Number, min: [1, "أقل كمية للطلب هي 1"] } }],
                    },
                ],
                colorsSelected: [{ colorId: String, colorQtty: { type: Number, min: [1, "أقل كمية للطلب هي 1"] } }],
                offerId: String,
            },
        ],
    })
    orderedProducts: {
        productId: StoreProductDocument | string;
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
        _id?: string;
    }[];

    @Prop({
        type: Date,
        default: undefined,
        index: { expireAfterSeconds: 0 },
    })
    expireAt: Date;

    @Prop()
    assignedAt: Date;
}



//Examples

{
  "_id": {
    "$oid": "68de5ba8d41c7428cd2e1062"
  },
  "cartUID": "655c0eb7-0fe8-48b9-a800-5d792b175e04",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "133",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 64,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de5ba8d41c7428cd2e1063"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de5ba8d41c7428cd2e1064"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de5ba8d41c7428cd2e1065"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de5ba8d41c7428cd2e1066"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de5ba8d41c7428cd2e1067"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de5ba8d41c7428cd2e1069"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de5ba8d41c7428cd2e1068"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T11:02:00.486Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T11:02:00.486Z"
  },
  "createdAt": {
    "$date": "2025-10-02T11:02:00.497Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de67698ea338e0f488b1d9"
  },
  "cartUID": "d2a284f3-adf0-4677-9487-449792f05baf",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "134",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 65,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de67698ea338e0f488b1da"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de67698ea338e0f488b1db"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de67698ea338e0f488b1dc"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de67698ea338e0f488b1dd"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de67698ea338e0f488b1de"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de67698ea338e0f488b1e0"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de67698ea338e0f488b1df"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T11:52:09.835Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T11:52:09.835Z"
  },
  "createdAt": {
    "$date": "2025-10-02T11:52:09.841Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de67aae8704a73401823a5"
  },
  "cartUID": "0d5fd440-5a80-4fd3-a2f6-d28c3534998f",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "135",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 66,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de67aae8704a73401823a6"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de67aae8704a73401823a7"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de67aae8704a73401823a8"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de67aae8704a73401823a9"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de67aae8704a73401823aa"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de67aae8704a73401823ac"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de67aae8704a73401823ab"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T11:53:14.419Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T11:53:14.419Z"
  },
  "createdAt": {
    "$date": "2025-10-02T11:53:14.429Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de6811e3327aeec1f7a09a"
  },
  "cartUID": "f144c3d0-9f44-45a9-889f-38d4d169daf4",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "136",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 67,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de6811e3327aeec1f7a09b"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de6811e3327aeec1f7a09c"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de6811e3327aeec1f7a09d"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de6811e3327aeec1f7a09e"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de6811e3327aeec1f7a09f"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de6811e3327aeec1f7a0a1"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de6811e3327aeec1f7a0a0"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T11:54:57.374Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T11:54:57.374Z"
  },
  "createdAt": {
    "$date": "2025-10-02T11:54:57.384Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de68c520cf4327bb90997e"
  },
  "cartUID": "e7fb561c-8af5-44bf-b520-c50f14d52b09",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "137",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 68,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de68c520cf4327bb90997f"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de68c520cf4327bb909980"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de68c520cf4327bb909981"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de68c520cf4327bb909982"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de68c520cf4327bb909983"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de68c520cf4327bb909985"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de68c520cf4327bb909984"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T11:57:57.787Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T11:57:57.787Z"
  },
  "createdAt": {
    "$date": "2025-10-02T11:57:57.791Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7cc7b7fac324d35a4fa9"
  },
  "cartUID": "8f4209a0-e10d-4403-9e91-cf57a845fc6e",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "138",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 69,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7cc7b7fac324d35a4faa"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7cc7b7fac324d35a4fab"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7cc7b7fac324d35a4fac"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7cc7b7fac324d35a4fad"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7cc7b7fac324d35a4fae"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7cc7b7fac324d35a4fb0"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7cc7b7fac324d35a4faf"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:23:19.775Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:23:19.775Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:23:19.789Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7ddff20fa5f97ab251fa"
  },
  "cartUID": "ab3b7d6e-c541-41a2-8282-ca64530ced77",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "139",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 70,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7ddff20fa5f97ab251fb"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7ddff20fa5f97ab251fc"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7ddff20fa5f97ab251fd"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7ddff20fa5f97ab251fe"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7ddff20fa5f97ab251ff"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7ddff20fa5f97ab25201"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7ddff20fa5f97ab25200"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:27:59.492Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:27:59.492Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:27:59.505Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7e34fc90660ceb8c5dac"
  },
  "cartUID": "29108eda-58bb-4c8e-8c14-a0b883902b9b",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "140",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 71,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7e34fc90660ceb8c5dad"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7e34fc90660ceb8c5dae"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7e34fc90660ceb8c5daf"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7e34fc90660ceb8c5db0"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7e34fc90660ceb8c5db1"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7e34fc90660ceb8c5db3"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7e34fc90660ceb8c5db2"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:29:24.904Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:29:24.904Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:29:24.915Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7e6628f142a3a91b657d"
  },
  "cartUID": "2e949a52-2bc7-41f3-932f-72624c8cac37",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "141",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 72,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7e6628f142a3a91b657e"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7e6628f142a3a91b657f"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7e6628f142a3a91b6580"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7e6628f142a3a91b6581"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7e6628f142a3a91b6582"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7e6628f142a3a91b6584"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7e6628f142a3a91b6583"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:30:14.217Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:30:14.217Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:30:14.230Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7e7c548a727157adb913"
  },
  "cartUID": "eaa1fe3e-338b-48eb-a35d-e362b6b11905",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "142",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 73,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7e7c548a727157adb914"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7e7c548a727157adb915"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7e7c548a727157adb916"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7e7c548a727157adb917"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7e7c548a727157adb918"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7e7c548a727157adb91a"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7e7c548a727157adb919"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:30:36.511Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:30:36.511Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:30:36.525Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7e97917900c64ae5565e"
  },
  "cartUID": "8ed4407f-97e9-44a5-9e30-a21d0192aa9c",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "143",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 74,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7e97917900c64ae5565f"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7e97917900c64ae55660"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7e97917900c64ae55661"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7e97917900c64ae55662"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7e97917900c64ae55663"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7e97917900c64ae55665"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7e97917900c64ae55664"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:31:03.780Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:31:03.780Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:31:03.790Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7ec9b1838bb2c19887f9"
  },
  "cartUID": "cdecfc5c-98f3-461e-bdf3-9e065b9e817d",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "144",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 75,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7ec9b1838bb2c19887fa"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7ec9b1838bb2c19887fb"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7ec9b1838bb2c19887fc"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7ec9b1838bb2c19887fd"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7ec9b1838bb2c19887fe"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7ec9b1838bb2c1988800"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7ec9b1838bb2c19887ff"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:31:53.431Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:31:53.431Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:31:53.440Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de7fa28d2b4996758f8be9"
  },
  "cartUID": "b2ae426f-f2d0-46a5-8ea6-ec72d67294b9",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "145",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 76,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de7fa28d2b4996758f8bea"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de7fa28d2b4996758f8beb"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de7fa28d2b4996758f8bec"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de7fa28d2b4996758f8bed"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de7fa28d2b4996758f8bee"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de7fa28d2b4996758f8bf0"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de7fa28d2b4996758f8bef"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:35:30.150Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:35:30.150Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:35:30.155Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de806b5ef988bb93b910b2"
  },
  "cartUID": "817e6218-f198-4e5b-8580-62121fecb11b",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "146",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 77,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de806b5ef988bb93b910b3"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de806b5ef988bb93b910b4"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de806b5ef988bb93b910b5"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de806b5ef988bb93b910b6"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de806b5ef988bb93b910b7"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de806b5ef988bb93b910b9"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de806b5ef988bb93b910b8"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:38:51.541Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:38:51.541Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:38:51.546Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de809584bce30cd2aaf775"
  },
  "cartUID": "bbafd35d-2647-4098-b691-0dbe6309c1b1",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "147",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 78,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de809584bce30cd2aaf776"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de809584bce30cd2aaf777"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de809584bce30cd2aaf778"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de809584bce30cd2aaf779"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de809584bce30cd2aaf77a"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68de809584bce30cd2aaf77c"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de809584bce30cd2aaf77b"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:39:33.995Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:39:33.995Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:39:34.001Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68de81ba8564664b7794cbff"
  },
  "cartUID": "f1d5764d-7406-47af-9f44-7378bcfcd53e",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "148",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3526da8f7e62c465186"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "عين سيدي علي",
  "subLocationId": {
    "$oid": "6787c3526da8f7e62c4651cb"
  },
  "totalCartPrice": 6700,
  "totalProductsPrice": 5500,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 1200,
  "totalProductsFees": 2600,
  "isFreeShipping": false,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 79,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68de81ba8564664b7794cc00"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68de81ba8564664b7794cc01"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68de81ba8564664b7794cc02"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68de81ba8564664b7794cc03"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68de81ba8564664b7794cc04"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c46505b"
      },
      "totalProductPrice": 5500,
      "totalProductFees": 2600,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6787c34e6da8f7e62c46505f",
          "colorQtty": 1,
          "_id": {
            "$oid": "68de81ba8564664b7794cc06"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68de81ba8564664b7794cc05"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T13:44:26.775Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T13:44:26.775Z"
  },
  "createdAt": {
    "$date": "2025-10-02T13:44:26.781Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68decd0303c4c1e59d762991"
  },
  "cartUID": "4a2a1e32-f3dd-4bc2-8fcd-d671767cc1fb",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "149",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 7100,
  "totalProductsPrice": 7000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 100,
  "totalProductsFees": 4600,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isFreeShipping": false,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 80,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 1,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68decd0303c4c1e59d762992"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68decd0303c4c1e59d762993"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68decd0303c4c1e59d762994"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68decd0303c4c1e59d762995"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68decd0303c4c1e59d762996"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c46508c"
      },
      "totalProductPrice": 7000,
      "totalProductFees": 4600,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6820bf71baf8bb9458ae7c9a",
          "colorQtty": 1,
          "_id": {
            "$oid": "68decd0303c4c1e59d762998"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68decd0303c4c1e59d762997"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-30T19:05:39.086Z"
  },
  "assignedAt": {
    "$date": "2025-10-02T19:05:39.086Z"
  },
  "createdAt": {
    "$date": "2025-10-02T19:05:39.092Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68df85eccf5e82c780ae6126"
  },
  "cartUID": "f5274136-5764-4ec3-b68a-cafaf11ebe94",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "150",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 64,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 5,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "68df85eccf5e82c780ae6127"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df85eccf5e82c780ae6128"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df85eccf5e82c780ae6129"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df85eccf5e82c780ae612a"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df85eccf5e82c780ae612b"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [],
      "offerId": "",
      "_id": {
        "$oid": "68df85eccf5e82c780ae612c"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:14:36.569Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:14:36.569Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:14:36.573Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68df860ccf5e82c780ae7adb"
  },
  "cartUID": "e54470a6-cad5-4f49-8fe7-f5479255543b",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "151",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0549134310",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df860ccf5e82c780ae7adc"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df860ccf5e82c780ae7add"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df860ccf5e82c780ae7ade"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df860ccf5e82c780ae7adf"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df860ccf5e82c780ae7ae0"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df860ccf5e82c780ae7ae2"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df860ccf5e82c780ae7ae1"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:08.127Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:08.127Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:08.130Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "68df860ecf5e82c780ae7e16"
  },
  "cartUID": "f9e487b0-a57f-4ea7-ad3b-176431eef96d",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "152",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0549134310",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 1,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df860ecf5e82c780ae7e17"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df860ecf5e82c780ae7e18"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df860ecf5e82c780ae7e19"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df860ecf5e82c780ae7e1a"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df860ecf5e82c780ae7e1b"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df860ecf5e82c780ae7e1d"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df860ecf5e82c780ae7e1c"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:10.888Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:10.888Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:10.891Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8618cf5e82c780ae837e"
  },
  "cartUID": "c73212b7-18d5-4c59-a685-721a778f210e",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "153",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343100",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8618cf5e82c780ae837f"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8618cf5e82c780ae8380"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8618cf5e82c780ae8381"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8618cf5e82c780ae8382"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8618cf5e82c780ae8383"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8618cf5e82c780ae8385"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8618cf5e82c780ae8384"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:20.248Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:20.248Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:20.251Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df861ccf5e82c780ae860b"
  },
  "cartUID": "d02310e7-337f-45da-a5d3-fa196e057f04",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "154",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343101",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df861ccf5e82c780ae860c"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df861ccf5e82c780ae860d"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df861ccf5e82c780ae860e"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df861ccf5e82c780ae860f"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df861ccf5e82c780ae8610"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df861ccf5e82c780ae8612"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df861ccf5e82c780ae8611"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:24.074Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:24.074Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:24.080Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df861ecf5e82c780ae8898"
  },
  "cartUID": "2e0ef68e-7ff2-416f-b785-d1388772eb65",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "155",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343103",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df861ecf5e82c780ae8899"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df861ecf5e82c780ae889a"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df861ecf5e82c780ae889b"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df861ecf5e82c780ae889c"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df861ecf5e82c780ae889d"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df861ecf5e82c780ae889f"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df861ecf5e82c780ae889e"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:26.714Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:26.714Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:26.718Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8623cf5e82c780ae8b25"
  },
  "cartUID": "b641e6b0-4084-4c48-8d96-d9900ea06529",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "156",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343104",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8623cf5e82c780ae8b26"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8623cf5e82c780ae8b27"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8623cf5e82c780ae8b28"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8623cf5e82c780ae8b29"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8623cf5e82c780ae8b2a"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8623cf5e82c780ae8b2c"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8623cf5e82c780ae8b2b"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:31.006Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:31.006Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:31.007Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8627cf5e82c780ae8db2"
  },
  "cartUID": "a87364ab-40b2-4954-9273-c654a50a57ae",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "157",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343105",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8627cf5e82c780ae8db3"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8627cf5e82c780ae8db4"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8627cf5e82c780ae8db5"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8627cf5e82c780ae8db6"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8627cf5e82c780ae8db7"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8627cf5e82c780ae8db9"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8627cf5e82c780ae8db8"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:35.565Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:35.565Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:35.569Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df862bcf5e82c780ae903f"
  },
  "cartUID": "3f14541c-454d-4bbd-83d2-3c0966923e86",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "158",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343106",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df862bcf5e82c780ae9040"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df862bcf5e82c780ae9041"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df862bcf5e82c780ae9042"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df862bcf5e82c780ae9043"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df862bcf5e82c780ae9044"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df862bcf5e82c780ae9046"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df862bcf5e82c780ae9045"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:39.140Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:39.140Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:39.142Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df862ecf5e82c780ae92cc"
  },
  "cartUID": "d4157b45-c1b2-41b2-891b-e033f571aaf8",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "159",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343107",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df862ecf5e82c780ae92cd"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df862ecf5e82c780ae92ce"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df862ecf5e82c780ae92cf"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df862ecf5e82c780ae92d0"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df862ecf5e82c780ae92d1"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df862ecf5e82c780ae92d3"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df862ecf5e82c780ae92d2"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:42.566Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:42.566Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:42.568Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8632cf5e82c780ae9559"
  },
  "cartUID": "bd5b0e70-c2c7-405f-8d38-4f1e002b0e90",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "160",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343108",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8632cf5e82c780ae955a"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8632cf5e82c780ae955b"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8632cf5e82c780ae955c"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8632cf5e82c780ae955d"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8632cf5e82c780ae955e"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8632cf5e82c780ae9560"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8632cf5e82c780ae955f"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:46.306Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:46.306Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:46.310Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8635cf5e82c780ae995a"
  },
  "cartUID": "0556c3b7-6271-4160-98f0-79966a5e119b",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "161",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343109",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8635cf5e82c780ae995b"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8635cf5e82c780ae995c"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8635cf5e82c780ae995d"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8635cf5e82c780ae995e"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8635cf5e82c780ae995f"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8635cf5e82c780ae9961"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8635cf5e82c780ae9960"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:49.979Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:49.979Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:49.981Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8639cf5e82c780ae9be7"
  },
  "cartUID": "cb51a758-40a2-4f9d-98e0-3f0f9dc64540",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "162",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343110",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8639cf5e82c780ae9be8"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8639cf5e82c780ae9be9"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8639cf5e82c780ae9bea"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8639cf5e82c780ae9beb"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8639cf5e82c780ae9bec"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8639cf5e82c780ae9bee"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8639cf5e82c780ae9bed"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:53.666Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:53.666Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:53.669Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df863dcf5e82c780ae9e74"
  },
  "cartUID": "3fabecf7-bd64-4e95-88db-6b224f050413",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "163",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343111",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df863dcf5e82c780ae9e75"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldValue": "",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "696608fc4463ba7ea8a47727"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldValue": "",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "696608fc4463ba7ea8a47728"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldValue": "",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "696608fc4463ba7ea8a47729"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldValue": "",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "696608fc4463ba7ea8a4772a"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df863dcf5e82c780ae9e7b"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df863dcf5e82c780ae9e7a"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:15:57.263Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:15:57.263Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:15:57.265Z"
  },
  "updatedAt": {
    "$date": "2026-01-13T08:57:32.081Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8641cf5e82c780aea101"
  },
  "cartUID": "5b30fe1d-2626-413a-acc9-b602ee4b081b",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "164",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343112",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8641cf5e82c780aea102"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8641cf5e82c780aea103"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8641cf5e82c780aea104"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8641cf5e82c780aea105"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8641cf5e82c780aea106"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8641cf5e82c780aea108"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8641cf5e82c780aea107"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:16:01.136Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:16:01.136Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:16:01.137Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df864ecf5e82c780aea9f1"
  },
  "cartUID": "a659e28d-221d-4724-b261-76810ad198db",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "165",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343113",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df864ecf5e82c780aea9f2"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df864ecf5e82c780aea9f3"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df864ecf5e82c780aea9f4"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df864ecf5e82c780aea9f5"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df864ecf5e82c780aea9f6"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df864ecf5e82c780aea9f8"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df864ecf5e82c780aea9f7"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:16:14.133Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:16:14.133Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:16:14.139Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8651cf5e82c780aeac7e"
  },
  "cartUID": "d90c5b75-8b14-4c89-9159-ff9106a62862",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "166",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343114",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8651cf5e82c780aeac7f"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8651cf5e82c780aeac80"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8651cf5e82c780aeac81"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8651cf5e82c780aeac82"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8651cf5e82c780aeac83"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8651cf5e82c780aeac85"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8651cf5e82c780aeac84"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:16:17.420Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:16:17.420Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:16:17.422Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8655cf5e82c780aeb07f"
  },
  "cartUID": "c7fa78ad-2eaa-4880-b8bc-86c09b491c85",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "167",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "5491343115",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8655cf5e82c780aeb080"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68df8655cf5e82c780aeb081"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68df8655cf5e82c780aeb082"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68df8655cf5e82c780aeb083"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68df8655cf5e82c780aeb084"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8655cf5e82c780aeb086"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8655cf5e82c780aeb085"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:16:21.064Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:16:21.064Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:16:21.067Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  }
},
{
  "_id": {
    "$oid": "68df8659cf5e82c780aeb30c"
  },
  "cartUID": "c15ba46f-2931-48f6-9ddd-2cf2cffd8b31",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "168",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": true,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0549134311",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 1300,
  "totalProductsPrice": 1000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 0,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68df8659cf5e82c780aeb30d"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد التوصيل",
  "orderStatus": "مأكد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldValue": "",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "691ac859786bd0a1c71b78b5"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldValue": "",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "691ac859786bd0a1c71b78b6"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldValue": "",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "691ac859786bd0a1c71b78b7"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldValue": "",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "691ac859786bd0a1c71b78b8"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "67ed21113f1fd5d59efd72cc"
      },
      "totalProductPrice": 1000,
      "totalProductFees": 0,
      "quentity": 1,
      "propertiesSelected": [],
      "colorsSelected": [
        {
          "colorId": "6850006aaf6c5cf55aa4a46a",
          "_id": {
            "$oid": "68df8659cf5e82c780aeb313"
          }
        }
      ],
      "offerId": "",
      "_id": {
        "$oid": "68df8659cf5e82c780aeb312"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-01-31T08:16:25.745Z"
  },
  "assignedAt": {
    "$date": "2025-10-03T08:16:25.745Z"
  },
  "createdAt": {
    "$date": "2025-10-03T08:16:25.746Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "orderTracking": "EC20JX251117409248",
  "shippedByCompany": {
    "$oid": "679e2868ce238f2f2f1a9877"
  }
},
{
  "_id": {
    "$oid": "68f6b353b533654e696b56a4"
  },
  "cartUID": "c2371d05-3c5f-45e8-84c4-c92c709bb365",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "169",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": true,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 13000,
  "totalProductsPrice": 13000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 0,
  "totalProductsFees": 9800,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isFreeShipping": true,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 39,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 3,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68f6b353b533654e696b56a5"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد التوصيل",
  "orderStatus": "مأكد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "68f6b353b533654e696b56a6"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "68f6b353b533654e696b56a7"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "68f6b353b533654e696b56a8"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "68f6b353b533654e696b56a9"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c465068"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c46506d",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c46506f",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "68f6b353b533654e696b56ac"
              }
            }
          ],
          "_id": {
            "$oid": "68f6b353b533654e696b56ab"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c465071",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c465073",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "68f6b353b533654e696b56ae"
              }
            }
          ],
          "_id": {
            "$oid": "68f6b353b533654e696b56ad"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "6787c34e6da8f7e62c465076",
      "_id": {
        "$oid": "68f6b353b533654e696b56aa"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-02-17T22:10:27.372Z"
  },
  "assignedAt": {
    "$date": "2025-10-20T22:10:27.372Z"
  },
  "createdAt": {
    "$date": "2025-10-20T22:10:27.377Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  },
  "itHasAnOrderAfter": true,
  "orderTracking": "EC20JX251117409247",
  "shippedByCompany": {
    "$oid": "679e2868ce238f2f2f1a9877"
  }
},
{
  "_id": {
    "$oid": "68f6b546ab4db9e0a549975c"
  },
  "cartUID": "33747a8f-1c52-4ffc-9275-f09ae083b42e",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "170",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": true,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3526da8f7e62c465186"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أفلو",
  "subLocationId": {
    "$oid": "6787c3526da8f7e62c4651c9"
  },
  "totalCartPrice": 9600,
  "totalProductsPrice": 9600,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 0,
  "totalProductsFees": 6900,
  "stopDeskId": {
    "$oid": "6787c3526da8f7e62c46518b"
  },
  "isFreeShipping": true,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 40,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 3,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 0,
    "_id": {
      "$oid": "68f6b546ab4db9e0a549975d"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد التجهيز",
  "orderStatus": "مأكد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldValue": "",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "691a0e8b764026e54256bab9"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldValue": "",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "691a0e8b764026e54256baba"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldValue": "",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "691a0e8b764026e54256babb"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldValue": "",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "691a0e8b764026e54256babc"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c4650ab"
      },
      "totalProductPrice": 9600,
      "totalProductFees": 6900,
      "quentity": 3,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c4650b1",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c4650b4",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "68f6b546ab4db9e0a5499764"
              }
            }
          ],
          "_id": {
            "$oid": "68f6b546ab4db9e0a5499763"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c4650b5",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c4650b7",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "68f6b546ab4db9e0a5499766"
              }
            }
          ],
          "_id": {
            "$oid": "68f6b546ab4db9e0a5499765"
          }
        }
      ],
      "colorsSelected": [
        {
          "colorId": "6871a03e5de5b148817a6f82",
          "colorQtty": 1,
          "_id": {
            "$oid": "68f6b546ab4db9e0a5499767"
          }
        }
      ],
      "offerId": "6787c34e6da8f7e62c4650bc",
      "_id": {
        "$oid": "68f6b546ab4db9e0a5499762"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-02-17T22:18:46.563Z"
  },
  "assignedAt": {
    "$date": "2025-10-20T22:18:46.563Z"
  },
  "createdAt": {
    "$date": "2025-10-20T22:18:46.571Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840abd9d6a55d3f395e1787"
  },
  "orderTracking": "EC20JX251115407200",
  "shippedByCompany": {
    "$oid": "679e2868ce238f2f2f1a9877"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "691dfba979b91b15224a944b"
  },
  "cartUID": "a7a768ba-7461-49f2-bc83-8516f94a8835",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "171",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": true,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "test33",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "اقبلي",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fb"
  },
  "totalCartPrice": 13300,
  "totalProductsPrice": 13000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 9800,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 39,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 6,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 0,
    "_id": {
      "$oid": "691dfba979b91b15224a944c"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": true,
  "subStore": {
    "$oid": "68406b21f7f97228d142b685"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "مستلم",
  "orderStatus": "مأكد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldValue": "",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "691dfbd879b91b15224ab862"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldValue": "",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "691dfbd879b91b15224ab863"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldValue": "",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "691dfbd879b91b15224ab864"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldValue": "",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "691dfbd879b91b15224ab865"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "68406b22f7f97228d142b6f8"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "68406b22f7f97228d142b6fd",
          "childPropertiesSelected": [
            {
              "childPropertyId": "68406b22f7f97228d142b6fe",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "691dfba979b91b15224a9453"
              }
            }
          ],
          "_id": {
            "$oid": "691dfba979b91b15224a9452"
          }
        },
        {
          "parentPropertyId": "68406b22f7f97228d142b701",
          "childPropertiesSelected": [
            {
              "childPropertyId": "68406b22f7f97228d142b703",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "691dfba979b91b15224a9455"
              }
            }
          ],
          "_id": {
            "$oid": "691dfba979b91b15224a9454"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "68406b22f7f97228d142b706",
      "_id": {
        "$oid": "691dfba979b91b15224a9451"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-03-19T17:17:29.501Z"
  },
  "assignedAt": {
    "$date": "2025-11-19T17:17:29.501Z"
  },
  "createdAt": {
    "$date": "2025-11-19T17:17:29.510Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T13:19:11.927Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840a8c9d6a55d3f395df59b"
  },
  "orderTracking": "EC20JX251119411895",
  "shippedByCompany": {
    "$oid": "679e2868ce238f2f2f1a9877"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "691e200465256c469a92e24e"
  },
  "cartUID": "2fb4dc98-bde2-4483-9210-4cd8edfcd9e1",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "172",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "test33",
  "clientPhoneNumber": "0696487714",
  "clientName": "client333",
  "clientCity": "اقبلي",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fb"
  },
  "totalCartPrice": 13300,
  "totalProductsPrice": 13000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 300,
  "totalProductsFees": 9800,
  "isNewClient": false,
  "isDangerClient": true,
  "totalPreviousOrders": 1,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 1,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "691e200465256c469a92e24f"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": true,
  "subStore": {
    "$oid": "68406b21f7f97228d142b685"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد التوصيل",
  "orderStatus": "مأكد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "691e200465256c469a92e250"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "691e200465256c469a92e251"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "691e200465256c469a92e252"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "691e200465256c469a92e253"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "68406b22f7f97228d142b6f8"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "68406b22f7f97228d142b6fd",
          "childPropertiesSelected": [
            {
              "childPropertyId": "68406b22f7f97228d142b6fe",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "691e200465256c469a92e256"
              }
            }
          ],
          "_id": {
            "$oid": "691e200465256c469a92e255"
          }
        },
        {
          "parentPropertyId": "68406b22f7f97228d142b701",
          "childPropertiesSelected": [
            {
              "childPropertyId": "68406b22f7f97228d142b703",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "691e200465256c469a92e258"
              }
            }
          ],
          "_id": {
            "$oid": "691e200465256c469a92e257"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "68406b22f7f97228d142b706",
      "_id": {
        "$oid": "691e200465256c469a92e254"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-03-19T19:52:36.145Z"
  },
  "assignedAt": {
    "$date": "2025-11-19T19:52:36.145Z"
  },
  "createdAt": {
    "$date": "2025-11-19T19:52:36.150Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  }
},
{
  "_id": {
    "$oid": "692b6354814487a30a36451a"
  },
  "cartUID": "bbd6ef4b-50c0-4fa3-9087-fc644b52fee8",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "6",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "679e1950a3cf1d595e271e86"
  },
  "storeName": "test",
  "clientPhoneNumber": "0696487714",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "679e1950a3cf1d595e271e8a"
  },
  "totalCartPrice": 75500,
  "totalProductsPrice": 75000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 500,
  "totalProductsFees": 75000,
  "isFreeShipping": false,
  "isNewClient": true,
  "isDangerClient": false,
  "totalPreviousOrders": 0,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 0,
    "cancledOrders": 0,
    "returnedOrders": 0,
    "delivredOrders": 0,
    "_id": {
      "$oid": "692b6354814487a30a36451b"
    }
  },
  "store": {
    "$oid": "679e194ea3cf1d595e271db3"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "679e194ea3cf1d595e271db3"
  },
  "shippingType": "للمنزل",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "679e194ea3cf1d595e271dc9",
      "_id": {
        "$oid": "692b6354814487a30a36451c"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "679e194ea3cf1d595e271dca",
      "_id": {
        "$oid": "692b6354814487a30a36451d"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "679e194ea3cf1d595e271dcb",
      "_id": {
        "$oid": "692b6354814487a30a36451e"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "679e194ea3cf1d595e271dcc",
      "_id": {
        "$oid": "692b6354814487a30a36451f"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "679e194ea3cf1d595e271e10"
      },
      "totalProductPrice": 75000,
      "totalProductFees": 75000,
      "quentity": 1,
      "propertiesSelected": [
        {
          "parentPropertyId": "679e194ea3cf1d595e271e15",
          "childPropertiesSelected": [
            {
              "childPropertyId": "679e194ea3cf1d595e271e16",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "692b6354814487a30a364522"
              }
            }
          ],
          "_id": {
            "$oid": "692b6354814487a30a364521"
          }
        },
        {
          "parentPropertyId": "679e194ea3cf1d595e271e18",
          "childPropertiesSelected": [
            {
              "childPropertyId": "679e194ea3cf1d595e271e1a",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "692b6354814487a30a364524"
              }
            }
          ],
          "_id": {
            "$oid": "692b6354814487a30a364523"
          }
        },
        {
          "parentPropertyId": "679e194ea3cf1d595e271e1b",
          "childPropertiesSelected": [
            {
              "childPropertyId": "679e194ea3cf1d595e271e1d",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "692b6354814487a30a364526"
              }
            }
          ],
          "_id": {
            "$oid": "692b6354814487a30a364525"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "",
      "_id": {
        "$oid": "692b6354814487a30a364520"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-03-29T21:19:16.230Z"
  },
  "assignedAt": {
    "$date": "2025-11-29T21:19:16.230Z"
  },
  "createdAt": {
    "$date": "2025-11-29T21:19:16.235Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "692bf37c909376c95bd80a2d"
  },
  "cartUID": "6d2a22bf-e556-4086-83c6-d2ddd79d8a1b",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "173",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 26100,
  "totalProductsPrice": 26000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 100,
  "totalProductsFees": 19600,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isFreeShipping": false,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 34,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 6,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "692bf37c909376c95bd80a2e"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "692bf37c909376c95bd80a2f"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "692bf37c909376c95bd80a30"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "692bf37c909376c95bd80a31"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "692bf37c909376c95bd80a32"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c465068"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c46506d",
          "childPropertiesSelected": [],
          "_id": {
            "$oid": "692bf37c909376c95bd80a34"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c465071",
          "childPropertiesSelected": [],
          "_id": {
            "$oid": "692bf37c909376c95bd80a35"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "6787c34e6da8f7e62c465076",
      "_id": {
        "$oid": "692bf37c909376c95bd80a33"
      }
    },
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c465068"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c46506d",
          "childPropertiesSelected": [],
          "_id": {
            "$oid": "692bf37c909376c95bd80a37"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c465071",
          "childPropertiesSelected": [],
          "_id": {
            "$oid": "692bf37c909376c95bd80a38"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "6787c34e6da8f7e62c465076",
      "_id": {
        "$oid": "692bf37c909376c95bd80a36"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-03-30T07:34:20.936Z"
  },
  "assignedAt": {
    "$date": "2025-11-30T07:34:20.936Z"
  },
  "createdAt": {
    "$date": "2025-11-30T07:34:20.941Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "692bf3ca814487a30a36835a"
  },
  "cartUID": "be751df1-1ba6-419e-955c-38ddbabda48e",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "174",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 13000,
  "totalProductsPrice": 13000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 0,
  "totalProductsFees": 9800,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isFreeShipping": true,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 35,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 6,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "692bf3ca814487a30a36835b"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "692bf3ca814487a30a36835c"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "692bf3ca814487a30a36835d"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "692bf3ca814487a30a36835e"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "692bf3ca814487a30a36835f"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c465068"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c46506d",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c465070",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "692bf3ca814487a30a368362"
              }
            }
          ],
          "_id": {
            "$oid": "692bf3ca814487a30a368361"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c465071",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c465072",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "692bf3ca814487a30a368364"
              }
            }
          ],
          "_id": {
            "$oid": "692bf3ca814487a30a368363"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "6787c34e6da8f7e62c465076",
      "_id": {
        "$oid": "692bf3ca814487a30a368360"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-03-30T07:35:38.967Z"
  },
  "assignedAt": {
    "$date": "2025-11-30T07:35:38.967Z"
  },
  "createdAt": {
    "$date": "2025-11-30T07:35:38.976Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "69329ea5fa22be969a01f027"
  },
  "cartUID": "0d47d016-ca39-488b-94a4-e7418a97f082",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "175",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 13000,
  "totalProductsPrice": 13000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 0,
  "totalProductsFees": 9800,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isFreeShipping": true,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 36,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 6,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "69329ea5fa22be969a01f028"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "69329ea5fa22be969a01f029"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "69329ea5fa22be969a01f02a"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "69329ea5fa22be969a01f02b"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "69329ea5fa22be969a01f02c"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c465068"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c46506d",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c46506f",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "69329ea5fa22be969a01f02f"
              }
            }
          ],
          "_id": {
            "$oid": "69329ea5fa22be969a01f02e"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c465071",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c465072",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "69329ea5fa22be969a01f031"
              }
            }
          ],
          "_id": {
            "$oid": "69329ea5fa22be969a01f030"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "6787c34e6da8f7e62c465076",
      "_id": {
        "$oid": "69329ea5fa22be969a01f02d"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-04-04T08:58:13.522Z"
  },
  "assignedAt": {
    "$date": "2025-12-05T08:58:13.522Z"
  },
  "createdAt": {
    "$date": "2025-12-05T08:58:13.530Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  },
  "itHasAnOrderAfter": true
},
{
  "_id": {
    "$oid": "69329f18fa22be969a01fa83"
  },
  "cartUID": "1544a236-11a9-466d-9661-bea9bd6dbcfa",
  "company": {
    "$oid": "670d172859ec54bad7137097"
  },
  "orderNumber": "176",
  "isConfirmationServiceFeesPaid": false,
  "isShippedViaApi": false,
  "itsFeesCoveredByCompany": false,
  "isFeesPaidByCompany": true,
  "locationId": {
    "$oid": "6787c3516da8f7e62c4650f4"
  },
  "storeName": "anaka",
  "clientPhoneNumber": "0559388573",
  "clientName": "client",
  "clientCity": "أدرار",
  "subLocationId": {
    "$oid": "6787c3516da8f7e62c4650fa"
  },
  "totalCartPrice": 13000,
  "totalProductsPrice": 13000,
  "allowCustomTotalProductsPrice": false,
  "allowCustomShippingPrice": false,
  "shippingPrice": 0,
  "totalProductsFees": 9800,
  "stopDeskId": {
    "$oid": "67bcdcb4950f2eb624938fb1"
  },
  "isFreeShipping": true,
  "isNewClient": false,
  "isDangerClient": false,
  "totalPreviousOrders": 37,
  "previousOrdersAnlytics": {
    "confrirmedOrders": 6,
    "cancledOrders": 0,
    "returnedOrders": 1,
    "delivredOrders": 1,
    "_id": {
      "$oid": "69329f18fa22be969a01fa84"
    }
  },
  "store": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "isFromSubStore": false,
  "subStore": {
    "$oid": "6787c34d6da8f7e62c465021"
  },
  "shippingType": "لنقطة الإستلام",
  "deliveryStatus": "قيد المعالجة",
  "orderStatus": "جديد",
  "shippingDetails": [
    {
      "fieldName": "الإسم الكامل",
      "fieldType": "client-name",
      "fieldId": "6787c34d6da8f7e62c465037",
      "_id": {
        "$oid": "69329f18fa22be969a01fa85"
      }
    },
    {
      "fieldName": "رقم الهاتف",
      "fieldType": "phone-number",
      "fieldId": "6787c34d6da8f7e62c465038",
      "_id": {
        "$oid": "69329f18fa22be969a01fa86"
      }
    },
    {
      "fieldName": "المنطقة",
      "fieldType": "locations",
      "fieldId": "6787c34d6da8f7e62c465039",
      "_id": {
        "$oid": "69329f18fa22be969a01fa87"
      }
    },
    {
      "fieldName": "المنطقة الفرعية",
      "fieldType": "subLocations",
      "fieldId": "6787c34d6da8f7e62c46503a",
      "_id": {
        "$oid": "69329f18fa22be969a01fa88"
      }
    }
  ],
  "isUncompletedOrder": false,
  "orderedProducts": [
    {
      "productId": {
        "$oid": "6787c34e6da8f7e62c465068"
      },
      "totalProductPrice": 13000,
      "totalProductFees": 9800,
      "quentity": 2,
      "propertiesSelected": [
        {
          "parentPropertyId": "6787c34e6da8f7e62c46506d",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c46506f",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "69329f18fa22be969a01fa8b"
              }
            }
          ],
          "_id": {
            "$oid": "69329f18fa22be969a01fa8a"
          }
        },
        {
          "parentPropertyId": "6787c34e6da8f7e62c465071",
          "childPropertiesSelected": [
            {
              "childPropertyId": "6787c34e6da8f7e62c465073",
              "childPropertyQtty": 1,
              "_id": {
                "$oid": "69329f18fa22be969a01fa8d"
              }
            }
          ],
          "_id": {
            "$oid": "69329f18fa22be969a01fa8c"
          }
        }
      ],
      "colorsSelected": [],
      "offerId": "6787c34e6da8f7e62c465076",
      "_id": {
        "$oid": "69329f18fa22be969a01fa89"
      }
    }
  ],
  "expireAt": {
    "$date": "2026-04-04T09:00:08.551Z"
  },
  "assignedAt": {
    "$date": "2025-12-05T09:00:08.551Z"
  },
  "createdAt": {
    "$date": "2025-12-05T09:00:08.556Z"
  },
  "updatedAt": {
    "$date": "2026-01-12T11:42:51.794Z"
  },
  "__v": 0,
  "assignToStoreCallMember": {
    "$oid": "6840ab39d6a55d3f395e0ca1"
  },
  "itHasAnOrderAfter": true
},
