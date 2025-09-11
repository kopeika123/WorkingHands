import { makeAutoObservable, action } from 'mobx';
import { Service } from '../service'; // Убедитесь, что Service правильно импортирован

interface WorkData {
    companyName: string;
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
