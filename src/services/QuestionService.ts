import { AxiosResponse } from 'axios';
import { QueryObserverResult, useQuery } from 'react-query';
import { IQuestion } from '../types/questionnaire';
import client from '../utils/http';

export class QuestionService {
  static getQuestions(): Promise<AxiosResponse<IQuestion[]>> {
    return client.get(`/questionnaire/questions`);
  }

  static postAnswer(questionId: number, answer: string) {
    return client.post(`/questionnaire/questions/${questionId}/answer`, { answer });
  }

  static postQuestion(question: string) {
    return client.post(`/questions`, { question });
  }

  static deleteQuestion(questionId: number) {
    return client.delete(`/questions/${questionId}`);
  }

  static addOptions(questionId: number, option: string[]) {
    return client.post(`/questions/${questionId}/options`, { option });
  }
}

export const useGetQuestions = (): QueryObserverResult<any> => useQuery({
  queryKey: `questions`,
  queryFn: () => QuestionService.getQuestions().then((res) => res.data),
});
