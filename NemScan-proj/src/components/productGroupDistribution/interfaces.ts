import {ProductGroupStat} from "@/src/services/statistics/interfaces";

export interface ProductGroupDistributionProps {
    groups?: ProductGroupStat[];
    loading?: boolean;
}