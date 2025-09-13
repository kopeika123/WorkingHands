import { makeAutoObservable, action } from 'mobx';
import { Service } from '../service';

interface WorkData {
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

interface LocationParams {
    latitude: number;
    longitude: number;
    accuracy?: number; // Опционально, если не всегда передается
}

class WorkStore {
    data: WorkData[] = []; // Observable state
    isLoading: boolean = false; // Новое: состояние загрузки
    error: string | null = null; // Новое: состояние ошибки

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async loadShifts(params?: LocationParams | null) {
        this.isLoading = true; // Начинаем загрузку
        this.error = null; // Сбрасываем предыдущую ошибку

        try {
            // Если params null (например, геолокация недоступна), можно не загружать или передать null в Service
            if (params){
                const response = await Service.loadData(params);
                console.log(response)
                this.data = response.data;
            }
        } catch (err) {
            console.error('Ошибка в loadShifts:', err);
        } finally {
            this.isLoading = false; // Завершаем загрузку
        }
    }

    // Опционально: метод для сброса данных (если нужно)
    @action
    resetData() {
        this.data = [];
        this.isLoading = false;
        this.error = null;
    }
}

export default new WorkStore();
