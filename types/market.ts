export interface HotIndustry {
    Increase: number;
    Increase_share: number;
    plate: string;
    shares: string;
}

export interface HotSpot {
    title: string;
    up_down: number;
}

export interface Amplitude {
    Increase : number;
    code: string;
    name: string;
    price: number;
    scode: string;
}

export enum MarketPageTabs {
    INDEX_QUOTES = 'index-quotes',
    CHINA_STOCKS = 'cn-stock',
    AMPLITUDE = 'amplitude',
    TURNOVER = 'turnover',
    UP = 'up',
    DOWN = 'down'
}
