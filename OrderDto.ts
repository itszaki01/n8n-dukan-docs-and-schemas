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

//Backend Map & Validation to understand Staructer
        const isProductPropertiesRequired = product?.isPropertiesRequired === undefined || product.isPropertiesRequired;
        const store = product.store as unknown as StoreDocument;

        //1 if product is has multiSelect then quentity field should not exist else should exist
        if ((product.hasMultiSelect || product.hasOffers) && valueDto.quentity) {
            throw new BadRequestException(`لايجب تحديد كمية أثناء طلب المنتج (${product.name})`);
        } else if (!product.hasMultiSelect && !product.hasOffers && !valueDto.quentity) {
            throw new BadRequestException(`يجب تحديد كمية أثناء طلب المنتج (${product.name})`);
        }

        //2: Validate Product Offers
        //2.1: Validate if Product Has Offers then offersId should Not Be empty
        if (product.offers && product.offers.length > 0 && !valueDto.offerId) {
            throw new BadRequestException(`الرجاء إختيار عرض محدد للمنتج (${product.name})`);
        }

        //2.3: Validate Offer is Belong the Product Offers
        const offer = product.offers?.find((offer) => offer._id?.toString() === valueDto.offerId);
        if (!offer && valueDto.offerId) {
            throw new NotFoundException(`المنتج (${product.name}) لايدعم العرض: ${valueDto.offerId}`);
        } else if (offer) {
            valueDto.quentity = offer.quanitity;
        }

        /*********************************/
        // 3://if product has colors and has otherProperties they should exist

        if (product.otherProperties && product.otherProperties.length >= 1 && isProductPropertiesRequired) {
            if (!product.colors?.allowLinkWithProperties) {
                //1: Make sure at least one property is selected
                if (!valueDto?.propertiesSelected || valueDto.propertiesSelected.length != product.otherProperties.length) {
                    throw new BadRequestException(`الرجاء تحديد جميع الخيارات المطلوبة للمنتج (${product.name})`);
                }
                //1.1: check child properties should at least one slected for every option
                valueDto.propertiesSelected.forEach((parentPropertySelected) => {
                    if (parentPropertySelected.childPropertiesSelected.length < 1)
                        throw new BadRequestException(`الرجاء تحديد الخيارات المطلوبة للمنتج (${product.name})`);
                });
            } else {
                //1: Make sure at least one property is selected
                if (!valueDto?.propertiesSelected || valueDto.propertiesSelected.length == 0) {
                    throw new BadRequestException(`الرجاء تحديد جميع الخيارات المطلوبة للمنتج (${product.name})`);
                }
            }
        }

        // duplicated
        // 3.2: Validate Colors if th Product has colors
        if (product.colors && product.colors.list.length > 0 && isProductPropertiesRequired) {
            //4.1: Make sure at lease one colo is selected
            if (!valueDto?.colorsSelected || valueDto?.colorsSelected.length < 1) {
                throw new BadRequestException(`الرجاء تحديد الخيارات`);
            }

            //4.2 if proudct  colors is not MultiSelect then only one color should be included
            if (!product.colors.multiSelect && valueDto.colorsSelected.length > 1) {
                throw new BadRequestException("يجب إختيار لون واحد فقط");
            }
        }
        /*********************************/

        //Assing higheset qtty to all properties
        //3.1 if product is mutli select get the heigst property selected qtty
        if (product.hasMultiSelect && !product.hasOffers) {
            const colorsQttyList = valueDto.colorsSelected?.map((colorSelected) => colorSelected.colorQtty || 0);

            if (product.colors?.multiSelect && colorsQttyList && colorsQttyList?.length > 0) {
                valueDto.quentity = [...colorsQttyList].reduce((a, b) => a + b, colorsQttyList.length === 0 ? 1 : 0);
            } else if (product.hasMultiSelect && product.otherProperties && valueDto.propertiesSelected && product.otherProperties.length > 0) {
                //first find the multi select document id & count the totals only base on it
                const multiSelectDocId = String(product.otherProperties?.find((parentProeprty) => parentProeprty.multiSelect)?._id);
                if (multiSelectDocId) {
                    const selectedParentMultiSelectProperty = valueDto.propertiesSelected.find(
                        (parentProeprty) => parentProeprty.parentPropertyId === multiSelectDocId,
                    );

                    if (selectedParentMultiSelectProperty) {
                        const propertiesQttyList = selectedParentMultiSelectProperty.childPropertiesSelected.map(
                            (childProperty) => childProperty.childPropertyQtty || 0,
                        );
                        valueDto.quentity = [...propertiesQttyList.flat()].reduce((a, b) => a + b, propertiesQttyList.length === 0 ? 1 : 0);
                    }
                }
            }

            //fix qutty 0 when there is no selected properties
            if (valueDto.quentity === 0) valueDto.quentity = 1;
        }

        //3.2.3: if product dont have any properties then propertiesSelected Array should not exist
        if (
            !product.otherProperties ||
            (product.otherProperties?.length < 1 && valueDto.propertiesSelected && valueDto.propertiesSelected?.length > 0)
        ) {
            throw new BadRequestException(`المنتج (${product.name}) لايحتوي على خيارات لإدخالها`);
        }
        //3.2.4: Validate if Product Has otherProperties then properties array should Not Be empty
        if (product.otherProperties && product.otherProperties.length >= 1 && isProductPropertiesRequired) {
            if (!product.colors?.allowLinkWithProperties) {
                //1: Make sure at least one property is selected
                if (!valueDto?.propertiesSelected || valueDto.propertiesSelected.length != product.otherProperties.length) {
                    throw new BadRequestException(`الرجاء تحديد جميع الخيارات المطلوبة للمنتج (${product.name})`);
                }
                //1.1: check child properties should at least one slected for every option
                valueDto.propertiesSelected.forEach((parentPropertySelected) => {
                    if (parentPropertySelected.childPropertiesSelected.length < 1)
                        throw new BadRequestException(`الرجاء تحديد الخيارات المطلوبة للمنتج (${product.name})`);
                });
            } else {
                if (product.colors.allowLinkWithProperties && product.colors.multiSelect) {
                    //1st: get selectedColorsDocs
                    const colorsSelectedDocs = valueDto.colorsSelected?.map((colorSelected) =>
                        product.colors?.list.find((colorDoc) => colorDoc._id?.toString() === colorSelected.colorId),
                    );

                    if (!colorsSelectedDocs) {
                        throw new BadRequestException("الرجاء تحديد الخيارات");
                    }

                    //1: Get lenght of properties that must be selected with colors
                    const propertiesMustBeSelected = [
                        ...new Set(colorsSelectedDocs.map((colorObj) => colorObj?.linkedProperties?.map((value) => value))),
                    ].flat();

                    //1: Make sure at least one property is selected
                    if (!valueDto?.propertiesSelected || valueDto.propertiesSelected.length == 0) {
                        throw new BadRequestException(`الرجاء تحديد جميع الخيارات المطلوبة للمنتج (${product.name})`);
                    }

                    const selectedPropertiesLength = valueDto.propertiesSelected.filter(
                        (propertySelected) => propertySelected.childPropertiesSelected?.length > 0,
                    ).length;

                    if (propertiesMustBeSelected.length != selectedPropertiesLength) {
                        throw new BadRequestException("الرجاء تحديد جميع الخيارات");
                    }
                } else {
                    //1st: get color selected doc
                    const color = product.colors.list.find((colorDoc) => colorDoc._id?.toString() === valueDto.colorsSelected?.at(0)?.colorId);

                    if (!color) {
                        throw new BadRequestException("الرجاء تحديد الخيارات");
                    }

                    //1: Make sure at least one property is selected
                    if (!valueDto?.propertiesSelected || valueDto.propertiesSelected.length == 0) {
                        throw new BadRequestException(`الرجاء تحديد جميع الخيارات المطلوبة للمنتج (${product.name})`);
                    }

                    const colorLinkedProperties = color.linkedProperties?.length || 0;
                    const selectedPropertiesLength = valueDto.propertiesSelected.filter(
                        (propertySelected) => propertySelected.childPropertiesSelected?.length > 0,
                    ).length;

                    if (colorLinkedProperties != selectedPropertiesLength) {
                        throw new BadRequestException("الرجاء تحديد جميع الخيارات");
                    }
                }
            }

            //2: extract all ids of product properties
            const productProperties = product.otherProperties
                .map((property) => property.properties.map((neastedProperty) => neastedProperty._id?.toString() as string))
                .flat();

            //2.1: Extract all properites in selectedProperties
            const ordredProductSelectedPropertiesIds = valueDto.propertiesSelected
                .map((parentProperty) => parentProperty.childPropertiesSelected.map((selectedChildProperty) => selectedChildProperty.childPropertyId))
                .flat();

            //2.2: Check if Selected Properties Includes Product Properties
            ordredProductSelectedPropertiesIds.map((selectedPropertyId) => {
                if (!productProperties.find((productPropertyId) => selectedPropertyId === productPropertyId)) {
                    throw new NotFoundException(`الخيار ${selectedPropertyId} غير تابع للمنتج (${product.name})`);
                }
            });

            //2.3 check if selected parnetProperty is Valid
            valueDto.propertiesSelected.forEach((property) => {
                const checkedProeprty = product.otherProperties?.find((propertyDoc) => propertyDoc._id?.toString() === property.parentPropertyId);
                if (!checkedProeprty) {
                    throw new BadRequestException(`الخيار الرإيسي (${property.parentPropertyId}) غير تابع للمنتج (${product.name})`);
                }
            });

            //3: make sure the selected properites is exist in productProperties
            for (const selectedParentProperty of valueDto.propertiesSelected) {
                for (const selectedChildProperty of selectedParentProperty.childPropertiesSelected) {
                    //3.1: Get Property Document and Validate Remaining Qtty
                    if (product.otherProperties) {
                        for (const parentPropertyDoc of product.otherProperties) {
                            const childPropertyDoc = parentPropertyDoc.properties.find(
                                (childProperty) => childProperty._id?.toString() === selectedChildProperty.childPropertyId,
                            );

                            if (childPropertyDoc) {
                                //check if parnet property is multiselect then its should include only one property
                                if (!parentPropertyDoc.multiSelect && selectedParentProperty.childPropertiesSelected.length > 1) {
                                    throw new BadRequestException(`يحب تحديد خيار واحد في قسم (${parentPropertyDoc.title}) للمنتج (${product.name})`);
                                }

                                //3.1.1 if Parent Property is not Multi Select then selectedProperty qtty should the same ordred qtty
                                if (!parentPropertyDoc.multiSelect) {
                                    selectedChildProperty.childPropertyQtty = valueDto.quentity;
                                }
                                
                                if (product.colors?.multiSelect && product.colors?.allowLinkWithProperties) {
                                    selectedChildProperty.childPropertyQtty = 1;
                                }

                                //3.2 check pro stock
                                if (childPropertyDoc.store_stock_variable && selectedChildProperty?.childPropertyQtty) {
                                    const stock_variable = await this.storeStockModel.findById(childPropertyDoc.store_stock_variable);

                                    if (stock_variable && !product.allowOrdersWhenStockIsEmpty && !store.allowOrdersWhenStockIsEmpty) {
                                        if (stock_variable.quentity === 0 || stock_variable.quentity < 0) {
                                            throw new BadRequestException(`الخيار المحدد (${childPropertyDoc.name}) نفذ من المخزون`);
                                        } else if (stock_variable.quentity < selectedChildProperty.childPropertyQtty) {
                                            throw new BadRequestException(
                                                `الكمية المطلوبة في الخيار (${childPropertyDoc?.name}) أكبر من الكمية المتبقية`,
                                            );
                                        }
                                    }
                                }

                                // 3.3 if Property is limited Qtty & remining Qtty = 0 throw error
                                if (
                                    childPropertyDoc?.isLimitedQtty &&
                                    childPropertyDoc?.remainingQtty &&
                                    (childPropertyDoc.remainingQtty == 0 || childPropertyDoc.remainingQtty < 0) &&
                                    !product.allowOrdersWhenStockIsEmpty &&
                                    !store.allowOrdersWhenStockIsEmpty
                                ) {
                                    throw new BadRequestException(`الخيار المحدد (${childPropertyDoc.name}) نفذ من المخزون`);
                                }

                                //3.4 if The Ordred Qtty < Remining Qtty throw Error
                                if (
                                    childPropertyDoc?.remainingQtty &&
                                    selectedChildProperty?.childPropertyQtty &&
                                    !product.allowOrdersWhenStockIsEmpty &&
                                    !store.allowOrdersWhenStockIsEmpty
                                ) {
                                    if (childPropertyDoc?.isLimitedQtty && childPropertyDoc.remainingQtty < selectedChildProperty.childPropertyQtty)
                                        throw new BadRequestException(
                                            `الكمية المطلوبة في الخيار (${childPropertyDoc?.name}) أكبر من الكمية المتبقية`,
                                        );
                                }

                                //3.5 check selected Property is not 0
                                if (childPropertyDoc?.isLimitedQtty && selectedChildProperty.childPropertyQtty == 0) {
                                    throw new BadRequestException(`يجب أن تكون كمية الخيار (${childPropertyDoc.name}) أكبر من 0`);
                                }
                                //3.6 if product dont have multi select then dont check qtty of childProperty
                                if (!selectedChildProperty.childPropertyQtty) {
                                    throw new BadRequestException(`يجب إدخال الكمية للخيار (${childPropertyDoc?.name})`);
                                }

                                //3.8: if product has Offer check if totalProperties Select is equal offerQtty or not
                                if (offer && parentPropertyDoc.multiSelect) {
                                    const totalPropertiesQtty = selectedParentProperty.childPropertiesSelected.reduce((acc, selectedPropertyy) => {
                                        return acc + (selectedPropertyy?.childPropertyQtty || 0);
                                    }, 0);
                                    if (totalPropertiesQtty != offer.quanitity) {
                                        throw new BadRequestException(`الرجاء تحديد كمية (${offer.quanitity} قطع) مطابقة للكمية في العرض`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        //4.0 if product dont have any colors then colorsSelected Array should not exist
        if (
            !product.colors ||
            (product.colors?.list.length < 1 && valueDto.colorsSelected && valueDto.colorsSelected?.length > 0 && isProductPropertiesRequired)
        ) {
            throw new BadRequestException(`يجب عدم تحديد أي ألوان في المنتج (${product.name})`);
        }

        //4: Validate Colors if th Product has colors
        if (product.colors && product.colors.list.length > 0 && isProductPropertiesRequired) {
            //4.1: Make sure at lease one colo is selected
            if (!valueDto?.colorsSelected || valueDto?.colorsSelected.length < 1) {
                throw new BadRequestException(`الرجاء تحديد الخيارات`);
            }

            //4.2 if proudct  colors is not MultiSelect then only one color should be included
            if (!product.colors.multiSelect && valueDto.colorsSelected.length > 1) {
                throw new BadRequestException("يجب إختيار لون واحد فقط");
            }

            //4.3: make sure the selected colors is exist in productColors
            for (const selectedColor of valueDto.colorsSelected) {
                const color = product.colors?.list?.find((color) => color._id?.toString() === selectedColor.colorId);
                if (!color) {
                    throw new NotFoundException(`الخيار ${selectedColor.colorId} غير تابع للمنتج (${product.name})`);
                }

                //4.4 if Parent Colors is not Multi Select then selectedProperty qtty should the same ordred qtty
                if (!product.colors?.multiSelect) {
                    selectedColor.colorQtty =
                        valueDto.quentity || valueDto.colorsSelected?.reduce((acc, totalQtty) => acc + (totalQtty.colorQtty || 0), 0);
                }

                //4.5 check pro stock
                if (color.store_stock_variable && selectedColor?.colorQtty) {
                    const stock_variable = await this.storeStockModel.findById(color.store_stock_variable);

                    if (stock_variable && !product.allowOrdersWhenStockIsEmpty && !store.allowOrdersWhenStockIsEmpty) {
                        if (stock_variable.quentity === 0 || stock_variable.quentity < 0) {
                            throw new BadRequestException(`الخيار المحدد (${color.name}) نفذ من المخزون`);
                        } else if (stock_variable.quentity < selectedColor.colorQtty) {
                            throw new BadRequestException(`الكمية المطلوبة في الخيار (${color?.name}) أكبر من الكمية المتبقية`);
                        }
                    }
                }

                //4.6:  Validate Remaining Qtty
                if (
                    color?.isLimitedQtty &&
                    color.remainingQtty &&
                    (color.remainingQtty == 0 || color.remainingQtty < 0) &&
                    !product.allowOrdersWhenStockIsEmpty &&
                    !store.allowOrdersWhenStockIsEmpty
                ) {
                    throw new BadRequestException(`الخيار المحدد (${color.name}) نفذ المخزون`);
                }
                //4.6.1 if The Ordred Qtty < Remining Qtty throw Error
                if (color?.remainingQtty && selectedColor?.colorQtty && !product.allowOrdersWhenStockIsEmpty && !store.allowOrdersWhenStockIsEmpty) {
                    if (color?.isLimitedQtty && color.remainingQtty < selectedColor.colorQtty) {
                        throw new BadRequestException(`الكمية المطلوبة في الخيار (${color?.name}) أكبر من الكمية المتبقية`);
                    }
                }

                //4.7 check selected color qtty is not 0
                if (color?.isLimitedQtty && selectedColor.colorQtty === 0) {
                    throw new BadRequestException(`يجب أن تكون كمية الخيار(${color.name}) أكبر من 0`);
                }

                //4.8 check if parentProperty is multi select then the qtty should be not empty and > 0
                if (!selectedColor.colorQtty) {
                    throw new BadRequestException(`يجب إدخال الكمية للخيار (${color?.name})`);
                }
            }

            //4.9: if product has Offer check if totalColors Select is equal offerQtty or not
            if (offer && product.colors.multiSelect) {
                const totalColorsQtty = valueDto.colorsSelected.reduce((acc, selectedColor) => {
                    return acc + (selectedColor?.colorQtty || 0);
                }, 0);

                if (totalColorsQtty != offer.quanitity) {
                    throw new BadRequestException(`الرجاء تحديد كمية (${offer.quanitity} قطع) مطابقة للكمية في العرض`);
                }
            }
        }

        //chekc pro stock
        if (product.store_stock_variable) {
            const stock_variable = await this.storeStockModel.findById(product.store_stock_variable);

            if (stock_variable && !product.allowOrdersWhenStockIsEmpty && !store.allowOrdersWhenStockIsEmpty) {
                if (stock_variable.quentity === 0 || stock_variable.quentity < 0) {
                    throw new BadRequestException(`المنتج المحدد (${product.name}) نفذ من المخزون`);
                } else if (stock_variable.quentity < valueDto.quentity) {
                    throw new BadRequestException(`الكمية المطلوبة في المنتج (${product.name}) أكبر من الكمية المتبقية`);
                }
            }
        }

        //check if product is limited qtty && !hasMultiSelect
        if (
            product.isLimitedQtty &&
            !product.hasMultiSelect &&
            product.remainingQtty < valueDto.quentity &&
            !product.allowOrdersWhenStockIsEmpty &&
            !store.allowOrdersWhenStockIsEmpty
        ) {
            throw new BadRequestException(`الكمية المطلوبة في المنتج (${product.name}) أكبر من الكمية المتبقية`);
        }

