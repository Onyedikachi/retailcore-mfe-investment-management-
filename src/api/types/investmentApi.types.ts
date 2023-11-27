export interface IGetInvestments {
  page?: number;
  page_size?: number;
  filter_by?: string;
  status__in?: any[];
  start_date?: string;
  end_date?: string;
  q?: string;
}

export interface ICreateInvestment {
  name: string;
  description: string;
  draft: boolean;
}
