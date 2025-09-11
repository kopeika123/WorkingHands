export type RootStackParamList = {
    WorkList: undefined;
    WorkDetails: { work: WorkItem };
};

export interface WorkItem {
    workTypes?: { name: string }[];
    companyName: string;
    address?: string;
    logo?: string;
    dateStartByCity?: string;
    timeStartByCity?: string;
    timeEndByCity?: string;
    currentWorkers?: string;
    planWorkers?: string;
    priceWorker?: string;
    customerFeedbacksCount?: string;
    customerRating?: string;
}