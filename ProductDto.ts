//Front End Payload
export interface IProductDto {
    allowSpecialGoogleSheet?: boolean;

    specialGoogleSheetsApiKey?: string;

    showProduct: boolean;

    disableAddToShoppingCart?: boolean;

    disableSuggestedProducts?: boolean;

    productSku?: string;

    name: string;

    productShortName: string;

    productFees?: number;

    price: number;

    description?: string;

    freeShipping: boolean;

    isLimitedQtty: boolean;

    remainingQtty: number;

    landingPage?: boolean;

    rating?: number;

    oldPrice: number;

    slug: string;

    store_stock_variable?: string;

    seoKeywords?: string[];

    seoDescreption?: string;

    seoImgUrl?: string;

    productDesc?: string;

    category?: string;

    categorySub?: string;

    imageCover: string;

    images: {
        imageUrl: string;
        imageVar?: string;
        showImage?: boolean;
    }[];

    otherProperties?: {
        title: string;
        multiSelect: boolean;
        allowCustomPrices: boolean;
        properties: {
            name: string;
            showProperty?: boolean;
            propertySku?: string;
            allowProperty?: boolean;
            imageVar?: string;
            isLimitedQtty: boolean;
            remainingQtty?: number;
            allowCustomPrice: boolean;
            customPrice: number;
            allowCustomFees: boolean;
            customFees: number;
            hasIcon: boolean;
            iconUrl: string;
            store_stock_variable?: string;
        }[];
    }[];

    colors?: {
        multiSelect: boolean;
        allowCustomPrices: boolean;
        allowLinkWithProperties: boolean;
        title?: string;
        list: {
            hex?: string;
            showColor?: boolean;
            allowColor?: boolean;
            colorSku?: string;
            isColor: boolean;
            name: string;
            imageVar?: string;
            isLimitedQtty: boolean;
            remainingQtty?: number;
            allowCustomPrice: boolean;
            allowCustomFees: boolean;
            customFees: number;
            customPrice: number;
            linkedProperties?: string[];
            hasIcon: boolean;
            iconUrl: string;
            store_stock_variable?: string;
        }[];
    };

    offers?: {
        offerName: string;
        quanitity: number;
        offerProductPrice: number;
        defaultSelected: boolean;
        freeShipping: boolean;
        bestOffer: boolean;
        showOffer?: boolean;
        allowCustomImg: boolean;
        customImgLink: string;
        customColor: string;
    }[];

    reviews?: {
        gender: "male" | "female";
        allowRaterProfileImage: boolean;
        raterProfileImage: string;
        raterName: string;
        rating: number;
        review: string;
        imageUrl: string;
    }[];

    allowOrdersWhenStockIsEmpty?: boolean;
    defaultConfirmatinoMember?: string;
    isPropertiesRequired?: boolean;
    stockEmptyReaction?: "nothing" | "hide-properties" | "disable-properties" | "hide-and-show-properties" | "disable-and-allow-properties";
    allowCustomThankYouPage?: boolean;
    customThankYouPageHtml?: string;
    allowCustomShippingToHomePrice?: boolean;
    customShippingToHomePrice?: number;
    allowCustomShppingToStopDeskPrice?: boolean;
    customShppingToStopDeskPrice?: number;
    freeShippingToStopDesk?: boolean;
}

//Nest Js Dto
export class CreateStoreProductDto {
    @IsBoolean()
    @IsOptional()
    showProduct: boolean;

    @IsOptional()
    @IsBoolean()
    allowSpecialGoogleSheet?: boolean;

    @IsOptional()
    @IsBoolean()
    disableAddToShoppingCart?: boolean;

    @IsOptional()
    @IsBoolean()
    disableSuggestedProducts?: boolean;

    @IsBoolean()
    @IsOptional()
    isLimitedQtty: boolean;

    @IsOptional()
    @IsNumber()
    remainingQtty: number;

    @IsOptional()
    @IsString()
    specialGoogleSheetsApiKey?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    productShortName: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    productFees: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    price: number;

    @IsString()
    @MaxLength(300)
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    freeShipping: boolean;

    @IsBoolean()
    @IsOptional()
    landingPage: boolean;

    @IsNotEmpty()
    @IsString()
    productSku: string;

    @IsMongoId()
    @IsString()
    @IsOptional()
    store_stock_variable?: string;

    @IsObject()
    @IsOptional()
    colors?: StoreProduct["colors"];

    @IsNotEmpty()
    imageCover: string;

    @IsArray()
    @IsNotEmpty()
    images: [
        {
            imageUrl: string;
            imageVar?: string;
        },
    ];

    @IsString()
    @IsOptional()
    category: string;

    @IsString()
    @IsOptional()
    categorySub: string;

    @IsArray()
    @IsOptional()
    otherProperties?: StoreProduct["otherProperties"];

    @IsNumber()
    @IsOptional()
    rating: number;

    @IsNumber()
    @IsOptional()
    oldPrice: number;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsArray()
    @IsOptional()
    offers?: StoreProduct["offers"];

    @IsArray()
    @IsOptional()
    reviews?: StoreProduct["reviews"];

    @IsString()
    @IsOptional()
    productDesc: string;

    @IsArray()
    @IsOptional()
    seoKeywords: string[];

    @IsString()
    @IsOptional()
    seoDescreption: string;

    @IsString()
    @IsOptional()
    seoImgUrl: string;

    @IsBoolean()
    @IsOptional()
    allowOrdersWhenStockIsEmpty?: boolean;

    @IsOptional()
    @IsMongoId()
    defaultConfirmatinoMember?: string;

    @IsOptional()
    @IsBoolean()
    isPropertiesRequired?: boolean;

    @IsString()
    @IsOptional()
    stockEmptyReaction?: StoreProduct["stockEmptyReaction"];

    @IsOptional()
    @IsBoolean()
    allowCustomThankYouPage?: boolean;

    @IsString()
    @IsOptional()
    customThankYouPageHtml?: string;

    @IsBoolean()
    @IsOptional()
    allowCustomShippingToHomePrice?: boolean;

    @IsNumber()
    @IsOptional()
    customShippingToHomePrice?: number;

    @IsBoolean()
    @IsOptional()
    allowCustomShppingToStopDeskPrice?: boolean;

    @IsNumber()
    @IsOptional()
    customShppingToStopDeskPrice?: number;

    @IsBoolean()
    @IsOptional()
    freeShippingToStopDesk?: boolean;
}

//Mongoose Schema
export class StoreProduct {
    @Prop({ default: false })
    allowSpecialGoogleSheet?: boolean;

    @Prop()
    hasMultiSelect?: boolean;

    @Prop()
    hasOffers?: boolean;

    @Prop()
    hasProperteisLimtedQtty?: boolean;

    @Prop()
    hasOtherProperties?: boolean;

    @Prop()
    hasProperties?: boolean;

    @Prop()
    hasColors?: boolean;

    @Prop()
    hasCustomPrices?: boolean;

    @Prop()
    hasReviews?: boolean;

    @Prop({ trim: true })
    specialGoogleSheetsApiKey?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Store.name })
    store: string;

    @Prop({ default: true })
    showProduct: boolean;

    @Prop({ default: false })
    disableAddToShoppingCart?: boolean;

    @Prop({ default: false })
    disableSuggestedProducts?: boolean;

    @Prop({ type: String, required: true, trim: true, uppercase: true })
    productSku: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreStock.name })
    store_stock_variable?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ trim: true, required: true })
    productShortName: string;

    @Prop({ default: 0 })
    productFees: number;

    @Prop({ required: true })
    price: number;

    @Prop({ default: "" })
    description?: string;

    @Prop({ default: false })
    freeShipping: boolean;

    @Prop({ default: false })
    isLimitedQtty: boolean;

    @Prop({ default: 0 })
    remainingQtty: number;

    @Prop({ default: false })
    landingPage: boolean;

    @Prop({ default: false })
    isDeleted?: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserStore.name })
    defaultConfirmatinoMember?: string;

    @Prop({
        type: Date,
        default: undefined,
        index: { expireAfterSeconds: 0 },
    })
    expireAt?: Date;

    @Prop({
        type: {
            multiSelect: { type: Boolean, default: true },
            allowCustomPrices: { type: Boolean, default: false },
            allowLinkWithProperties: { type: Boolean, default: false },
            title: String,
            list: [
                {
                    hex: { type: String, required: true },
                    showColor: { type: Boolean, default: true },
                    allowColor: { type: Boolean, default: true },
                    colorSku: { type: String, trim: true, uppercase: true },
                    name: { type: String, required: true },
                    isColor: { type: Boolean, default: true },
                    imageVar: { type: String, trim: true },
                    isLimitedQtty: { type: Boolean, default: false },
                    remainingQtty: { type: Number, default: 0 },
                    allowCustomPrice: { type: Boolean },
                    customPrice: { type: Number, default: 1 },
                    allowCustomFees: { type: Boolean, default: false },
                    customFees: { type: Number, default: 0 },
                    linkedProperties: [String],
                    hasIcon: { type: Boolean, default: false },
                    iconUrl: String,
                    store_stock_variable: { type: mongoose.Schema.Types.ObjectId, ref: StoreStock.name },
                },
            ],
        },
    })
    colors?: {
        multiSelect: boolean;
        allowCustomPrices: boolean;
        allowLinkWithProperties: boolean;
        title?: string;
        list: {
            _id?: string;
            showColor?: boolean;
            allowColor?: boolean;
            hex: string;
            colorSku?: string;
            isColor: boolean;
            allowCustomPrice: boolean;
            customPrice: number;
            allowCustomFees: boolean;
            customFees: number;
            name: string;
            imageVar?: string;
            isLimitedQtty: boolean;
            remainingQtty?: number;
            linkedProperties?: string[];
            hasIcon: boolean;
            iconUrl: string;
            store_stock_variable?: string;
        }[];
    };

    @Prop({ required: true })
    imageCover: string;

    @Prop({
        type: [{ imageUrl: { type: String, required: true }, imageVar: { type: String, trim: true }, showImage: { type: Boolean, default: true } }],
    })
    images: [
        {
            _id?: string;
            imageUrl: string;
            imageVar?: string;
            showImage?: boolean;
        },
    ];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreCategory.name })
    category?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: StoreCategorySub.name })
    categorySub?: string;

    @Prop({
        type: [
            {
                title: { type: String, required: true },
                multiSelect: { type: Boolean, default: false },
                allowCustomPrices: { type: Boolean, default: false },
                properties: [
                    {
                        showProperty: { type: Boolean, default: true },
                        allowProperty: { type: Boolean, default: true },
                        name: { type: String, required: true },
                        hasIcon: { type: Boolean, default: false },
                        propertySku: { type: String, trim: true, uppercase: true },
                        imageVar: { type: String, trim: true },
                        isLimitedQtty: { type: Boolean, default: false },
                        remainingQtty: { type: Number, default: 0 },
                        allowCustomPrice: { type: Boolean },
                        customPrice: { type: Number, default: 1 },
                        allowCustomFees: { type: Boolean, default: false },
                        customFees: { type: Number, default: 0 },
                        store_stock_variable: { type: mongoose.Schema.Types.ObjectId, ref: StoreStock.name },
                        iconUrl: { type: String },
                    },
                ],
            },
        ],
        default: [],
    })
    otherProperties?: [
        {
            _id?: ObjectId;
            title: string;
            multiSelect: boolean;
            allowCustomPrices: boolean;
            propertyId: string;
            properties: {
                _id?: ObjectId;
                showProperty?: boolean;
                allowProperty?: boolean;
                name: string;
                hasIcon: boolean;
                propertySku?: string;
                allowCustomPrice: boolean;
                customPrice: number;
                allowCustomFees: boolean;
                customFees: number;
                imageVar?: string;
                isLimitedQtty: boolean;
                remainingQtty?: number;
                store_stock_variable?: string;
                iconUrl: string;
            }[];
        },
    ];

    @Prop({ default: 0 })
    rating: number;

    @Prop({ default: 0 })
    oldPrice: number;

    @Prop({ trim: true, required: true })
    slug: string;

    @Prop({
        type: [
            {
                offerName: { type: String, required: true },
                quanitity: { type: Number },
                offerProductPrice: { type: Number, default: 1 },
                freeShipping: { type: Boolean, default: false },
                bestOffer: { type: Boolean, default: false },
                showOffer: { type: Boolean, default: false },
                allowCustomImg: { type: Boolean, default: false },
                defaultSelected: { type: Boolean },
                customImgLink: String,
                customColor: String,
            },
        ],
        default: [],
    })
    offers?: {
        _id?: string;
        offerName: string;
        quanitity: number;
        defaultSelected: boolean;
        offerProductPrice: number;
        freeShipping: boolean;
        bestOffer: boolean;
        showOffer?: boolean;
        allowCustomImg: boolean;
        customImgLink: string;
        customColor?: string;
    }[];

    @Prop({
        type: [
            {
                gender: { type: String, enum: ["male", "female"], default: "male" },
                isFemale: { type: Boolean },
                allowRaterProfileImage: { type: Boolean },
                raterProfileImage: { type: String },
                raterName: { type: String },
                rating: { type: Number },
                review: { type: String },
                imageUrl: { type: String },
            },
        ],
        default: [],
    })
    reviews?: {
        gender: "male" | "female";
        allowRaterProfileImage: boolean;
        raterProfileImage: string;
        raterName: string;
        rating: number;
        review: string;
        imageUrl: string;
    }[];

    @Prop()
    productDesc: string;

    @Prop()
    seoKeywords: string[];

    @Prop()
    seoDescreption: string;

    @Prop()
    seoImgUrl: string;

    @Prop({ default: false })
    allowOrdersWhenStockIsEmpty?: boolean;

    @Prop({ default: true })
    isPropertiesRequired?: boolean;

    @Prop({ default: false })
    allowCustomThankYouPage?: boolean;

    @Prop({ default: "" })
    customThankYouPageHtml?: string;

    @Prop({ default: false })
    allowCustomShippingToHomePrice?: boolean;

    @Prop({ default: 0 })
    customShippingToHomePrice?: number;

    @Prop({ default: false })
    allowCustomShppingToStopDeskPrice?: boolean;

    @Prop({ default: 0 })
    customShppingToStopDeskPrice?: number;

    @Prop({ default: false })
    freeShippingToStopDesk?: boolean;

    @Prop({
        type: String,
        enum: ["nothing", "hide-properties", "disable-properties", "hide-and-show-properties", "disable-and-allow-properties"],
        default: "disable-and-allow-properties",
    })
    stockEmptyReaction?: "nothing" | "hide-properties" | "disable-properties" | "hide-and-show-properties" | "disable-and-allow-properties";

    _id?: string;
}
