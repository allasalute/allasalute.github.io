// @flow

export type QuestionTypeEnum = "radio" | "number" | "select" | "time";

export type UnitTypeEnum = "ft" | "cm" | "inch" | "st" | "lbs" | "kg" | "days" | "hours" | "minutes";
export type Option = {|
  +label: string,
  +items: Array<UnitTypeEnum>
|};

export type Question = {
  +key: string,
  +value: string,
  +subLabel: boolean,
  +options?: ?Array<Option>
};

export type QuestionList = {
  +key: string,
  +questions: Array<Question>,
  +questionType: QuestionTypeEnum,
  +analyticsPageView: string
};

export type Response = {
  +question: string,
  +value: string
};
