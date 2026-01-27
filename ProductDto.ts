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
