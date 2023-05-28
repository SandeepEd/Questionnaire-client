export interface IUser {
  id: number;
  name: string;
}

export interface IQuestion {
  id: number;
  question_text: string;
  response_id: number | null;
  options: IOption[];
  isCorrect?: boolean;
}

export interface IOption {
  id: number;
  option_text: string;
}
