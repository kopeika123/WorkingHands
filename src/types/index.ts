export type RootStackParamList = {
    WorkList: undefined;
    WorkDetails: { work: WorkItem };
};

export interface WorkItem {
    workTypes?: { name: string }[];
    companyName: string;
    address?: string;
}