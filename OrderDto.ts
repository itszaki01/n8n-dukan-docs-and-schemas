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
        productId: string; // this is mongo _id of product
        quentity: number;
        propertiesSelected?: { // this is otherProdperies field
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
