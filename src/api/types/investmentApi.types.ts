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
  name: string;
  description: string;
  draft: boolean;
}

export interface IProductInformation {
  name: string;
  slogan: string;
  description: string;
  lifeCycle: string;
  currency: string;
}
