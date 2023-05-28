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
  correct_option_id: number | null;
}

export interface IOption {
  id: number;
  option_text: string;
}
