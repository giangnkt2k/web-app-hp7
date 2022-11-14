export type ChartTimeRangeValue = 'D' | '1M' | '5M' | '15M' | '1H' | 'line';

export interface IChartTimeRange {
  text: string;
  value: ChartTimeRangeValue;
}

export enum ChartType {
  CANDLE_SOLID = 'candle_solid',
  CANDLE_STROKE = 'candle_stroke',
  CANDLE_UP_STROKE = 'candle_up_stroke',
  CANDLE_DOWN_STROKE = 'candle_down_stroke',
  OHLC = 'ohlc',
  AREA = 'area',
}

export enum DrawableShape {
  HORIZONTAL_RAY_LINE = 'horizontalRayLine',
  HORIZONTAL_SEGMENT = 'horizontalSegment',
  HORIZONTAL_STRAIGHT_LINE = 'horizontalStraightLine',
  VERTICAL_RAY_LINE = 'verticalRayLine',
  VERTICAL_SEGMENT = 'verticalSegment',
  VERTICAL_STRAIGHT_LINE = 'verticalStraightLine',
  RAY_LINE = 'rayLine',
  SEGMENT = 'segment',
  STRAIGHT_LINE = 'straightLine',
  PRICE_LINE = 'priceLine',
  PRICE_CHANNEL_LINE = 'priceChannelLine',
  PARALLEL_STRAIGHT_LINE = 'parallelStraightLine',
  FIBONACCI_LINE = 'fibonacciLine',
}
