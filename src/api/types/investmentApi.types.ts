export interface IGetProducts {
  page?: number;
  page_size?: number;
  filter_by?: string;
  status__in?: any[];
  start_date?: string;
  end_date?: string;
  q?: string;
}

export interface ICreateProduct {
  // name: string;
  // description: string;
  // draft: boolean;

  productInfo: {
    productName: string;
    slogan: string;
    description: string;
    startDate: string;
    endDate: string;
    currency: string;
    customerCategory: number;
  };
  customerEligibility: {
    ageGroupMin: number;
    ageGroupMax: number;
    requireDocument: [];
    customerCategory: number;
  };
  pricingConfiguration: {
    applicableTenorMin: number;
    applicableTenorMinUnit: number;
    applicableTenorMax: number;
    applicableTenorMaxUnit: number;
    applicablePrincipalMin: number;
    applicablePrincipalMax: number;
    interestRateRangeType: number;
    interestRateConfigModels: [
      {
        min: number;
        max: number;
        principalMin: number;
        principalMax: number;
        tenorMin: number;
        tenorMinUnit: number;
        tenorMax: number;
        tenorMaxUnit: number;
      }
    ];
  
  };
  liquidation: {
    part_AllowPartLiquidation: boolean;
    part_MaxPartLiquidation: number;
    part_RequireNoticeBeforeLiquidation: boolean;
    part_NoticePeriod: number;
    part_NoticePeriodUnit: number;
    part_LiquidationPenalty: string;
    early_AllowEarlyLiquidation: boolean;
    early_RequireNoticeBeforeLiquidation: boolean;
    early_NoticePeriod: number;
    early_NoticePeriodUnit: number;
    early_LiquidationPenalty: string;
    early_LiquidationPenaltyPercentage: number;
  };
  interestComputationMethod: number;
  isDraft: boolean;
  productType: number;
}

export interface IProductInformation {
  name: string;
  slogan: string;
  description: string;
  lifeCycle: string;
  currency: string;
}
