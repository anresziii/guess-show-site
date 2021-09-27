export interface ISettings {
    overview: string;
    original_title: string;
    map(callback: any): any;
}

export interface IMovie {
    results: ISettings;
}